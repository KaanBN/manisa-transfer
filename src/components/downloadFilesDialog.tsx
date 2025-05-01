import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useEffect, useState} from "react";
import {ShareFileModel} from "@/models/shareFileModel.ts";
import {Checkbox} from "@/components/ui/checkbox.tsx";

type DownloadFilesDialogProps = {
    showFileListModal: boolean;
    setShowFileListModal: (open: boolean) => void;
    fileList: ShareFileModel[];
};

const DownloadFilesDialog = ({
                                 fileList,
                                 showFileListModal,
                                 setShowFileListModal
                             }: DownloadFilesDialogProps) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        if (!showFileListModal)
        {
            setSelectedIds([]);
        }
    }, [showFileListModal]);

    const allSelected = selectedIds.length === fileList.length;

    const handleToggle = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedIds([]);
        } else {
            setSelectedIds(fileList.map((file) => file.id));
        }
    };

    const handleDownload = () => {
        console.log("Selected file IDs:", selectedIds);

        setShowFileListModal(false);
    };

    return (
        <Dialog open={showFileListModal} onOpenChange={setShowFileListModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Dosyalar</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end">
                    <Button variant="outline" onClick={toggleSelectAll} className="mb-2">
                        {allSelected ? "Seçimi Kaldır" : "Hepsini Seç"}
                    </Button>
                </div>
                <div className="grid gap-3 py-2 max-h-64 overflow-y-auto pr-2">
                    {fileList.map((file) => (
                        <div key={file.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={file.id}
                                checked={selectedIds.includes(file.id)}
                                onCheckedChange={() => handleToggle(file.id)}
                            />
                            <Label htmlFor={file.id} className="cursor-pointer">
                                {file.fileName}
                            </Label>
                            <div
                                className={`w-3 h-3 ml-auto rounded-full ${file.status == 0 ? "bg-red-600" : "bg-green-600"}`}/>
                        </div>
                    ))}
                </div>
                <DialogFooter>
                    <Button onClick={handleDownload} disabled={selectedIds.length === 0}>
                        İndir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DownloadFilesDialog;