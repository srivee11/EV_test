"use client";

import { AssistantData, AssistantResponse } from "@/types/dashboard";
import { HugeiconsIcon } from "@hugeicons/react";
import { AiBrain02Icon, SentIcon } from "@hugeicons/core-free-icons";
import { KeyboardEvent, useMemo, useState } from "react";

type Props = {
  data: AssistantData;
};

export function AssistantPage({ data }: Props) {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"welcome" | "loading" | "response" | "empty" | "error">("welcome");
  const [activeResponse, setActiveResponse] = useState<AssistantResponse | null>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "assistant"; text: string }>>([]);
  const [showDetailsBubble, setShowDetailsBubble] = useState(false);

  const responseById = useMemo(
    () => Object.fromEntries(data.responses.map((response) => [response.id, response])),
    [data.responses],
  );

  const followUpByResponseId: Record<string, { question: string; answer: string }> = {
    r1: {
      question: "Draft a follow-up email for Globex on pricing clarification.",
      answer:
        "Here is a concise draft: Hi <Name>, following up on pricing - we can align package scope and timeline to hit your budget while preserving outcomes. Would a 15-minute call tomorrow work to finalize options?",
    },
    r2: {
      question: "What should I send Stark to handle discount pressure?",
      answer:
        "Send a value-led note with 3 ROI anchors: time-to-value, implementation savings, and expansion readiness. Offer two pricing paths (annual vs multi-year) and ask for decision criteria by Thursday.",
    },
    r3: {
      question: "Give me a 3-step plan to move ACME this week.",
      answer:
        "Step 1: Secure executive sponsor alignment with a one-page business case. Step 2: Validate implementation timeline in a 30-minute working session. Step 3: Lock a mutual action plan with dated milestones.",
    },
    r4: {
      question: "How can I recover this month's forecast gap quickly?",
      answer:
        "Prioritize near-close opportunities first, re-scope the downsized enterprise deal with a phased option, and pull forward one mid-market deal with a limited-time close plan this week.",
    },
  };

  const activeFollowUp =
    activeResponse && followUpByResponseId[activeResponse.id]
      ? followUpByResponseId[activeResponse.id]
      : followUpByResponseId.r1;
  const followUpEnabled = activeThreadId === "t1";
  const mondayFollowUpQuestion = "What should I send Globex today to unblock pricing?";

  const mondayConversationSeed: Array<{ role: "user" | "assistant"; text: string }> = [
    { role: "user", text: "Which accounts need attention this week?" },
    { role: "assistant", text: "3 accounts need follow-up based on email sentiment shifts and stalled CRM activity." },
    { role: "user", text: "Can you break that down by urgency?" },
    {
      role: "assistant",
      text: "High urgency: Globex (silent for 9 days after pricing). Medium: Initech (close date moved twice). Medium: Umbrella (renewal in 18 days with unresolved legal redlines).",
    },
  ];

  const runResponse = (response: AssistantResponse, threadId?: string) => {
    setActiveThreadId(threadId ?? null);
    setStatus("loading");
    setShowDetailsBubble(false);
    setTimeout(() => {
      setActiveResponse(response);
      setStatus("response");
      setChatMessages([{ role: "assistant", text: response.summary }]);
      setTimeout(() => setShowDetailsBubble(true), 220);
    }, 650);
  };

  const handlePrompt = (label: string, responseId: string) => {
    setInput(label);
    const target = responseById[responseId] ?? data.sampleResponse;
    runResponse(target);
  };

  const handleThread = (threadId: string, responseId: string) => {
    if (threadId === "t1") {
      setActiveThreadId(threadId);
      setStatus("loading");
      setShowDetailsBubble(false);
      setInput(mondayFollowUpQuestion);
      const target = responseById[responseId] ?? data.sampleResponse;
      setTimeout(() => {
        setActiveResponse(target);
        setChatMessages(mondayConversationSeed);
        setStatus("response");
      }, 650);
      return;
    }

    const target = responseById[responseId] ?? data.sampleResponse;
    setInput(target.query);
    runResponse(target, threadId);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setStatus("empty");
      return;
    }

    if (trimmed.toLowerCase().includes("error")) {
      setChatMessages((prev) => [...prev, { role: "user", text: trimmed }]);
      setStatus("loading");
      setTimeout(() => setStatus("error"), 650);
      return;
    }

    setStatus("loading");
    setShowDetailsBubble(false);
    setChatMessages((prev) => [...prev, { role: "user", text: trimmed }]);

    const matchedTopLevel = data.responses.find((item) => item.query.toLowerCase() === trimmed.toLowerCase());
    const matchedFollowUp = followUpEnabled
      ? Object.values(followUpByResponseId).find((item) => item.question.toLowerCase() === trimmed.toLowerCase())
      : undefined;

    setTimeout(() => {
      if (followUpEnabled && trimmed.toLowerCase() === mondayFollowUpQuestion.toLowerCase()) {
        setChatMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: "Send this: Hi <Name>, wanted to quickly align on pricing. We can offer two paths that fit your budget and timeline while keeping outcomes intact. Are you open to a 15-minute decision call today?",
          },
        ]);
        setStatus("response");
        return;
      }

      if (matchedTopLevel) {
        setActiveResponse(matchedTopLevel);
        setChatMessages((prev) => [...prev, { role: "assistant", text: matchedTopLevel.summary }]);
        setTimeout(() => setShowDetailsBubble(true), 220);
        setStatus("response");
        return;
      }

      if (matchedFollowUp) {
        setChatMessages((prev) => [...prev, { role: "assistant", text: matchedFollowUp.answer }]);
        setStatus("response");
        return;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "I can help with that. Try a saved conversation or suggested prompt for a contextual response.",
        },
      ]);
      setStatus("response");
    }, 700);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab" && !input.trim() && followUpEnabled) {
      event.preventDefault();
      setInput(activeFollowUp.question);
    }
  };

  return (
    <section className="flex-1 p-4 sm:p-6 md:p-8">
      <header className="mb-6">
        <h1 className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-800 sm:text-3xl">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
            <HugeiconsIcon icon={AiBrain02Icon} size={18} />
          </span>
          {data.title}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 sm:text-base">{data.subtitle}</p>
      </header>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_1fr]">
        <aside className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold text-slate-700">Suggested prompts</h2>
          <div className="mt-3 flex flex-col gap-2">
            {data.suggestedPrompts.map((prompt) => (
              <button
                key={prompt.id}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => handlePrompt(prompt.label, prompt.responseId)}
              >
                {prompt.label}
              </button>
            ))}
          </div>

          <h2 className="mt-6 text-sm font-semibold text-slate-700">Recent conversations</h2>
          <div className="mt-3 space-y-2">
            {data.savedThreads.map((thread) => (
              <button
                key={thread.id}
                className={`w-full rounded-lg border px-3 py-2 text-left ${
                  activeThreadId === thread.id ? "border-blue-300 bg-blue-50" : "border-slate-200"
                }`}
                onClick={() => handleThread(thread.id, thread.responseId)}
              >
                <p className="text-sm font-medium text-slate-700">{thread.title}</p>
                <p className="mt-1 text-xs text-slate-500">{thread.updatedAt}</p>
              </button>
            ))}
          </div>
        </aside>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          {status === "welcome" ? (
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 via-cyan-50 to-violet-50 p-5">
              <p className="text-lg font-semibold text-slate-800">{data.welcomeHeading}</p>
              <p className="mt-2 text-sm text-slate-600">{data.welcomeBody}</p>
            </div>
          ) : null}

          {status === "loading" ? (
            <div className="space-y-3">
              <div className="h-10 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-20 animate-pulse rounded-lg bg-slate-100" />
              <div className="h-20 animate-pulse rounded-lg bg-slate-100" />
            </div>
          ) : null}

          {status === "empty" ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              Type a question or click one of the suggested prompts to continue.
            </div>
          ) : null}

          {status === "error" ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              Something went wrong while fetching this response. Try again or choose another prompt.
            </div>
          ) : null}

          {(status === "response" || status === "loading") && chatMessages.length > 0 ? (
            <div className="mb-4 space-y-4 rounded-2xl border border-slate-200/80 bg-gradient-to-b from-white to-slate-50 p-4">
              {chatMessages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" ? (
                    <div className="flex max-w-[88%] items-end gap-2 transition-all duration-500 ease-out">
                      <span className="mb-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                        <HugeiconsIcon icon={AiBrain02Icon} size={14} />
                      </span>
                      <div className="rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-2.5 text-sm leading-6 text-slate-700 shadow-sm">
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[88%] translate-y-0 rounded-2xl rounded-tr-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-medium leading-6 text-white opacity-100 shadow-sm transition-all duration-300 ease-out">
                      {message.text}
                    </div>
                  )}
                </div>
              ))}
              {status === "response" && activeResponse && !followUpEnabled ? (
                <div
                  className={`flex max-w-[88%] items-end gap-2 transition-all duration-500 ease-out ${
                    showDetailsBubble ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  <span className="mb-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                    <HugeiconsIcon icon={AiBrain02Icon} size={14} />
                  </span>
                  <div className="w-full rounded-2xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm">
                    <div>
                      <p className="mb-1 font-semibold text-slate-800">Flags</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {activeResponse.flags.map((flag) => (
                          <li key={flag}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3">
                      <p className="mb-1 font-semibold text-slate-800">Suggested next actions</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {activeResponse.suggestions.map((suggestion) => (
                          <li key={suggestion}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-3">
                      <p className="mb-1 font-semibold text-slate-800">Sources used</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {activeResponse.sources.map((source) => (
                          <li key={source}>{source}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="mt-5 flex items-center gap-2">
            <div className="relative w-full">
            <input
              className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-700 outline-none ring-blue-500 placeholder:text-slate-400 focus:ring-2"
              placeholder="Ask AI about your accounts, emails, and forecasts..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            </div>
            <button
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white hover:bg-blue-700"
              onClick={handleSend}
            >
              <HugeiconsIcon icon={SentIcon} size={14} />
              Ask
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
