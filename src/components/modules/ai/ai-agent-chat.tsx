"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCallback, useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  Bot,
  Check,
  Code2,
  Lightbulb,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAskAssistant } from "@/hook";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const MAX_QUESTION_LENGTH = 2000;

const suggestions = [
  {
    icon: Code2,
    title: "JavaScript preparation",
    description: "Get ready for your next coding assessment.",
    prompt:
      "How should I prepare for a JavaScript coding assessment? Give me a practical study plan.",
  },
  {
    icon: Lightbulb,
    title: "Problem-solving skills",
    description: "Build a stronger problem-solving mindset.",
    prompt:
      "Give me a practical roadmap to improve my programming problem-solving skills.",
  },
  {
    icon: MessageCircle,
    title: "React interview tips",
    description: "Prepare for junior developer interviews.",
    prompt:
      "What React concepts should I master for a junior developer interview?",
  },
];

function getErrorMessage(error: unknown): string {
  const err = error as {
    data?: { message?: string };
    message?: string;
  };

  const message = err?.data?.message ?? err?.message ?? "";

  if (
    message.includes("Failed to get a response from AI") ||
    message.includes("503") ||
    message.includes("UNAVAILABLE") ||
    message.includes("temporarily busy")
  ) {
    return "The AI assistant is temporarily busy. Please try again in a moment.";
  }

  if (message.includes("401") || message.includes("UNAUTHORIZED")) {
    return "Your session may have expired. Please sign in again.";
  }

  if (message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
    return "The AI service has reached its request limit. Please try again later.";
  }

  return message || "Something went wrong. Please try again.";
}

function createMessage(
  role: ChatMessage["role"],
  content: string,
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
  };
}

