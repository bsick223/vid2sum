"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { validateReview } from "@/lib/validation";
import { useAuth, useUser } from "@clerk/nextjs";

// Define a type for error objects
type ErrorWithMessage = {
  message?: string;
  [key: string]: unknown;
};

export default function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  // Always call useQuery unconditionally at the top level
  const canLeaveReviewQuery = useQuery(api.reviews.canLeaveReview);

  // Then handle any errors or process results after the hook is called
  const canLeaveReviewResult = (() => {
    try {
      return canLeaveReviewQuery;
    } catch (err) {
      console.warn("Review permission check failed:", err);
      return null;
    }
  })();

  const addReview = useMutation(api.reviews.addReview);

  // Pre-fill name if user is signed in
  useEffect(() => {
    if (isSignedIn && user && name === "") {
      const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
      if (fullName) {
        setName(fullName);
      }
    }
  }, [isSignedIn, user, name]);

  // Show sign-in prompt if not authenticated
  if (isLoaded && !isSignedIn) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
        <h3 className="text-lg font-medium mb-4">Leave a Review</h3>
        <p className="mb-4 text-gray-600">
          You need to be signed in to leave a review.
        </p>
        <a
          href="/sign-in?redirect_url=/"
          className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </a>
      </div>
    );
  }

  // Show waiting message if rate limited
  if (canLeaveReviewResult && !canLeaveReviewResult.canLeave) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium mb-4">Leave a Review</h3>
        <p className="text-amber-600">
          {canLeaveReviewResult.reason || "Cannot leave review at this time"}
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    const validation = validateReview(name, comment);
    if (!validation.valid) {
      setError(validation.error || "Invalid submission");
      return;
    }

    setIsSubmitting(true);

    try {
      await addReview({ name, rating, comment });
      toast.success("Review submitted successfully!");
      setName("");
      setComment("");
      setRating(5);
    } catch (err: unknown) {
      const error = err as ErrorWithMessage;
      toast.error(
        error.message || "Failed to submit review. Please try again."
      );
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-medium mb-4">Leave a Review</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            required
            maxLength={50}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="text-xs text-gray-500 mt-1">
            Maximum 50 characters
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    rating >= value
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError("");
            }}
            required
            maxLength={500}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="text-xs text-gray-500 mt-1">
            {comment.length}/500 characters • Please keep your review respectful
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 cursor-pointer disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
