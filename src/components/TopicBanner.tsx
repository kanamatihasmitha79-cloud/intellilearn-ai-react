import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

interface TopicBannerProps {
  subject: string;
  topic: string;
  className?: string;
}

export const TopicBanner: React.FC<TopicBannerProps> = ({
  subject,
  topic,
  className = '',
}) => {
  return (
    <div
      id="current-topic-banner"
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs font-semibold shadow-2xs ${className}`}
    >
      <span className="flex items-center gap-1.5 text-indigo-700 font-bold">
        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
        <span>{subject}</span>
      </span>
      <span className="text-indigo-300 font-bold">•</span>
      <span className="text-slate-500 font-medium">Current Topic:</span>
      <span className="font-extrabold text-indigo-900 bg-white px-2 py-0.5 rounded-md border border-indigo-100 shadow-2xs">
        {topic}
      </span>
    </div>
  );
};
