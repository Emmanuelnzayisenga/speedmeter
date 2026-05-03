"use client";
import { Button } from "./button";
import { ChevronLeft } from "lucide-react";

function BackButton() {
  return (
    <div className="absolute top-6 left-6 z-50 group">
      <Button
        variant="ghost"
        className="h-14 w-14 rounded-full bg-background/60 backdrop-blur-xl border border-border/50 shadow-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 hover:scale-105 hover:-translate-x-1 hover:shadow-md transition-all duration-300 flex items-center justify-center"
        onClick={() => window.history.back()}
        aria-label="Go back"
      >
        <ChevronLeft className="h-8 w-8" strokeWidth={2.5} />
      </Button>
    </div>
  );
}

export default BackButton;
