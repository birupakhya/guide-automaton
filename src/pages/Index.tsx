import { useState } from "react";
import { Hero } from "@/components/Hero";
import { PersonaSelector } from "@/components/PersonaSelector";
import { GuideGenerator } from "@/components/GuideGenerator";

type Stage = "hero" | "personas" | "generating";

interface Persona {
  name: string;
  description: string;
}

const Index = () => {
  const [stage, setStage] = useState<Stage>("hero");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [personas, setPersonas] = useState<Persona[]>([]);

  const handleStartGeneration = (url: string) => {
    setWebsiteUrl(url);
    setStage("personas");
  };

  const handlePersonasComplete = (selectedPersonas: Persona[]) => {
    setPersonas(selectedPersonas);
    setStage("generating");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {stage === "hero" && <Hero onStartGeneration={handleStartGeneration} />}
      {stage === "personas" && <PersonaSelector onComplete={handlePersonasComplete} />}
      {stage === "generating" && <GuideGenerator url={websiteUrl} personas={personas} />}
    </main>
  );
};

export default Index;
