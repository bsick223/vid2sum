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
          if (!result.success) {
            console.error("Failed to subscribe to newsletter:", result.error);
          }
        } catch (error) {
          console.error("Error subscribing to newsletter:", error);
        }
      };

      handleMailchimpSubscription();
    }
  }, [user, identify]);

  return children;
};

export default SchematicWrapped;
