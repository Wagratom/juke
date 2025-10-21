import { Music4 } from "lucide-react";

export const JukefyLogo = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-4 px-6 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="relative">
        <Music4 className="h-6 w-6 text-primary animate-pulse" />
        <div className="absolute inset-0 blur-md bg-primary/30 rounded-full" />
      </div>
      <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent tracking-tight">
        Jukefy
      </h1>
    </div>
  );
};
