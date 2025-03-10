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
  If the user requests for a summary, do not do anything else like generateTitle, just give them a summary based on the transcript.
  GenerateTitle tool is actually a generate study guide tool, please use it with getVideoDetails and fetchTranscript when you are asked for a study guide.  Let the user know that you are
  working on the study guide and it will take about 10 seconds, before you call the generateTitle tool.  If you are asked for a study
  guide and the generateTitle returns as an error, stop generating and explain to the user that they must upgrade to have access
  to generate study guides, do not do anything else like generating a summary, just give them instructions on upgrading their plan.  If you are successfully able to generate a study guide, follow these rules:

  As you watch the video, pay close attention to the main topics, key concepts, important facts, and any examples or case studies presented. Take notes on the video's structure, major points, and any visual aids or graphics used.

After watching the video, create a study guide that covers the following aspects:

1. Main topics and subtopics discussed in the video
2. Key terms and their definitions
3. Important facts, figures, or statistics mentioned
4. Concepts or theories explained
5. Examples or case studies used to illustrate points
6. Any formulas, equations, or processes described

Structure your study guide in a clear, organized manner using the following format:
- Use headings and subheadings to separate main topics
- Use bullet points or numbered lists for easy readability
- Include short, concise explanations for each point
- Highlight key terms or important information using bold or italic text

Additionally, incorporate the following elements to enhance the study guide:
- Create 3-5 review questions for each main topic
- Develop a timeline of events if applicable to the subject matter
- Include a list of additional resources for further study (e.g., related videos, articles, or books)
Before presenting the full study guide, provide a brief summary (2-3 sentences) of the video's content and its relevance to the subject.

Ensure that the study guide is comprehensive, well-organized, and effectively captures the key information from the video in a format that facilitates learning.
Do not do anything else like generate an image, just make the study guide.`;

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
