"use server";

import mailchimp from "@mailchimp/mailchimp_marketing";
import { currentUser } from "@clerk/nextjs/server";

const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;
const MAILCHIMP_CAMPAIGN_ID = process.env.MAILCHIMP_CAMPAIGN_ID;

if (
  !process.env.MAILCHIMP_API_KEY ||
  !process.env.MAILCHIMP_SERVER_PREFIX ||
  !MAILCHIMP_LIST_ID
) {
  throw new Error("Missing required Mailchimp environment variables");
}

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

async function triggerMailchimpCampaign() {
  try {
    const campaignResponse = await mailchimp.campaigns.send(
      MAILCHIMP_CAMPAIGN_ID as string
    );
    console.log("Mailchimp Campaign Sent:", campaignResponse);
  } catch (error: any) {
    console.error(
      "Mailchimp Campaign Error:",
      error.response?.body || error.message
    );
  }
}

export async function subscribeUserToMailchimp() {
  try {
    const user = await currentUser();

    if (!user) {
      return { success: false, error: "No user found" };
    }

    const email = user.emailAddresses[0]?.emailAddress;
    if (!email) {
      return { success: false, error: "No email address found for user" };
    }

    // Log the data we're sending to Mailchimp
    console.log("Attempting to subscribe:", {
      listId: MAILCHIMP_LIST_ID,
      email,
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    });

    const response = await mailchimp.lists.addListMember(
      MAILCHIMP_LIST_ID as string,
      {
        email_address: email,
        status: "subscribed", // Changed to pending for double opt-in
        merge_fields: {
          FNAME: user.firstName ?? "",
          LNAME: user.lastName ?? "",
        },
        tags: ["new-subscriber"],
      }
    );

    console.log("Mailchimp response:", response);
    return { success: true, data: response };
  } catch (error: any) {
    // Log the detailed error
    console.error("Detailed Mailchimp error:", {
      error: error.message,
      response: error.response?.body,
      status: error.status,
    });

    if (
      error.status === 400 &&
      error.response?.body?.title === "Member Exists"
    ) {
      return { success: true, alreadySubscribed: true };
    }

    return {
      success: false,
      error:
        error.response?.body?.detail ||
        error.message ||
        "Failed to subscribe to newsletter",
    };
  }
}
