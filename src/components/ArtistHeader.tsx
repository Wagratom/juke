import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArtistHeaderProps {
  name: string;
  image: string;
}

export const ArtistHeader = ({ name, image }: ArtistHeaderProps) => {
  return (
    <header className="flex items-center gap-4 p-6 bg-gradient-card backdrop-blur-xl border-b border-border">
      <Avatar className="h-16 w-16 ring-2 ring-primary shadow-glow">
        <AvatarImage src={image} alt={name} />
        <AvatarFallback className="bg-gradient-primary text-primary-foreground">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-muted-foreground">Sala de</p>
        <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {name}
        </h1>
      </div>
    </header>
  );
};
