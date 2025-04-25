import {useState, useCallback, JSX} from "react";
import { useDropzone } from "react-dropzone";
import {UploadedFileModel} from "@/models/uploadedFileModel.ts";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import { toast } from "sonner"
import {CirclePlusIcon, FolderPlusIcon, Trash} from "lucide-react";
import SendFilesDialog from "@/components/sendFilesDialog.tsx";
import {Label} from "@/components/ui/label.tsx";

function UploadCard(): JSX.Element {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileModel[]>([]);
    const [openSendFilesDialog, setOpenSendFilesDialog] = useState(false)

    const handleFilesUploaded = (newFiles: UploadedFileModel[]) => {
        setUploadedFiles(prev => [...prev, ...newFiles]);
    };

    const onDropFiles = useCallback((acceptedFiles: File[]) => {
        const mappedFiles: UploadedFileModel[] = acceptedFiles.map(file => ({
            name: file.name,
            size: file.size,
            oneTimeDownload: false,
        }));
        handleFilesUploaded(mappedFiles);
    }, [handleFilesUploaded]);

    const onDropFolders = useCallback((acceptedFiles: File[]) => {
        const mappedFiles: UploadedFileModel[] = acceptedFiles.map(file => ({
            name: file.name,
            size: file.size,
            oneTimeDownload: false,
        }));
        handleFilesUploaded(mappedFiles);
    }, [handleFilesUploaded]);

    const { getRootProps: getFileRootProps, getInputProps: getFileInputProps } = useDropzone({
        onDrop: onDropFiles,
        noClick: true,
        multiple: true,
    });

    const { getRootProps: getFolderRootProps, getInputProps: getFolderInputProps } = useDropzone({
        onDrop: onDropFolders,
        noClick: true,
        multiple: true,
    });

    const handleFileClick = () => {
        document.getElementById("fileInput")?.click();
    };

    const handleFolderClick = () => {
        document.getElementById("folderInput")?.click();
    };

    return (
        <Card className="lg:w-[17.5em] w-full max-h-[30em]">
            <CardContent className="h-full flex flex-col overflow-y-auto relative space-y-4">
                <div className="flex justify-center gap-1">
                    <div {...getFileRootProps()} className="w-full lg:w-auto">
                        <input {...getFileInputProps()} id="fileInput" />
                        <Button className="w-full h-full flex flex-col"
                             onClick={handleFileClick}>
                            <CirclePlusIcon className="w-6 h-6" />
                            <Label>Dosya Yükle</Label>
                        </Button>
                    </div>

                    <div {...getFolderRootProps()} className="w-full lg:w-auto">
                        <input {...getFolderInputProps()} id="folderInput" type="file" webkitdirectory="" />
                        <Button className="w-full h-full flex flex-col"
                            onClick={handleFolderClick}>
                            <FolderPlusIcon className="w-6 h-6" />
                            <Label>Klasör Yükle</Label>
                        </Button>
                    </div>
                </div>


                {uploadedFiles.length > 0 ? (
                    <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="bg-muted/90 rounded-md px-4 py-2 flex justify-between items-center text-sm"
                            >
                                <div className="flex-1 truncate text-foreground">{file.name}</div>
                                <Trash
                                    size={16}
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                    onClick={() => {
                                        setUploadedFiles(prev =>
                                            prev.filter((_, i) => i !== index)
                                        );
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-sm text-muted-foreground text-center">
                        Paylaşmak için dosya ekleyin.
                    </div>
                )}

            </CardContent>
            <CardFooter className="flex">
                <Button
                    onClick={() => {
                        if (uploadedFiles.length === 0) {
                            toast.error("Lütfen en az bir dosya yükleyin.")
                        }
                        else {
                            setOpenSendFilesDialog(true);
                        }
                    }}
                    className={"w-full"}>Gönder</Button>

                <SendFilesDialog open={openSendFilesDialog} setOpen={setOpenSendFilesDialog} />
            </CardFooter>
        </Card>

    );
}

export default UploadCard;
