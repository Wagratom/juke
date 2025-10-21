import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { PixPayment } from "./PixPayment";

interface AddSongDialogProps {
  onAddSong: (song: { title: string; artist: string; requestedBy: string; coverUrl: string }) => void;
}

const availableSongs = [
  { id: "1", title: "Blinding Lights", artist: "The Weeknd", coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop" },
  { id: "2", title: "Levitating", artist: "Dua Lipa", coverUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
  { id: "3", title: "Save Your Tears", artist: "The Weeknd", coverUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=300&h=300&fit=crop" },
  { id: "4", title: "Good 4 U", artist: "Olivia Rodrigo", coverUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop" },
  { id: "5", title: "Heat Waves", artist: "Glass Animals", coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop" },
  { id: "6", title: "Peaches", artist: "Justin Bieber", coverUrl: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop" },
];

export const AddSongDialog = ({ onAddSong }: AddSongDialogProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [step, setStep] = useState<'search' | 'payment'>('search');
  const [selectedSong, setSelectedSong] = useState<typeof availableSongs[0] | null>(null);

  const filteredSongs = availableSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSong = (song: typeof availableSongs[0]) => {
    if (!userName.trim()) {
      toast.error("Por favor, digite seu nome");
      return;
    }
    setSelectedSong(song);
    setStep('payment');
  };

  const handlePaymentConfirm = () => {
    if (selectedSong) {
      onAddSong({ 
        title: selectedSong.title, 
        artist: selectedSong.artist, 
        requestedBy: userName,
        coverUrl: selectedSong.coverUrl 
      });
      toast.success("Música adicionada à fila!");
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStep('search');
    setSearch("");
    setUserName("");
    setSelectedSong(null);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      handleClose();
    } else {
      setOpen(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow bg-gradient-primary hover:opacity-90 transition-smooth"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            {step === 'search' ? 'Adicionar música' : 'Pagamento PIX'}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === 'search' 
              ? 'Escolha uma música para adicionar à fila' 
              : 'Complete o pagamento para adicionar a música'}
          </DialogDescription>
        </DialogHeader>
        {step === 'search' ? (
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Seu nome"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-muted/50 border-border"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar música ou artista..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-muted/50 border-border"
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredSongs.map((song) => (
                <Card
                  key={song.id}
                  className="p-3 bg-muted/30 border-border/50 hover:bg-muted/50 cursor-pointer transition-smooth"
                  onClick={() => handleSelectSong(song)}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={song.coverUrl} 
                      alt={song.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{song.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>
                  </div>
                </Card>
              ))}
              {filteredSongs.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma música encontrada
                </p>
              )}
            </div>
          </div>
        ) : (
          <PixPayment 
            amount={5.00}
            onConfirm={handlePaymentConfirm}
            onCancel={() => setStep('search')}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
