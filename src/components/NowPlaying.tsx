import { Music } from "lucide-react";
import { Card } from "@/components/ui/card";

interface NowPlayingProps {
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
}

export const NowPlaying = ({ title, artist, album, coverUrl }: NowPlayingProps) => {
  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-xl border-primary/20 shadow-glow">
      <div className="flex items-center gap-4">
        <div className="relative">
          {coverUrl ? (
            <img 
              src={coverUrl} 
              alt={title}
              className="h-20 w-20 rounded-lg object-cover animate-pulse"
            />
          ) : (
            <div className="h-20 w-20 rounded-lg bg-gradient-primary flex items-center justify-center animate-pulse">
              <Music className="h-10 w-10 text-primary-foreground" />
            </div>
          )}
          <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-secondary rounded-full flex items-center justify-center animate-bounce">
            <div className="h-2 w-2 bg-secondary-foreground rounded-full" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Tocando agora
          </p>
          <h2 className="text-xl font-bold text-foreground truncate">{title}</h2>
          <p className="text-sm text-muted-foreground truncate">{artist}</p>
          {album && (
            <p className="text-xs text-muted-foreground/70 truncate">{album}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
