"use client";
import React, { useState } from "react";
import { ResumeDownload } from "@/components/ui/ResumeDownload";

export function ResumeDownloadDemo() {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
      <ResumeDownload onChange={handleFileUpload} />
    </div>
  );
}
