import { NextResponse } from "next/server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText, tool } from "ai";
import { currentUser } from "@clerk/nextjs/server";
import { getVideoDetails } from "@/actions/getVideoDetails";
import fetchTranscript from "@/tools/fetchTranscript";
import { generateImage } from "@/tools/generateImage";
import { z } from "zod";
import generateTitle from "@/tools/generateTitle";

const anthropic = createAnthropic({
  apiKey: process.env.CLAUDE_API_KEY,
  headers: {
    "anthropic-beta": "token-efficient-tools-2025-02-19",
  },
});

const model = anthropic("claude-3-7-sonnet-20250219");

export async function POST(req: Request) {
  const { messages, videoId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const videoDetails = await getVideoDetails(videoId);

  // TODO can implement limiting or gating like in generateImage.ts

  const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. The video ID in question is ${videoId} but 
  you'll refer to this as ${
    videoDetails?.title || "Selected Video"
  }. Use emojis to make the conversation more engaging. If an error occurs, explain it to 
  the user and ask them to try again later. If the error suggests the user upgrade, explain that they must upgrade to use the feature, tell them to go to 
  'Manage Plan' in the header and upgrade. If any tool is used, analyse the response and if it contains a cache, explain that the transcript is cached because 
  they previously transcribed the video saving the user a token – use words like database instead of cache to make it more easy to understand. Format for notion.
  GenerateTitle tool is actually a generate study guide tool, please use it and fetchTranscript when you are asked for a study guide.  If you are asked for a study
  guide and the generateTitle returns as an error, stop generating and explain to the user that they must upgrade to have access
  to generate study guides.`;

  //   In here you can go over prompt caching to save your system Message
  const result = streamText({
    model,
    messages: [
      {
        role: "system",
        content: systemMessage,
      },

      ...messages,
    ],
    tools: {
      fetchTranscript: fetchTranscript,
      generateTitle: generateTitle,
      generateImage: generateImage(videoId, user.id),
      getVideoDetails: tool({
        description: "Get the details of the YouTube video",
        parameters: z.object({
          videoId: z.string().describe("The video ID to fetch the details for"),
        }),
        execute: async ({ videoId }) => {
          const videoDetails = await getVideoDetails(videoId);
          return { videoDetails };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
