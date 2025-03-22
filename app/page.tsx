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
import ReviewsSection from "@/components/ReviewsSection";

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
      <section className="py-12 md:py-20 bg-gray-50 relative overflow-hidden">
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
            <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
              {/* Content column */}
              <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                <div>
                  <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-3 md:mb-4">
                    #1 AI Learning Assistant for students
                  </span>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold  text-blue-600 leading-tight">
                    Watch Less,
                    <br />
                    <span className="text-3xl md:text-5xl lg:text-6xl font-bold  text-gray-900 leading-tight ">
                      Learn More
                    </span>
                  </h1>
                </div>

                <p className="text-lg md:text-xl text-gray-600">
                  <strong>Join 10,000+ students</strong> saving 70% study time
                  and improving grades with AI-powered video summaries.
                </p>

                <div className="pt-2 md:pt-4">
                  <YoutubeVideoForm />
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <span>4.8/5 from 300+ reviews</span>
                  <span>•</span>
                  <span>Secure & Private</span>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                  <div className="inline-flex items-center text-sm md:text-base text-gray-700">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-1 md:mr-2" />
                    <span>Video</span>
                    {/* <span>Save 70% study time</span> */}
                  </div>
                  <div className="inline-flex items-center text-sm md:text-base text-gray-700">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-1 md:mr-2" />
                    <span>Summary</span>
                    {/*  <span>Better grades</span> */}
                  </div>
                  <div className="inline-flex items-center text-sm md:text-base text-gray-700">
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-500 mr-1 md:mr-2" />
                    <span>Q&A</span>
                    {/*  <span>Made for students</span> */}
                  </div>
                </div>
              </div>

              {/* Visual column - floating cards (hidden on smallest screens) */}
              <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0 hidden sm:block">
                {/* Student Success Stats Overlay */}
                <div className="absolute -top-6 -left-6 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-20 transform -rotate-3">
                  <p className="text-sm font-bold">
                    93% of students improved their grades!
                  </p>
                </div>

                <div className="absolute top-4 left-4 right-4 bottom-4 bg-blue-100 rounded-2xl transform rotate-3"></div>

                <div className="bg-white p-4 md:p-8 rounded-2xl shadow-xl relative z-10 transform sm:-rotate-2 border border-gray-100">
                  <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-3 md:mb-4">
                    Video Summary
                  </h3>

                  <div className="space-y-2 md:space-y-3">
                    <div className="h-3 md:h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-3 md:h-4 bg-gray-100 rounded w-11/12"></div>
                    <div className="h-3 md:h-4 bg-gray-100 rounded w-3/4"></div>
                  </div>

                  <h4 className="text-base md:text-lg font-bold text-gray-800 mt-4 md:mt-6 mb-2 md:mb-3">
                    Key Points:
                  </h4>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-start">
                      <div className="h-3 w-3 md:h-4 md:w-4 mt-1 bg-blue-100 rounded-full flex-shrink-0"></div>
                      <div className="h-3 md:h-4 bg-gray-100 rounded w-5/6 ml-2"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-3 w-3 md:h-4 md:w-4 mt-1 bg-blue-100 rounded-full flex-shrink-0"></div>
                      <div className="h-3 md:h-4 bg-gray-100 rounded w-4/6 ml-2"></div>
                    </div>
                    <div className="flex items-start">
                      <div className="h-3 w-3 md:h-4 md:w-4 mt-1 bg-blue-100 rounded-full flex-shrink-0"></div>
                      <div className="h-3 md:h-4 bg-gray-100 rounded w-5/6 ml-2"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-32 -right-4 bg-white p-3 md:p-4 rounded-lg shadow-lg w-32 md:w-40 transform rotate-6 border border-gray-100 hidden sm:block">
                  <div className="h-2 md:h-3 bg-blue-100 rounded w-3/4 mb-2"></div>
                  <div className="h-2 md:h-3 bg-gray-100 rounded w-full"></div>
                </div>

                <div className="absolute -bottom-4 left-10 bg-white p-3 md:p-4 rounded-lg shadow-lg w-36 md:w-48 transform -rotate-3 border border-gray-100 hidden sm:block">
                  <div className="h-2 md:h-3 bg-blue-100 rounded w-2/3 mb-2"></div>
                  <div className="h-2 md:h-3 bg-gray-100 rounded w-full"></div>
                  <div className="h-2 md:h-3 bg-gray-100 rounded w-4/5 mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section - with Floating Cards */}
      {/* How it works Section - with Scroll Animations */}
      <section className="py-12 md:py-20 bg-gray-50 relative overflow-hidden"></section>
      <HowItWorksSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-blue-600">
            Features Students Love
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
            Tools designed to make your academic life easier
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`p-4 md:p-6 rounded-xl border-2 shadow-sm ${
                    colorMap[feature.color as ColorKey]
                  } transition-all duration-300`}
                >
                  <div className="flex items-start mb-3 md:mb-4">
                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-2 md:mr-3 bg-white shadow-sm`}
                    >
                      <Icon
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          iconColorMap[feature.color as ColorKey]
                        }`}
                      />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-800 pt-1">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-sm md:text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* YouTube Demo Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-blue-600">
            See How It Works
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
            Watch how Vid2Sum helps students master course material in less time
          </p>
          <div className="flex justify-center">
            <div
              className="overflow-hidden rounded-2xl shadow-lg w-full"
              style={{ maxWidth: "900px", aspectRatio: "16/9" }}
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
      <section className="py-12 md:py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-blue-600">
            What Students Are Saying
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
            Join thousands of students who are acing their classes with Vid2Sum
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="text-3xl md:text-4xl mb-3 md:mb-4">
                  {testimonial.emoji}
                </div>
                {/* Star Rating */}
                <div className="flex text-yellow-400 mb-3">
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>
                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                  &quot;{testimonial.feedback}&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2 md:mr-3">
                    <span className="font-bold text-blue-600">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-gray-800">
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
      <section className="py-12 md:py-20 relative overflow-hidden">
        {/* Background styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700">
          {/* Noise texture */}
          <div
            className="absolute inset-0 mix-blend-overlay opacity-15"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              width: "100%",
              height: "100%",
            }}
          ></div>

          {/* Decorative elements */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 25%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 20%)",
            }}
          ></div>
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-400 opacity-20"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>

          {/* Subtle grain overlay */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-soft-light"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grainyFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grainyFilter)'/%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
            Ready to Study Smarter?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-6 md:mb-10 max-w-2xl mx-auto">
            Join thousands of students saving time and improving grades with
            Vid2Sum
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-lg p-4 md:p-6 bg-white rounded-xl shadow-lg transition-shadow hover:shadow-xl">
              <ContactUsForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-8 md:py-12 px-4 md:px-0 bg-gray-50">
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
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-200 text-center text-sm md:text-base text-gray-500">
            &copy; {new Date().getFullYear()} Vid2Sum. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
