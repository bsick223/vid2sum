import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple profanity check on server-side for double protection
const profaneWords = [
  "ass",
  "asshole",
  "bastard",
  "bitch",
  "cunt",
  "damn",
  "dick",
  "fuck",
  "fucking",
  "piss",
  "shit",
  "tits",
  "whore",
  "cock",
  "pussy",
  "crap",
  "bullshit",
  "nigga",
  "nigger",
  "nig",
  "titty",
  "titties",
  "retard",
  "retarded",
  "retardation",
  "faggot",
  "slut",
];

function containsProfanity(text: string): boolean {
  if (!text) return false;
  const normalizedText = text.toLowerCase();
  return profaneWords.some((word) => normalizedText.includes(word));
}

export const addReview = mutation({
  args: {
    name: v.string(),
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the authenticated user ID from Clerk
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("You must be signed in to leave a review");
    }

    const userId = identity.subject;
    const userEmail = identity.email;

    // Server-side validation
    if (!args.name.trim() || !args.comment.trim()) {
      throw new Error("Name and comment are required");
    }

    if (args.name.length > 50) {
      throw new Error("Name is too long (maximum 50 characters)");
    }

    if (args.comment.length > 500) {
      throw new Error("Review is too long (maximum 500 characters)");
    }

    if (containsProfanity(args.name) || containsProfanity(args.comment)) {
      throw new Error("Please keep your language respectful");
    }

    if (args.rating < 1 || args.rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    // Rate limiting - check if this user has submitted recently
    const recentReviews = await ctx.db
      .query("reviews")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .order("desc")
      .take(5);

    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000; // 1 hour rate limit

    // Check if user has submitted a review in the last hour
    const recentReviewFromSameUser = recentReviews.find(
      (review: { createdAt: number }) => review.createdAt > oneHourAgo
    );

    if (recentReviewFromSameUser) {
      throw new Error("Please wait 1 hour before submitting another review");
    }

    const reviewId = await ctx.db.insert("reviews", {
      userId: userId,
      userEmail: userEmail,
      name: args.name.trim(),
      rating: args.rating,
      comment: args.comment.trim(),
      createdAt: now,
    });

    return reviewId;
  },
});

export const getReviews = query({
  handler: async (ctx) => {
    try {
      const reviews = await ctx.db.query("reviews").order("desc").take(6);
      return reviews;
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return []; // Return empty array on error
    }
  },
});

// Add query to check if current user can leave review
export const canLeaveReview = query({
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();

      // If not logged in, they can't leave a review
      if (!identity) {
        return { canLeave: false, reason: "Not logged in" };
      }

      const userId = identity.subject;

      // Try using the index if available
      try {
        // Check recent reviews from this user using the index
        const recentReviews = await ctx.db
          .query("reviews")
          .withIndex("by_user_id", (q) => q.eq("userId", userId))
          .order("desc")
          .take(1);

        const now = Date.now();
        const oneHourAgo = now - 60 * 60 * 1000;

        // If they've left a review in the last hour, they can't leave another one
        if (
          recentReviews.length > 0 &&
          recentReviews[0].createdAt > oneHourAgo
        ) {
          const waitMinutes = Math.ceil(
            (recentReviews[0].createdAt + 60 * 60 * 1000 - now) / (60 * 1000)
          );
          return {
            canLeave: false,
            reason: `Please wait ${waitMinutes} minutes before submitting another review`,
          };
        }
      } catch (error) {
        // If index is backfilling, just continue - we'll assume they can leave a review
        console.warn("Error checking recent reviews with index:", error);
      }

      // All good!
      return { canLeave: true };
    } catch (error) {
      console.error("Error in canLeaveReview:", error);
      return { canLeave: true }; // Default to allowing review during errors
    }
  },
});
