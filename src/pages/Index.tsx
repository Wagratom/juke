import { useState } from "react";
import { JukefyLogo } from "@/components/JukefyLogo";
import { ArtistHeader } from "@/components/ArtistHeader";
import { NowPlaying } from "@/components/NowPlaying";
import { QueueList } from "@/components/QueueList";
import { AddSongDialog } from "@/components/AddSongDialog";
import artistImage from "@/assets/artist-profile.jpg";

interface Song {
  id: string;
  title: string;
  artist: string;
  requestedBy?: string;
  coverUrl?: string;
}

const Index = () => {
  const [queue, setQueue] = useState<Song[]>([
    {
      id: "1",
      title: "Starboy",
      artist: "The Weeknd ft. Daft Punk",
      requestedBy: "Maria",
      coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
    },
    {
      id: "2",
      title: "One More Time",
      artist: "Daft Punk",
      requestedBy: "João",
      coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop"
    },
  ]);

  const nowPlaying = {
    title: "Get Lucky",
    artist: "Daft Punk ft. Pharrell Williams",
    album: "Random Access Memories",
    coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop"
  };

  const handleAddSong = (song: { title: string; artist: string; requestedBy: string; coverUrl: string }) => {
    const newSong: Song = {
      id: Date.now().toString(),
      ...song,
    };
    setQueue([...queue, newSong]);
  };

  return (
    <main className="min-h-screen bg-background pb-24">
      <JukefyLogo />
      <ArtistHeader name="DJ Purple Beats" image={artistImage} />
      
      <div className="space-y-6 py-6">
        <div className="px-6">
          <NowPlaying {...nowPlaying} />
        </div>
        
        <QueueList songs={queue} />
      </div>

      <AddSongDialog onAddSong={handleAddSong} />
    </main>
  );
};

export default Index;
