import { Button } from "./ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "./ui/dialog";
import {Input} from "@/components/ui/input.tsx";
import {toast} from "sonner";

type ShareLinkDialogProps = {
    showLinkModal: boolean;
    setShowLinkModal: (open: boolean) => void;
    downloadLink: string;
}

const ShareLinkDialog = ({showLinkModal, setShowLinkModal, downloadLink } : ShareLinkDialogProps) => {
    return (
        <Dialog open={showLinkModal} onOpenChange={setShowLinkModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Paylaşım Bağlantısı</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <p className="text-sm">Bu bağlantıyı paylaşabilirsiniz:</p>
                    <Input
                        readOnly
                        value={downloadLink ?? ""}
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                    />
                    <Button
                        type="button"
                        onClick={() => {
                            navigator.clipboard.writeText(downloadLink!);
                            toast.success("Bağlantı kopyalandı!");
                            setShowLinkModal(false);
                        }}
                    >
                        Kopyala ve Kapat
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ShareLinkDialog;