import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle, FileText, Download, Share2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Step {
  title: string;
  description: string;
  screenshot?: string;
}

interface Guide {
  title: string;
  persona: string;
  steps: Step[];
}

export const GuideGenerator = ({ 
  url,
  personas 
}: { 
  url: string;
  personas: Array<{ name: string; description: string }>;
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("Analyzing website...");
  const [isComplete, setIsComplete] = useState(false);
  const [guides, setGuides] = useState<Guide[]>([]);

  useEffect(() => {
    // Simulate guide generation process
    const steps = [
      { progress: 20, text: "Analyzing website structure..." },
      { progress: 40, text: "Capturing screenshots..." },
      { progress: 60, text: "Identifying user workflows..." },
      { progress: 80, text: "Generating documentation with AI..." },
      { progress: 100, text: "Finalizing guides..." },
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < steps.length) {
        setProgress(steps[currentIndex].progress);
        setCurrentStep(steps[currentIndex].text);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        
        // Generate sample guides
        const sampleGuides = personas.map((persona) => ({
          title: `User Guide for ${persona.name}`,
          persona: persona.name,
          steps: [
            {
              title: "Getting Started",
              description: `This guide will walk you through the essential features tailored for ${persona.name.toLowerCase()}s.`,
            },
            {
              title: "Navigation Overview",
              description: "Learn how to navigate the main interface and access key features.",
            },
            {
              title: "Key Features",
              description: "Discover the most important features for your workflow.",
            },
            {
              title: "Best Practices",
              description: "Tips and tricks to get the most out of the platform.",
            },
          ],
        }));
        setGuides(sampleGuides);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [personas]);

  if (!isComplete) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-2xl w-full p-8 space-y-6 bg-card/50 backdrop-blur-sm border-border shadow-large">
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Generating Your Guide</h2>
              <p className="text-muted-foreground">{currentStep}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">{progress}% complete</p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/30 border border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Analyzing:</span> {url}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="font-semibold text-foreground">Personas:</span> {personas.map(p => p.name).join(", ")}
            </p>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Success Header */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border shadow-large">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gradient-to-br from-accent to-primary">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">Guides Generated Successfully!</h2>
              <p className="text-muted-foreground">Your comprehensive user documentation is ready</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Generated Guides */}
        <div className="grid gap-6">
          {guides.map((guide, idx) => (
            <Card key={idx} className="p-6 bg-card/50 backdrop-blur-sm border-border shadow-medium">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">For {guide.persona}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {guide.steps.map((step, stepIdx) => (
                    <div
                      key={stepIdx}
                      className="p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center text-white font-semibold text-sm">
                          {stepIdx + 1}
                        </div>
                        <div className="flex-1 space-y-1">
                          <h4 className="font-semibold text-foreground">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
