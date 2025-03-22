/**
 * A simple profanity filter utility
 */

// Common profane words to filter
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
];

// Matches exact words and their common variations
export function containsProfanity(text: string): boolean {
  if (!text) return false;

  const normalizedText = text.toLowerCase();

  // Check for exact matches and variations with non-alphanumeric characters
  for (const word of profaneWords) {
    // Match the word as a whole word, including ones with characters inserted to bypass filters
    const escapedWord = word.split("").join("[\\W_]*");
    const regex = new RegExp(
      `\\b${escapedWord}\\b|\\b${escapedWord}s\\b|\\b${escapedWord}ing\\b`,
      "i"
    );

    if (regex.test(normalizedText)) {
      return true;
    }
  }

  return false;
}

// Validation rules for reviews
export function validateReview(
  name: string,
  comment: string
): { valid: boolean; error?: string } {
  // Check for empty fields
  if (!name.trim()) {
    return { valid: false, error: "Name is required" };
  }

  if (!comment.trim()) {
    return { valid: false, error: "Review comment is required" };
  }

  // Check for profanity
  if (containsProfanity(name) || containsProfanity(comment)) {
    return { valid: false, error: "Please keep your language respectful" };
  }

  // Check length limits
  if (name.length > 50) {
    return { valid: false, error: "Name is too long (maximum 50 characters)" };
  }

  if (comment.length > 500) {
    return {
      valid: false,
      error: "Review is too long (maximum 500 characters)",
    };
  }

  return { valid: true };
}
