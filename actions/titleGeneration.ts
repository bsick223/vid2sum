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
            "You are tasked with creating a comprehensive study guide based on a YouTube video. The study guide should be tailored to help students effectively learn and review the content presented in the video.  ",
        },
        {
          role: "user",
          content: `Please tell the user, that the study guide was created.  Nothing else.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 10,
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
