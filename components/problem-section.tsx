import { AlertCircle, Clock, TrendingDown } from "lucide-react";
import { ProblemTabs } from "@/components/blocks/problem-tabs";

const demoData = {
  badge: "The Problem",
  heading: "Why Delivery Fails Today",
  description:
    "Project delays aren't a mystery — they're the result of predictable patterns. While traditional tools only track progress, Huzlr actively prevents failure by addressing root causes.",
  tabs: [
    {
      value: "tab-1",
      icon: <AlertCircle className="h-auto w-4 shrink-0" />,
      label: "Planning Issues",
      content: {
        badge: "Root Cause #1",
        title: "Unclear requirements & scope creep",
        description:
          "Projects start with vague requirements that evolve constantly. Dependencies get missed, scope expands uncontrollably, and teams struggle to estimate accurately. Without clear boundaries, every project becomes a moving target.",
        buttonText: "See How Huzlr Helps",
        imageSrc:
          "https://www.shadcnblocks.com/images/block/placeholder-dark-1.svg",
        imageAlt: "Planning issues visualization",
      },
    },
    {
      value: "tab-2",
      icon: <Clock className="h-auto w-4 shrink-0" />,
      label: "Visibility Gaps",
      content: {
        badge: "Root Cause #2",
        title: "Lack of real-time visibility & communication gaps",
        description:
          "Teams work in silos with outdated status updates. By the time problems surface in meetings, it's too late to course-correct. Poor communication leads to duplicated work, missed handoffs, and constant firefighting.",
        buttonText: "Discover the Solution",
        imageSrc:
          "https://www.shadcnblocks.com/images/block/placeholder-dark-2.svg",
        imageAlt: "Visibility and communication issues",
      },
    },
    {
      value: "tab-3",
      icon: <TrendingDown className="h-auto w-4 shrink-0" />,
      label: "Team Burnout",
      content: {
        badge: "Root Cause #3",
        title: "Burnout & reactive planning",
        description:
          "Teams constantly react to crises instead of preventing them. Poor time estimation leads to unrealistic deadlines, overtime becomes the norm, and quality suffers. The cycle of reactive work drains morale and productivity.",
        buttonText: "Break the Cycle",
        imageSrc:
          "https://www.shadcnblocks.com/images/block/placeholder-dark-3.svg",
        imageAlt: "Team burnout and reactive planning",
      },
    },
  ],
};

export function ProblemSection() {
  return <ProblemTabs {...demoData} />;
}
