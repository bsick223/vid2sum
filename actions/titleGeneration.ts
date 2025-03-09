"use server";

import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import { getConvexClient } from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const convexClient = getConvexClient();

export async function titleGeneration(
  videoId: string,
  videoSummary: string,
  considerations: string
) {
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not found");
  }

  const schematicCtx = {
    company: { id: user.id },
    user: {
      id: user.id,
    },
  };

  const isTitleGenerationEnabled = await client.checkFlag(
    schematicCtx,
    FeatureFlag.TITLE_GENERATIONS
  );

  if (!isTitleGenerationEnabled) {
    return {
      error: "Title generation is not enabled, the user must upgrade",
    };
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    console.log("📜 Video summary:", videoSummary);
    console.log("📜 Generating title for video for videoId:", videoId);
    console.log("📜 Considerations:", considerations);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are tasked with creating a comprehensive study guide based on a YouTube video. The study guide should be tailored to help students effectively learn and review the content presented in the video.",
        },
        {
          role: "user",
          content: `As you watch the video, pay close attention to the main topics, key concepts, important facts, and any examples or case studies presented. Take notes on the video's structure, major points, and any visual aids or graphics used.

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

Present your complete study guide within **Summary** tags. 
Ensure that the study guide is comprehensive, well-organized, and effectively captures the key information from the video in a format that facilitates learning and review with \n\n${videoSummary}\n\n${considerations}
Do not do anything else like generate an image, just make the study guide.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 50,
    });

    const title =
      response.choices[0]?.message?.content || "Unable to generate Study Guide";

    if (!title) {
      return {
        error: "Failed to generate Study Guide (System error)",
      };
    }

    await convexClient.mutation(api.titles.generate, {
      videoId,
      userId: user.id,
      title: title,
    });

    await client.track({
      event: featureFlagEvents[FeatureFlag.TITLE_GENERATIONS].event,
      company: {
        id: user.id,
      },
      user: {
        id: user.id,
      },
    });

    return { title };
  } catch (error) {
    console.error("❌ Error generating Study Guide:", error);
    throw new Error("Failed to generate Study Guide");
  }
}