export default function AIAgentChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState("");

  const askMutation = useAskAssistant();
  const isLoading = askMutation.isPending;

  // Callback ref: no useEffect dependency warning.
  const bottomRef = useCallback((node: HTMLDivElement | null) => {
    node?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);

  const sendQuestion = async (question: string, addUserMessage = true) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isLoading) return;

    if (trimmedQuestion.length > MAX_QUESTION_LENGTH) {
      setErrorMessage(
        `Please keep your question under ${MAX_QUESTION_LENGTH} characters.`,
      );
      return;
    }

    setErrorMessage("");
    setLastQuestion(trimmedQuestion);

    if (addUserMessage) {
      setMessages((previous) => [
        ...previous,
        createMessage("user", trimmedQuestion),
      ]);
    }

    setInput("");
    try {
      const response = await askMutation.mutateAsync({
        question: trimmedQuestion,
      });

      console.log("AI API response:", response);

      const answer =
        "data" in response && typeof response.data?.answer === "string"
          ? response.data.answer.trim()
          : "";

      if (!answer) {
        console.error("Unexpected AI response shape:", response);
        throw new Error("The AI response format was unexpected.");
      }

      setMessages((previous) => [
        ...previous,
        createMessage("assistant", answer),
      ]);
    } catch (error) {
      console.error("AI assistant error:", error);
      setErrorMessage(getErrorMessage(error));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendQuestion(input);
  };

  const handleNewChat = () => {
    if (isLoading) return;

    setMessages([]);
    setInput("");
    setErrorMessage("");
    setLastQuestion("");
    setCopiedMessageId("");
    askMutation.reset();
  };

  const handleCopy = async (message: ChatMessage) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedMessageId(message.id);

      // Reset the visual copy indicator without introducing a React effect.
      window.setTimeout(() => {
        setCopiedMessageId((current) =>
          current === message.id ? "" : current,
        );
      }, 1800);
    } catch {
      setErrorMessage("Unable to copy this response. Please try again.");
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 pb-8">
      {/* Header */}
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            AI-powered learning
            <span className="size-1.5 rounded-full bg-emerald-500" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            AI Assessment Assistant
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Your personal companion for coding assessments, technical
            interviews, programming concepts, and career growth.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleNewChat}
          disabled={isLoading || messages.length === 0}
          className="w-fit gap-2 rounded-xl"
        >
          <RotateCcw className="size-4" />
          New chat
        </Button>
      </header>

      {/* Feature cards */}
      <section
        aria-label="Assistant features"
        className="grid gap-3 sm:grid-cols-3"
      >
        {[
          {
            icon: Code2,
            title: "Coding guidance",
            description: "Understand concepts with clear explanations.",
          },
          {
            icon: Lightbulb,
            title: "Assessment prep",
            description: "Create a practical learning roadmap.",
          },
          {
            icon: Sparkles,
            title: "Career growth",
            description: "Discover the skills to learn next.",
          },
        ].map((feature) => {
          const Icon = feature.icon;

          return (
            <article
              key={feature.title}
              className="group rounded-2xl border border-border/70 bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/15 to-emerald-500/15 text-primary">
                <Icon className="size-5" />
              </div>

              <h2 className="text-sm font-semibold">{feature.title}</h2>

              <p className="mt-1 text-sm leading-5 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          );
        })}
      </section>

      {/* Chat panel */}
      <section className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
        {/* Chat header */}
        <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/15 to-emerald-500/15 text-primary">
              <Bot className="size-6" />
            </div>

            <div className="min-w-0">
              <h2 className="font-semibold">DevAssess AI</h2>
              <p className="text-xs text-muted-foreground">
                Programming study companion
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-full border border-border/80 px-3 py-1.5">
            <span
              className={`size-2 rounded-full ${
                isLoading ? "animate-pulse bg-amber-500" : "bg-emerald-500"
              }`}
            />
            <span className="text-xs text-muted-foreground">
              {isLoading ? "Thinking" : "Ready"}
            </span>
          </div>
        </div>

        {/* Conversation */}
        <div
          aria-live="polite"
          aria-relevant="additions text"
          className="min-h-[360px] space-y-6 p-4 sm:min-h-[440px] sm:p-6"
        >
          {messages.length === 0 ? (
            <div className="flex min-h-[310px] flex-col items-center justify-center py-8 text-center">
              <div className="mb-5 flex size-16 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500/15 to-emerald-500/15 text-primary">
                <Sparkles className="size-8" />
              </div>

              <h3 className="text-xl font-bold tracking-tight">
                What would you like to learn?
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Ask a question or choose a suggestion to start your learning
                session.
              </p>

              <div className="mt-7 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                {suggestions.map((suggestion) => {
                  const Icon = suggestion.icon;

                  return (
                    <button
                      key={suggestion.title}
                      type="button"
                      disabled={isLoading}
                      onClick={() => void sendQuestion(suggestion.prompt)}
                      className="group rounded-xl border border-border/80 bg-background p-4 text-left transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-105">
                        <Icon className="size-4" />
                      </div>

                      <p className="text-sm font-semibold">
                        {suggestion.title}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        {suggestion.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <article
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    isUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${
                      isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-gradient-to-br from-blue-500/10 to-emerald-500/10 text-primary"
                    }`}
                    aria-hidden="true"
                  >
                    {isUser ? (
                      <UserRound className="size-4" />
                    ) : (
                      <Bot className="size-5" />
                    )}
                  </div>

                  <div
                    className={`group/message min-w-0 max-w-[88%] rounded-2xl px-4 py-3 sm:max-w-[78%] ${
                      isUser
                        ? "rounded-tr-sm bg-primary text-primary-foreground"
                        : "rounded-tl-sm bg-muted/70 text-foreground"
                    }`}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="mb-3 mt-4 text-xl font-bold">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="mb-2 mt-4 text-lg font-semibold">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="mb-2 mt-3 text-base font-semibold">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-3 whitespace-pre-wrap leading-7 last:mb-0">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold">{children}</strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="mb-3 list-disc space-y-1 pl-6">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-3 list-decimal space-y-1 pl-6">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => <li>{children}</li>,
                        pre: ({ children }) => (
                          <pre className="my-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">
                            {children}
                          </pre>
                        ),
                        code: ({ children, className }) => {
                          const isBlock = Boolean(
                            className?.includes("language-"),
                          );

                          return isBlock ? (
                            <code className={className}>{children}</code>
                          ) : (
                            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>

                    {!isUser && (
                      <div className="mt-2 flex justify-end border-t border-border/40 pt-2">
                        <button
                          type="button"
                          onClick={() => void handleCopy(message)}
                          aria-label={
                            copiedMessageId === message.id
                              ? "Response copied"
                              : "Copy response"
                          }
                          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {copiedMessageId === message.id ? (
                            <>
                              <Check className="size-3.5" />
                              Copied
                            </>
                          ) : (
                            <>
                              <MessageCircle className="size-3.5" />
                              Copy response
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 text-primary">
                <Bot className="size-5" />
              </div>

              <div className="flex items-center gap-2 rounded-2xl rounded-tl-sm bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
                <LoaderCircle className="size-4 animate-spin" />
                Preparing your answer...
              </div>
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div
              role="alert"
              className="ml-12 max-w-xl rounded-xl border border-destructive/20 bg-destructive/5 p-4"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />

                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-6 text-destructive">
                    {errorMessage}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isLoading}
                      onClick={() => void sendQuestion(lastQuestion, false)}
                      className="gap-2"
                    >
                      <RotateCcw className="size-3.5" />
                      Try again
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setErrorMessage("")}
                      disabled={isLoading}
                      className="gap-2"
                    >
                      <X className="size-3.5" />
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Re-mount the sentinel when the conversation state changes. */}
          <div
            key={`${messages.length}-${isLoading}-${errorMessage}`}
            ref={bottomRef}
            aria-hidden="true"
          />
        </div>

        {/* Composer */}
        <div className="border-t border-border/70 bg-muted/20 p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-border bg-background p-2 shadow-sm transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10">
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    event.currentTarget.form?.requestSubmit();
                  }
                }}
                placeholder="Ask about JavaScript, React, coding assessments..."
                maxLength={MAX_QUESTION_LENGTH}
                rows={2}
                disabled={isLoading}
                aria-label="Ask the AI assistant a question"
                className="min-h-16 resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
              />

              <div className="flex items-center justify-between gap-3 px-2 pb-1">
                <p className="text-xs text-muted-foreground">
                  <span className="hidden sm:inline">
                    Enter to send · Shift + Enter for a new line
                  </span>
                  <span className="sm:hidden">
                    {input.length}/{MAX_QUESTION_LENGTH}
                  </span>
                </p>

                <div className="flex items-center gap-3">
                  <span className="hidden text-xs tabular-nums text-muted-foreground sm:inline">
                    {input.length}/{MAX_QUESTION_LENGTH}
                  </span>

                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    aria-label="Send message"
                    className="size-10 shrink-0 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-sm transition-opacity hover:opacity-90"
                  >
                    {isLoading ? (
                      <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                      <Send className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
              <Sparkles className="size-3.5 shrink-0" />
              AI can make mistakes. Verify important technical information.
            </p>
          </form>
        </div>
      </section>

      {messages.length > 0 && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("textarea")
                ?.scrollIntoView({ behavior: "smooth", block: "center" })
            }
            className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowDown className="size-3.5" />
            Continue the conversation
          </button>
        </div>
      )}
    </main>
  );
}
