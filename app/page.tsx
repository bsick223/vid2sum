import {
  Brain,
  MessageSquare,
  Lightbulb,
  Coffee,
  Zap,
  Bookmark,
  CheckCircle,
} from "lucide-react";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";
// import ProductHuntEmbed from "@/components/ProductHuntEmbed";
import { ColorKey } from "@/types/types";
import HowItWorksSection from "@/components/HowItWorksSection";
import ContactUsForm from "@/components/ContactUsForm";

const features = [
  {
    title: "TL;DR for Lectures",
    description:
      "Get the important stuff without sitting through hours of content. Perfect for when you're short on time!",
    icon: Zap,
    color: "blue",
  },
  {
    title: "Brain-Friendly Notes",
    description:
      "Our AI organizes information the way your brain likes it - clear, concise, and structured for better retention.",
    icon: Brain,
    color: "indigo",
  },
  {
    title: "Cram Session Savior",
    description:
      "Need to catch up quickly? Transform hours of missed lectures into minutes of focused study material.",
    icon: Coffee,
    color: "purple",
  },
  {
    title: "Concept Highlighter",
    description:
      "We automatically identify and highlight the key concepts, terms, and formulas you need to know for exams.",
    icon: Lightbulb,
    color: "pink",
  },
  {
    title: "Study Guide Generator",
    description:
      "Turn any educational video into a comprehensive study guide with just one click. Perfect for exam prep!",
    icon: Bookmark,
    color: "orange",
  },
  {
    title: "Ask Me Anything",
    description:
      "Have questions about the lecture? Our AI assistant helps you understand difficult concepts in simple terms.",
    icon: MessageSquare,
    color: "green",
  },
];

const testimonials = [
  {
    name: "Taylor W., Psychology Student",
    emoji: "🧠",
    feedback:
      "I've gone from C's to A's since I started using Vid2Sum for my psychology lectures. Being able to review key concepts quickly changed everything!",
  },
  {
    name: "Raj P., Computer Science Major",
    emoji: "💻",
    feedback:
      "Vid2Sum is like having a genius friend who watches all my programming lectures and explains them in a way I actually understand.",
  },
  {
    name: "Zoe K., Biology Student",
    emoji: "🔬",
    feedback:
      "As a visual learner, I struggled with lengthy lecture videos. Vid2Sum extracts the important parts so I can focus on understanding, not note-taking.",
  },
];

// Colors for the cards
const colorMap = {
  blue: "bg-blue-50 border-blue-200 hover:border-blue-300",
  indigo: "bg-indigo-50 border-indigo-200 hover:border-indigo-300",
  purple: "bg-purple-50 border-purple-200 hover:border-purple-300",
  pink: "bg-pink-50 border-pink-200 hover:border-pink-300",
  orange: "bg-orange-50 border-orange-200 hover:border-orange-300",
  green: "bg-green-50 border-green-200 hover:border-green-300",
};

const iconColorMap = {
  blue: "text-blue-500",
  indigo: "text-indigo-500",
  purple: "text-purple-500",
  pink: "text-pink-500",
  orange: "text-orange-500",
  green: "text-green-500",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section - Floating Cards */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Two-column layout */}
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              {/* Content column */}
              <div className="lg:w-1/2 space-y-8">
                <div>
                  <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                    AI-Powered Learning Assistant
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Watch Less, <br />
                    <span className="text-blue-600">Learn More</span>
                  </h1>
                </div>

                <p className="text-xl text-gray-600">
                  Summarize videos and ask follow up questions
                </p>

                <div className="pt-4">
                  <YoutubeVideoForm />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <div className="inline-flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                    <span>Save 70% study time</span>
                  </div>
                  <div className="inline-flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                    <span>Better grades</span>
                  </div>
                  <div className="inline-flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
                    <span>Made for students</span>
                  </div>
                </div>
              </div>

              {/* Visual column - floating cards */}
              <div className="lg:w-1/2 relative">
                <div className="absolute top-4 left-4 right-4 bottom-4 bg-blue-100 rounded-2xl transform rotate-3"></div>

                <div className="bg-white p-8 rounded-2xl shadow-xl relative z-10 transform -rotate-2 border border-gray-100">
                  <h3 className="text-xl font-bold text-blue-600 mb-4">
                    Video Summary
                  </h3>

                  <div className="space-y-3">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-11/12"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-800 mt-6 mb-3">
                    Key Points:
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="h-4 w-4 mt-1 bg-blue-100 rounded-full flex-shrink-0"></div>
                      <div className="h-4 bg-gray-100 rounded w-5/6 ml-2"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-4 w-4 mt-1 bg-blue-100 rounded-full flex-shrink-0"></div>
                      <div className="h-4 bg-gray-100 rounded w-4/6 ml-2"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-4 w-4 mt-1 bg-blue-100 rounded-full flex-shrink-0"></div>
                      <div className="h-4 bg-gray-100 rounded w-5/6 ml-2"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-32 -right-4 bg-white p-4 rounded-lg shadow-lg w-40 transform rotate-6 border border-gray-100">
                  <div className="h-3 bg-blue-100 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                </div>

                <div className="absolute -bottom-4 left-10 bg-white p-4 rounded-lg shadow-lg w-48 transform -rotate-3 border border-gray-100">
                  <div className="h-3 bg-blue-100 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-3 bg-gray-100 rounded w-4/5 mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section - with Floating Cards */}
      {/* How it works Section - with Scroll Animations */}
      <section className="py-20 bg-gray-50 relative overflow-hidden"></section>
      <HowItWorksSection />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
            Features Students Love
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Tools designed to make your academic life easier
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 shadow-sm ${
                    colorMap[feature.color as ColorKey]
                  } transition-all duration-300`}
                >
                  <div className="flex items-start mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-white shadow-sm`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          iconColorMap[feature.color as ColorKey]
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 pt-1">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* YouTube Demo Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
            See How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Watch how Vid2Sum helps students master course material in less time
          </p>
          <div className="flex justify-center">
            <div
              className="overflow-hidden rounded-2xl shadow-lg"
              style={{ width: "100%", maxWidth: "900px", height: "506px" }}
            >
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/KtkKHP-wuWs?si=pCRWgIhyENdt2_WR"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
            What Students Are Saying
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of students who are acing their classes with Vid2Sum
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{testimonial.emoji}</div>
                {/* Star Rating */}
                <div className="flex text-yellow-400 mb-3">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">
                  &quot;{testimonial.feedback}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="font-bold text-blue-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-800">
                    {testimonial.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <div className="py-10 bg-white">
        <ProductHuntEmbed />
      </div> */}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Study Smarter?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of students saving time and improving grades with
            Vid2Sum
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-lg p-6 bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 px-4 md:px-0 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-blue-600">Vid2Sum</h2>
              <p className="text-gray-600">Watch Less, Learn More</p>
            </div> */}
            {/* <div className="flex space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                FAQ
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
            </div> */}
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            &copy; {new Date().getFullYear()} Vid2Sum. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
