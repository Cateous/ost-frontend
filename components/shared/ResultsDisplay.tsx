
"use client";

import React from "react";
import { Copy, Download, Loader2 } from "lucide-react";
import Typewriter from "@/components/shared/Typewriter";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResultsDisplayProps {
  isLoading: boolean;
  result: string | null;
  error: string | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  isLoading,
  result,
  error,
}) => {
  const { toast } = useToast();

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied to clipboard!",
        description: "The scan results have been copied.",
      });
    }
  };

  const handleDownload = () => {
    if (result) {
      const blob = new Blob([result], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "scan_results.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  if (!isLoading && !result && !error) {
    return null;
  }

  return (
    <div className="mt-6 border border-accent/20 rounded-lg bg-black/40 backdrop-blur-md">
      <div className="flex items-center justify-between p-4 border-b border-accent/20">
        <h3 className="font-semibold text-foreground/80">
          {isLoading ? "Running scan..." : error ? "Error" : "Results"}
        </h3>
        {result && !isLoading && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={handleCopy} title="Copy results">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload} title="Download results">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <ScrollArea className="h-72 w-full">
        <div className="p-4 font-code text-sm h-full">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <p className="text-destructive whitespace-pre-wrap">{error}</p>
          ) : result ? (
            <pre className="whitespace-pre-wrap">
              <code>
                <Typewriter text={result} />
              </code>
            </pre>
          ) : null}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResultsDisplay;
