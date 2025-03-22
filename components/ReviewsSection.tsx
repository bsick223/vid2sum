"use client";

import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewsDisplay from "./ReviewsDisplay";
import { MessageSquareQuote } from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ReviewsSection() {
  const [showForm, setShowForm] = useState(false);
  const { isSignedIn } = useAuth();
  const { openSignIn } = useClerk();

  // Wrap in try/catch to handle backfilling error
  let canReview = true;
  let reviewStatusReason = "";

  try {
    const canLeaveReviewResult = useQuery(api.reviews.canLeaveReview);
    if (canLeaveReviewResult && !canLeaveReviewResult.canLeave) {
      canReview = false;
      reviewStatusReason =
        canLeaveReviewResult.reason || "Cannot leave review at this time";
    }
  } catch (error) {
    // During index backfilling, default to allowing reviews
    console.warn(
      "Review permission check failed, defaulting to allowed:",
      error
    );
    canReview = true;
  }

  const handleReviewButtonClick = () => {
    if (!isSignedIn) {
      // Open Clerk sign-in modal
      openSignIn();
    } else if (canReview) {
      // Show review form if signed in and allowed to review
      setShowForm(true);
    }
    // If not canReview but signed in, button should be disabled
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our users are saying about Vid2Sum, or leave your own
            review to help others!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ReviewsDisplay />

          <div className="mt-10 text-center">
            {!showForm ? (
              <button
                onClick={handleReviewButtonClick}
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                  !isSignedIn || canReview
                    ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={isSignedIn && !canReview}
                title={
                  !isSignedIn
                    ? "Sign in to leave a review"
                    : !canReview
                    ? reviewStatusReason
                    : "Leave a review"
                }
              >
                <MessageSquareQuote className="mr-2 h-5 w-5" />
                {isSignedIn ? "Leave a Review" : "Sign in to Review"}
              </button>
            ) : (
              <div className="max-w-lg mx-auto">
                <ReviewForm />
                <button
                  onClick={() => setShowForm(false)}
                  className="mt-4 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
