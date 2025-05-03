import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";

type Props = {
    open: boolean;
    onClose: () => void;
}

const SettingsDialog: React.FC<Props> = ({open, onClose}) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"max-h-[90vh] overflow-y-auto"}>
                <DialogHeader>
                    <DialogTitle>Ayarlar</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SettingsDialog;