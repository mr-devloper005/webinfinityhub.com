"use client";

import { useState } from "react";
import Link from "next/link";

interface PdfActionsProps {
  fileUrl: string;
}

export function PdfActions({ fileUrl }: PdfActionsProps) {
  const [showNotification, setShowNotification] = useState(false);

  const handleShareDocument = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  return (
    <>
      <div className="space-y-3">
        <a
          href={fileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3 3m3-3l3 3m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PDF
        </a>
        <button
          onClick={handleShareDocument}
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.75c-.028-.036-.058-.075-.087-.124C8.828 12.423 8.61 12.045 8.38 11.645c-.028-.04-.058-.078-.088-.12-.167-.227-.313-.376-.474-.637-.822-1.178-2.018-2.818-2.818-1.64 0-2.818 1.178 0 2.018.376.313.474.12.167.088.078.058.028C6.886 12.938 6.114 13.342 6.316 13.658c.058.049.124.09.188.164.28.313.376.474.637.822 1.178 2.018 2.818 2.818 1.64 0 2.818-1.178 0-2.018-.376-.313-.474-.12-.167-.088-.078-.058-.028C6.886 12.938 6.114 13.342 6.316 13.658c.058.049.124.09.188.164.28.313.376.474.637.822 1.178 2.018 2.818 2.818 1.64 0 2.818-1.178 0-2.018-.376-.313-.474-.12-.167-.088-.078-.058-.028C6.886 12.938 6.114 13.342 6.316 13.658c.058.049.124.09.188.164.28.313.376.474.637.822 1.178 2.018 2.818 2.818 1.64 0 2.818-1.178 0-2.018-.376-.313-.474-.12-.167-.088-.078-.058-.028z" />
          </svg>
          Share Document
        </button>
        <Link
          href="/login"
          className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
          </svg>
          Add to Collection
        </Link>
      </div>

      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-3 rounded-lg bg-green-600 px-6 py-4 text-white shadow-lg">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Document URL copied to clipboard!</span>
          </div>
        </div>
      )}
    </>
  );
}
