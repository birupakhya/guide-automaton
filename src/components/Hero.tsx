import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, BookOpen, Zap } from "lucide-react";
import { useState } from "react";

export const Hero = ({ onStartGeneration }: { onStartGeneration: (url: string) => void }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onStartGeneration(url);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/5" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border shadow-soft">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-foreground">AI-Powered Documentation</span>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              User Guides
            </span>
            <br />
            <span className="text-foreground">Created Automatically</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Enter any website URL and watch as AI explores, understands, and creates beautiful documentation—complete with screenshots and step-by-step guides.
          </p>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-2xl bg-card/50 backdrop-blur-sm border border-border shadow-large">
            <Input
              type="url"
              placeholder="Enter website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-lg"
              required
            />
            <Button 
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all shadow-glow"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Guide
            </Button>
          </div>
        </form>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card/30 backdrop-blur-sm border border-border">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Comprehensive Guides</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card/30 backdrop-blur-sm border border-border">
            <Zap className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium">Instant Generation</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-card/30 backdrop-blur-sm border border-border">
            <Sparkles className="w-5 h-5 text-primary-glow" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
        </div>
      </div>
    </section>
  );
};
