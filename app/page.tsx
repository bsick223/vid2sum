// import AgentPulse from "@/components/AgentPulse";
import {
  Brain,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Video,
} from "lucide-react";
import YoutubeVideoForm from "@/components/YoutubeVideoForm";
import TorusKnot from "@/components/TorusKnot";
import ProductHuntEmbed from "@/components/ProductHuntEmbed";
import CountDownTimer from "@/components/CountdownTimer";

const steps = [
  {
    title: "1. Connect Your Content",
    description: "Share your YouTube video URL and let your agent get to work",
    icon: Video,
  },
  {
    title: "2. AI Agent Analysis",
    description: "Your personal agent analyzes every aspect of your content",
    icon: Brain,
  },
  {
    title: "3. Receive Intelligence",
    description: "Get actionable insights and strategic recommendations",
    icon: MessageSquare,
  },
];
const features = [
  {
    title: "AI Analysis",
    description:
      "Get deep insights into your video content with our advanced AI analysis. Understand viewer engagement and content quality.",
    icon: Brain,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Smart Transcription",
    description:
      "Get accurate transcriptions of your videos. Perfect for creating subititles, blog posts, or repurposing content.",
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Thumbnail Generation",
    description:
      "Generate eye-catching thumbnails using AI. Boost your click-through rate with compelling visuals.",
    icon: ImageIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Title Generation",
    description:
      "Create attention-grabbing, SEO-optimized titles for your videos using AI.  Maximize views with titles that resonate with your audience.",
    icon: MessageSquare,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Viral Video Outline",
    description:
      "Get detailed, step-by-step instructions to recreate viral videos. Learn shooting techniques, camera angles, and craft scripts easily from successful content.",
    icon: Video,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Discuss with your AI Agent",
    description:
      "Engage in deep conversations about your content strategy, brainstorm ideas, and unlock new creative possibilities with your AI agent companion.",
    icon: Sparkles,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const testimonials = [
  {
    name: "Alex Carter",
    feedback:
      "I used to spend hours analyzing my YouTube content. Now I rely on TrendFast's AI agent to handle it for me. My engagement rates have already doubled!",
  },
  {
    name: "Mia Rodriguez",
    feedback:
      "I love how quick and easy it is. The transcription feature alone saves me so much time, and the insights are on point.",
  },
  {
    name: "Jordan Wells",
    feedback:
      "The advice from my AI agent helped me craft titles that went viral. Never thought I'd see such a jump in views!",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-2 md:gap-10 text-center mb-12">
            <div className="w-full h-[200px]">
              <TorusKnot />
            </div>

            <h1
              className="text-4xl md:text-6xl font-bold
            text-gray-900 mb-6"
            >
              Meet Your Personal{" "}
              <span
                className="bg-gradient-to-r from-blue-600 • to-blue-400
              bg-clip-text text-transparent"
              >
                AI Content Agent
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 md:mb-3 max-w-2xl mx-auto">
              Transform your video content with smart analysis, easy
              transcription, and valuable insights. Get started in seconds.
            </p>

            <YoutubeVideoForm />
          </div>
        </div>
      </section>
      <div className="py-10">
        <ProductHuntEmbed />
      </div>
      <CountDownTimer />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features for Content Creators
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* features */}
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg}`}
                  >
                    <Icon className={` w-6 h-6 ${feature.iconColor}`} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Your AI Agent in 3 Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all"
                >
                  <div
                    className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 
                    rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon className={` w-8 h-8 text-white`} />
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* YouTube Embed Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Watch Our Introduction Video
          </h2>
          <div className="flex justify-center">
            {/* Wrap the iframe in a parent div to control rounded edges */}
            <div
              className="overflow-hidden rounded-lg shadow-lg"
              style={{ width: "1120px", height: "630px" }}
            >
              <iframe
                className="w-full h-full"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/iQaRDVUWgzM?si=pvz8JG_qMFhKoQ4u"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* New: Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Creators Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-600 mb-4">
                  &quot;{testimonial.feedback}&quot;
                </p>
                <h3 className="text-lg font-bold text-gray-900">
                  - {testimonial.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-20 px-4 md:px-0 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Meet Your AI Content Agent?
          </h2>
          <p className="text-xl text-blue-50">
            Start with a free analysis by signing up today.
          </p>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} TrendFast. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
