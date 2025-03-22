"use client";

import { useUser } from "@clerk/nextjs";
import { useSchematicEvents } from "@schematichq/schematic-react";
import { useEffect } from "react";
import { subscribeUserToMailchimp } from "@/actions/mailchimp";

const SchematicWrapped = ({ children }: { children: React.ReactNode }) => {
  const { identify } = useSchematicEvents();
  const { user } = useUser();

  useEffect(() => {
    const userName =
      user?.username ??
      user?.fullName ??
      user?.emailAddresses[0]?.emailAddress ??
      user?.id;

    if (user?.id) {
      // Handle Schematic identification
      identify({
        // Company Level Key
        company: {
          keys: {
            id: user.id,
          },
          name: userName,
        },

        // User Level Key
        keys: {
          id: user.id,
        },
        name: userName,
      });

      // Subscribe user to Mailchimp
      const handleMailchimpSubscription = async () => {
        try {
          const result = await subscribeUserToMailchimp();
          if (!result.success && result.error) {
            // Log error but don't block the user experience
            console.error("Failed to subscribe to newsletter:", result.error);
          } else if (result.updated || result.alreadySubscribed) {
            // Successfully updated an existing subscription or confirmed already subscribed
            console.log(
              "User already subscribed to newsletter or was updated successfully"
            );
          }
        } catch (error) {
          // Catch any unexpected errors but don't affect user experience
          console.error("Error in Mailchimp subscription process:", error);
          // Continue with normal app flow despite the error
        }
      };

      // Handle the Mailchimp subscription in the background
      // Using a timeout to prevent blocking the main app functionality
      setTimeout(() => {
        handleMailchimpSubscription().catch((err) => {
          console.error("Unhandled Mailchimp subscription error:", err);
        });
      }, 100);
    }
  }, [user, identify]);

  return children;
};

export default SchematicWrapped;
