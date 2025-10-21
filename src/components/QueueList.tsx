import { Music2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Song {
  id: string;
  title: string;
  artist: string;
  requestedBy?: string;
  coverUrl?: string;
}

interface QueueListProps {
  songs: Song[];
}

export const QueueList = ({ songs }: QueueListProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground px-6">
        Próximas músicas
      </h2>
      {songs.length === 0 ? (
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 mx-6">
          <div className="text-center text-muted-foreground">
            <Music2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma música na fila ainda</p>
            <p className="text-sm mt-1">Seja o primeiro a adicionar!</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-2 px-6">
          {songs.map((song, index) => (
            <Card
              key={song.id}
              className="p-4 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/70 transition-smooth"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  {song.coverUrl ? (
                    <img 
                      src={song.coverUrl} 
                      alt={song.title}
                      className="h-14 w-14 rounded object-cover"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded bg-muted flex items-center justify-center">
                      <Music2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute -top-1 -left-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{song.title}</p>
                  <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                  {song.requestedBy && (
                    <p className="text-xs text-muted-foreground/70 truncate mt-1">
                      Adicionado por {song.requestedBy}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
