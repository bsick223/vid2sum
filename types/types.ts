

export interface ChannelDetails {
    title: string;
    thumbnail: string;
    subscribers: string;
  }
  

// Complete video details
export interface VideoDetails {
    title: string;
    views: string;
    likes: string;
    comments: string;
    thumbnail: string;
    channel: ChannelDetails;
    publishedAt: string;
  }

  // New color-related types
export type ColorKey = 'blue' | 'indigo' | 'purple' | 'pink' | 'orange' | 'green';

// Feature interface with color property
export interface Feature {
  title: string;
  description: string;
  color: ColorKey;
  // Add any other properties your feature might have
}

export type ContactMessage = {
  name: string;
  email: string;
  message: string;
  createdAt: number;
};

  