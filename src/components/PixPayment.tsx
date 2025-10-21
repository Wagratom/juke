import { Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";

interface PixPaymentProps {
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const PixPayment = ({ amount, onConfirm, onCancel }: PixPaymentProps) => {
  const [copied, setCopied] = useState(false);
  
  // Código PIX simulado
  const pixCode = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p652040000530398654045.005802BR5925JUKEFY MUSIC PLATFORM6009SAO PAULO62070503***63041D3D";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    toast.success("Código PIX copiado!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Valor a pagar</p>
        <p className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          R$ {amount.toFixed(2)}
        </p>
      </div>

      <Card className="p-6 bg-gradient-card border-primary/20">
        <div className="flex flex-col items-center gap-4">
          {/* QR Code simulado */}
          <div className="w-48 h-48 bg-white rounded-lg p-3 shadow-glow">
            <div className="w-full h-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded flex items-center justify-center">
              <div className="text-white text-xs text-center p-4">
                QR CODE PIX<br/>
                <span className="text-[8px] opacity-70">Escaneie para pagar</span>
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className="text-xs text-muted-foreground mb-2 text-center">
              Ou copie o código PIX:
            </p>
            <div className="flex gap-2">
              <div className="flex-1 bg-muted/50 rounded-lg px-3 py-2 text-xs text-muted-foreground truncate font-mono border border-border">
                {pixCode.substring(0, 40)}...
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-2">
        <Button
          onClick={onConfirm}
          className="w-full bg-gradient-primary hover:opacity-90 transition-smooth"
          size="lg"
        >
          Já realizei o pagamento
        </Button>
        <Button
          onClick={onCancel}
          variant="ghost"
          className="w-full"
        >
          Cancelar
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        Após confirmar o pagamento, sua música será adicionada à fila
      </p>
    </div>
  );
};
