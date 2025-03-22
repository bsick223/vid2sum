"use client";

import { Message, useChat } from "@ai-sdk/react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { useSchematicFlag } from "@schematichq/schematic-react";
import { FeatureFlag } from "@/features/flags";
import { BotIcon, LetterText, PenIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
// import QuestionMarkTooltip from "./QuestionMarkTooltip";

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  result?: Record<string, unknown>;
}

interface ToolPart {
  type: "tool-invocation";
  toolInvocation: ToolInvocation;
}

const formatToolInvocation = (part: ToolPart) => {
  if (!part.toolInvocation) return "Unknown Tool";
  return ` Tool Used: ${part.toolInvocation.toolName}`;
};

function AiAgentChat({
  videoId,
  isVideoLoading = true,
}: {
  videoId: string;
  isVideoLoading?: boolean;
}) {
  // Scrolling to Bottom Logic
  const bottomRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, append, status } =
    useChat({
      maxSteps: 5,
      body: {
        videoId,
      },
    });

  // silent prompting
  const SYSTEM_MESSAGE_PREFIXES = ["generate-script-", "generate-title-"];

  const displayMessages = messages.filter((message) => {
    // Keep all assistant messages
    if (message.role === "assistant") return true;

    // For user messages, filter out those with IDs matching our system prefixes
    if (message.role === "user") {
      return !SYSTEM_MESSAGE_PREFIXES.some(
        (prefix) => message.id && message.id.toString().startsWith(prefix)
      );
    }

    return true;
  });

  const isVideoAnalysisEnabled = useSchematicFlag(FeatureFlag.ANALYSE_VIDEO);

  const isScriptGenerationEnabled =
    useSchematicFlag(FeatureFlag.SCRIPT_GENERATION) &&
    isVideoAnalysisEnabled &&
    !isVideoLoading;
  // Script generation's flag is always true, but the feature is only enabled if video analysis is enabled AND video is loaded

  const isTitleGenerationEnabled =
    useSchematicFlag(FeatureFlag.TITLE_GENERATIONS) &&
    isVideoAnalysisEnabled &&
    !isVideoLoading;

  useEffect(() => {
    if (bottomRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [displayMessages]);

  useEffect(() => {
    let toastId;

    switch (status) {
      case "submitted":
        toastId = toast("Agent is thinking...", {
          id: toastId,
          icon: <BotIcon className="w-4 h-4" />,
        });
        break;
      case "streaming":
        toastId = toast("Agent is replying...", {
          id: toastId,
          icon: <BotIcon className="w-4 h-4" />,
        });
        break;
      case "error":
        toastId = toast("Whoops! Something went wrong, please try again.", {
          id: toastId,
          icon: <BotIcon className="w-4 h-4" />,
        });
        break;
      case "ready":
        toast.dismiss(toastId);
        break;
    }
  }, [status]);

  const generateScript = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);

    const userMessage: Message = {
      id: `generate-script-${randomId}`,
      role: "user",
      content:
        "You are tasked with generating a summary and bullet points for a video based on its transcript. Your goal is to help the user understand the main ideas and important topics discussed in the video.  Please use the transcript, and video details.  DO NOT use generateTitle for this summary.",
    };

    append(userMessage);
  };

  const generateTitle = async () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    const userMessage: Message = {
      id: `generate-title-${randomId}`,
      role: "user",
      content: "Generate a study guide",
    };
    append(userMessage);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="hidden lg:block px-4 pb-3 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">AI Agent</h2>
        {status === "submitted" && (
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Thinking...
          </p>
        )}
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        ref={messagesContainerRef}
      >
        <div className="space-y-6">
          {displayMessages.length === 0 && (
            <div className="flex items-center justify-center h-full min-h-[200px]">
              {status === "submitted" ? (
                <div className="text-center space-y-4">
                  <div className="relative mx-auto w-64 h-16 flex items-center justify-center rounded-xl overflow-hidden">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-gray-700 tracking-wide">
                        <span className="inline-block animate-pulse-fast">
                          L
                        </span>
                        <span
                          className="inline-block animate-pulse-fast"
                          style={{ animationDelay: "0.1s" }}
                        >
                          o
                        </span>
                        <span
                          className="inline-block animate-pulse-fast"
                          style={{ animationDelay: "0.2s" }}
                        >
                          a
                        </span>
                        <span
                          className="inline-block animate-pulse-fast"
                          style={{ animationDelay: "0.3s" }}
                        >
                          d
                        </span>
                        <span
                          className="inline-block animate-pulse-fast"
                          style={{ animationDelay: "0.4s" }}
                        >
                          i
                        </span>
                        <span
                          className="inline-block animate-pulse-fast"
                          style={{ animationDelay: "0.5s" }}
                        >
                          n
                        </span>
                        <span
                          className="inline-block animate-pulse-fast"
                          style={{ animationDelay: "0.6s" }}
                        >
                          g
                        </span>
                      </span>
                      <span className="flex space-x-1 ml-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                          style={{ animationDelay: "0s" }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4 p-8">
                  <p className="text-lg text-gray-700 font-bold">
                    What can I help with?
                  </p>
                </div>
              )}
            </div>
          )}

          {displayMessages.map((m) => (
            <div
              key={m.id}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] ${
                  m.role === "user"
                    ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md"
                    : "bg-white border border-gray-100 shadow-sm"
                } rounded-2xl px-5 py-3.5`}
              >
                {m.parts && m.role === "assistant" ? (
                  // AI Agent Message
                  <div className="space-y-3">
                    {m.parts.map((part, i) =>
                      part.type === "text" ? (
                        <div
                          key={i}
                          className="prose prose-sm max-w-none text-gray-700"
                        >
                          <ReactMarkdown>{part.text}</ReactMarkdown>
                        </div>
                      ) : part.type === "tool-invocation" ? (
                        <div
                          key={i}
                          className="bg-gray-50 rounded-lg p-3 space-y-2 text-gray-800 border border-gray-100"
                        >
                          <div className="font-medium text-xs flex items-center gap-1.5">
                            <span className="bg-blue-100 text-blue-800 p-1 rounded">
                              🛠️
                            </span>
                            {formatToolInvocation(part as ToolPart)}
                          </div>
                          {(part as ToolPart).toolInvocation.result && (
                            <pre className="text-xs bg-gray-50 p-2 rounded overflow-auto max-h-40 border border-gray-200">
                              {JSON.stringify(
                                (part as ToolPart).toolInvocation.result,
                                null,
                                2
                              )}
                            </pre>
                          )}
                        </div>
                      ) : null
                    )}
                  </div>
                ) : (
                  // User Message - Fix applied here
                  <div className="prose prose-sm max-w-none text-white break-words whitespace-normal overflow-hidden overflow-wrap-anywhere">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Form */}
      {/* <QuestionMarkTooltip /> */}
      <div className="border-t border-gray-100 p-4 bg-white">
        <div className="space-y-3">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              // Cast e.target to HTMLFormElement before using querySelector
              const form = e.target as HTMLFormElement;
              const textarea = form.querySelector("textarea");
              // Add null check before accessing style property
              if (textarea) {
                (textarea as HTMLTextAreaElement).style.height = "40px"; // Reset to the min-height value
              }
            }}
            className="flex gap-2 items-start"
          >
            <textarea
              className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[40px] max-h-[150px] resize-none overflow-y-auto"
              placeholder={
                !isVideoAnalysisEnabled
                  ? "Upgrade to ask anything about your video..."
                  : isVideoLoading
                  ? "Loading video..."
                  : "Ask anything about your video..."
              }
              value={input}
              onChange={handleInputChange}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (
                    input.trim() &&
                    status !== "streaming" &&
                    status !== "submitted" &&
                    isVideoAnalysisEnabled &&
                    !isVideoLoading
                  ) {
                    handleSubmit(
                      e as unknown as React.FormEvent<HTMLFormElement>
                    );
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "40px";
                  }
                }
              }}
              rows={1}
              disabled={!isVideoAnalysisEnabled || isVideoLoading}
            />
            <Button
              type="submit"
              disabled={
                status === "streaming" ||
                status === "submitted" ||
                !isVideoAnalysisEnabled ||
                isVideoLoading
              }
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1 hover:cursor-pointer active:scale-95 active:bg-blue-700 active:shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            >
              {status === "streaming"
                ? "AI is replying..."
                : status === "submitted"
                ? "AI is thinking..."
                : isVideoLoading
                ? "Loading..."
                : "Send"}
            </Button>
          </form>

          <div className="flex gap-2">
            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
              onClick={generateScript}
              type="button"
              disabled={!isScriptGenerationEnabled}
            >
              <LetterText className="w-4 h-4" />
              {isVideoLoading ? (
                <span>Loading...</span>
              ) : isScriptGenerationEnabled ? (
                <span>Summarize</span>
              ) : (
                <span>Upgrade to generate a summary</span>
              )}
            </button>
            <button
              className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
              onClick={generateTitle}
              type="button"
              disabled={!isTitleGenerationEnabled}
            >
              <PenIcon className="w-4 h-4" />
              {isVideoLoading ? "Loading..." : "Generate Study Guide"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiAgentChat;
