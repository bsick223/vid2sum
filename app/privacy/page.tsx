import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-6 text-sm">
        Last Updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Introduction</h2>
        <p className="mb-2">
          This Privacy Policy describes how we collect, use, process, and
          disclose your information, including personal information, in
          conjunction with your access to and use of our application.
        </p>
        <p>
          By using our service, you acknowledge that you have read and
          understand this Privacy Policy. If you do not agree with our policies
          and practices, please do not use our application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Information You Provide to Us
        </h3>
        <p className="mb-2">
          When you register for an account, we collect the following information
          through our authentication provider (Clerk):
        </p>
        <ul className="list-disc ml-6 mb-3">
          <li>Email address</li>
          <li>Name (if provided)</li>
          <li>Profile information you choose to share</li>
          <li>Authentication method preferences</li>
        </ul>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Information We Collect Automatically
        </h3>
        <p className="mb-2">
          We automatically collect certain types of information when you use our
          application:
        </p>
        <ul className="list-disc ml-6 mb-3">
          <li>Log and usage data (pages visited, time spent, features used)</li>
          <li>
            Device information (browser type, operating system, device type)
          </li>
          <li>IP address and approximate location (country/region)</li>
          <li>Feature flag and configuration settings through Schematic</li>
        </ul>

        <h3 className="text-lg font-medium mt-4 mb-2">Third-Party Services</h3>
        <p className="mb-2">
          Our application integrates with the following third-party services
          that may collect information:
        </p>
        <ul className="list-disc ml-6 mb-3">
          <li>
            <strong>Clerk</strong>: Provides authentication and user management
            services. Please refer to{" "}
            <a
              href="https://clerk.com/privacy"
              className="text-blue-600 hover:underline"
            >
              Clerk's Privacy Policy
            </a>{" "}
            for details on their data practices.
          </li>
          <li>
            <strong>Schematic</strong>: Provides feature flag and configuration
            management. Please refer to{" "}
            <a
              href="https://schematichq.com/privacy"
              className="text-blue-600 hover:underline"
            >
              Schematic's Privacy Policy
            </a>{" "}
            for information on their data practices.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          How We Use Your Information
        </h2>
        <p className="mb-2">
          We use your information for the following purposes:
        </p>
        <ul className="list-disc ml-6 mb-3">
          <li>To provide, maintain, and improve our services</li>
          <li>To authenticate your identity and manage your account</li>
          <li>
            To personalize your experience through targeted feature availability
          </li>
          <li>To communicate with you about service-related announcements</li>
          <li>
            To analyze usage patterns and optimize application performance
          </li>
          <li>
            To detect, prevent, and address technical issues or security threats
          </li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Data Retention</h2>
        <p className="mb-3">
          We retain your personal information only for as long as necessary to
          fulfill the purposes outlined in this Privacy Policy, unless a longer
          retention period is required or permitted by law.
        </p>
        <p>
          Your account information is retained while your account remains
          active. If you request deletion of your account, we will delete or
          anonymize your information, except where we must retain information to
          comply with legal obligations, resolve disputes, or enforce our
          agreements.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Your Rights and Choices</h2>
        <p className="mb-2">
          Depending on your location, you may have certain rights regarding your
          personal information:
        </p>
        <ul className="list-disc ml-6 mb-3">
          <li>
            <strong>Access and Portability</strong>: You may request access to
            the personal information we hold about you and request a copy in a
            structured, commonly used format.
          </li>
          <li>
            <strong>Correction</strong>: You may request that we correct
            inaccurate or incomplete information about you.
          </li>
          <li>
            <strong>Deletion</strong>: You may request that we delete your
            personal information, subject to certain exceptions.
          </li>
          <li>
            <strong>Restriction and Objection</strong>: You may request that we
            restrict processing of your information or object to certain types
            of processing.
          </li>
          <li>
            <strong>Withdrawal of Consent</strong>: Where we rely on consent as
            the legal basis for processing, you may withdraw consent at any
            time.
          </li>
        </ul>
        <p>
          To exercise these rights, please contact us using the information
          provided in the "Contact Us" section below.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Data Security</h2>
        <p className="mb-3">
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>
        <p>
          However, no method of transmission over the Internet or electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your personal information, we cannot guarantee its
          absolute security.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Cookies and Tracking Technologies
        </h2>
        <p className="mb-3">
          Our application and third-party services may use cookies, local
          storage, and similar technologies to enhance your experience and
          collect information about how you use our application.
        </p>
        <p className="mb-3">
          Clerk, our authentication provider, uses cookies to maintain your
          authentication state and provide secure access to our application.
        </p>
        <p>
          You can control cookies through your browser settings, but disabling
          certain cookies may limit your ability to use some features of our
          application.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          International Data Transfers
        </h2>
        <p>
          Your information may be transferred to, and maintained on, computers
          located outside of your state, province, country, or other
          governmental jurisdiction where the data protection laws may differ.
          If you are located outside the United States and choose to provide
          information to us, please note that we transfer the data to the United
          States and process it there. Your consent to this Privacy Policy
          followed by your submission of such information represents your
          agreement to this transfer.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Children's Privacy</h2>
        <p>
          Our service is not directed to individuals under 16. We do not
          knowingly collect personal information from children under 16. If we
          learn that we have collected personal information of a child under 16,
          we will take steps to delete such information as quickly as possible.
          If you believe we might have any information from or about a child
          under 16, please contact us.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          California Resident Notice at Collection
        </h2>
        <p className="mb-4">
          If you are a California resident, the California Consumer Privacy Act,
          as amended by the California Privacy Rights Act of 2020 ("
          <strong>CCPA</strong>"), requires us to provide some additional
          information to California residents. This section only applies to you
          if you are a California resident, although please note that this
          information and the rights afforded herein are the same as offered to
          our other users in our main Privacy Policy.
        </p>

        <p className="mb-3">The following chart details these activities:</p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category of personal information
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Purposes of use
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Categories of Third Parties to Which We Discloses this
                  Personal Information
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Categories of Third Parties to Which We "Share" and "Sell"
                  this Personal Information for Advertising/Analytics Purposes
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Contact information (such as your full name, phone number,
                  email address)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Provide the Services; Communicate with you; Analyze use of and
                  improve the services; With your consent; Comply with law or
                  defend our legal rights; Security/fraud prevention
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Affiliated entities; Service providers; Entities for legal
                  purposes
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  We do not share/sell
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Customer service interaction information (including optional
                  surveys and when you ask for help)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Provide the Services; Communicate with you; Analyze use of and
                  improve the services; With your consent; Comply with law or
                  defend our legal rights; Security/fraud prevention
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Affiliated entities; Service providers; Entities for legal
                  purposes
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  We do not share/sell
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Product interaction information
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Provide the Services; Communicate with you; Analyze use of and
                  improve the services; With your consent; Comply with law or
                  defend our legal rights; Security/fraud prevention
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Affiliated entities; Service providers; Entities for legal
                  purposes
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  We do not share/sell
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Internet network and device information (such as mobile device
                  information, IP address, and information about your
                  interaction with the services)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Provide the Services; Analyze use of and improve the services;
                  With your consent; Comply with law or defend our legal rights;
                  Security/fraud prevention
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Affiliated entities; Service providers; Entities for legal
                  purposes;
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  We do not share/sell
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Login information (such as your username and password)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Provide the Services; Comply with law or defend our legal
                  rights; Security/fraud prevention; Comply with law or defend
                  our legal rights
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Affiliated entities; Service providers; Entities for legal
                  purposes
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  We do not share/sell
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Professional or employment information (such as the name and
                  address of the company you work for and your title)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Provide the Services; Communicate with you; Analyze use of and
                  improve the services; With your consent; Comply with law or
                  defend our legal rights; Security/fraud prevention
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Affiliated entities; Service providers; Entities for legal
                  purposes;
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  We do not share/sell
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  Other information (any other information you choose to provide
                  directly to us, including optional profile photos)
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Provide the Services; Communicate with you; Analyze use of and
                  improve the services; With your consent; Comply with law or
                  defend our legal rights; Security/fraud prevention
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Affiliated entities; Service providers; Entities for legal
                  purposes;
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  We do not sell/share
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mb-3">
          For more information about each category of personal information,
          purpose of use, and third parties to which we disclose personal
          information, please see the "Information We Collect" and "How We Use
          Your Information" sections of our Privacy Policy.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Your Choices Regarding "Sharing" and "Selling"
        </h3>
        <p className="mb-3">
          You have the right to opt out of our sale/sharing of your personal
          information for purposes of online analytics and advertising.
          Currently, we do not sell or share your data as defined by the CCPA
          and we have not done so over the past 12 months from the effective
          date of this Privacy Policy.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">Other CCPA Rights</h3>
        <p className="mb-3">
          If we ever offer any financial incentives in exchange for your
          personal information, we will provide you with appropriate information
          about such incentives.
        </p>
        <p className="mb-3">
          The CCPA also allows you to limit the use or disclosure of your
          "sensitive personal information" (as defined in the CCPA) if your
          sensitive personal information is used for certain purposes. Please
          note that we do not use or disclose sensitive personal information
          other than for business purposes for which you cannot opt out under
          the CCPA.
        </p>
        <p className="mb-3">
          Please see the "Your Rights and Choices" section of our Policy above
          for information about the additional rights you have with respect to
          your personal information under California law and how to exercise
          them.
        </p>

        <h3 className="text-lg font-medium mt-4 mb-2">
          Shine the Light Disclosure
        </h3>
        <p className="mb-3">
          The California "Shine the Light" law gives residents of California the
          right under certain circumstances to request information from us
          regarding the manner in which we disclose certain categories of
          personal information (as defined in the Shine the Light law) with
          third parties for their direct marketing purposes. We currently do not
          disclose your personal information to third parties for their own
          direct marketing purposes.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Changes to This Privacy Policy
        </h2>
        <p>
          We may update this policy as needed to comply with relevant
          regulations and reflect any new practices. Whenever we make a
          significant change to our policies, we will refresh the date at the
          top of this page. You are advised to review this Privacy Policy
          periodically for any changes. Changes to this Privacy Policy are
          effective when they are posted on this page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p className="mb-3">
          Have any questions, comments, or concerns about this privacy policy,
          your data, or your rights with respect to your information? Please get
          in touch by emailing us at vid2sum@gmail.com and we'll be happy to try
          to try to answer them!
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          For European Economic Area Residents
        </h2>
        <p className="mb-3">
          If you are located in the European Economic Area (EEA), you have
          certain rights under the General Data Protection Regulation (GDPR).
          The data controller of your personal information is Vid2Sum.
        </p>
        <p className="mb-3">
          The legal bases we rely on for processing your information include:
          contractual necessity, consent, legitimate interests, and legal
          obligation.
        </p>
        <p>
          You have the right to lodge a complaint with a supervisory authority
          in the EEA if you believe our processing of your personal information
          violates applicable law.
        </p>
      </section>
    </div>
  );
}
