"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

// Define a proper type for review object
interface Review {
  _id: Id<"reviews">;
  name: string;
  rating: number;
  comment: string;
  createdAt: number;
  userId?: string;
  userEmail?: string;
}

export default function ReviewsDisplay() {
  const reviews = useQuery(api.reviews.getReviews) || [];

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No reviews yet. Be the first to leave a review!
        </p>
      </div>
    );
  }

  // For mobile, only show first 3 reviews
  const mobileReviews = reviews.slice(0, 3);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">What Our Users Say</h3>

      {/* Mobile view - show only first 3 reviews */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-3 gap-4">
        {mobileReviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>

      {/* Desktop view - show all 6 reviews in a 2x3 grid */}
      <div className="hidden md:grid grid-cols-3 gap-4 gap-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}

// Extracted ReviewCard component for reuse
function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const needsExpansion = review.comment.length > 150; // Arbitrary threshold to check if text is long

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col h-full relative">
      <div className="flex flex-col items-center mb-3">
        <h4 className="font-medium mb-2">{review.name}</h4>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative flex-grow">
        <div className={`${expanded ? "max-h-96 overflow-y-auto" : ""}`}>
          <p
            className={`text-gray-600 ${
              expanded ? "" : "line-clamp-3"
            } break-words whitespace-normal overflow-hidden`}
          >
            {review.comment}
          </p>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-400 flex justify-between items-center">
        <span>{new Date(review.createdAt).toLocaleDateString()}</span>

        {needsExpansion && (
          <button
            onClick={toggleExpand}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            aria-label={expanded ? "Collapse review" : "Expand review"}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-600" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
