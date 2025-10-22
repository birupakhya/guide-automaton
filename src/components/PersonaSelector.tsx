import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus, X } from "lucide-react";
import { useState } from "react";

interface Persona {
  id: string;
  name: string;
  description: string;
}

export const PersonaSelector = ({ 
  onComplete 
}: { 
  onComplete: (personas: Persona[]) => void 
}) => {
  const [personas, setPersonas] = useState<Persona[]>([
    { id: "1", name: "End User", description: "Someone using the product for the first time" }
  ]);
  const [newPersonaName, setNewPersonaName] = useState("");
  const [newPersonaDesc, setNewPersonaDesc] = useState("");

  const addPersona = () => {
    if (newPersonaName.trim()) {
      setPersonas([
        ...personas,
        {
          id: Date.now().toString(),
          name: newPersonaName,
          description: newPersonaDesc,
        },
      ]);
      setNewPersonaName("");
      setNewPersonaDesc("");
    }
  };

  const removePersona = (id: string) => {
    setPersonas(personas.filter((p) => p.id !== id));
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <Card className="max-w-3xl w-full p-8 space-y-6 bg-card/50 backdrop-blur-sm border-border shadow-large">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-glow">
            <Users className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Define User Personas</h2>
            <p className="text-muted-foreground">Who will be using this guide?</p>
          </div>
        </div>

        {/* Existing Personas */}
        <div className="space-y-3">
          {personas.map((persona) => (
            <div
              key={persona.id}
              className="flex items-start gap-3 p-4 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-foreground">{persona.name}</h3>
                <p className="text-sm text-muted-foreground">{persona.description}</p>
              </div>
              {personas.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePersona(persona.id)}
                  className="hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Add New Persona */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Input
            placeholder="Persona name (e.g., Administrator, Developer)"
            value={newPersonaName}
            onChange={(e) => setNewPersonaName(e.target.value)}
            className="bg-background"
          />
          <Textarea
            placeholder="Brief description of this persona's role and goals..."
            value={newPersonaDesc}
            onChange={(e) => setNewPersonaDesc(e.target.value)}
            className="bg-background resize-none"
            rows={3}
          />
          <Button
            onClick={addPersona}
            variant="outline"
            className="w-full border-dashed"
            disabled={!newPersonaName.trim()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Persona
          </Button>
        </div>

        {/* Continue Button */}
        <Button
          onClick={() => onComplete(personas)}
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-all shadow-glow"
        >
          Continue to Guide Generation
        </Button>
      </Card>
    </section>
  );
};

