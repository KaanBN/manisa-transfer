import {useState, useCallback, JSX} from "react";
import { useDropzone } from "react-dropzone";
import {UploadedFileModel} from "@/models/uploadedFileModel.ts";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import { toast } from "sonner"
import {CirclePlusIcon, Trash} from "lucide-react";
import SendFilesDialog from "@/components/sendFilesDialog.tsx";
import {Label} from "@/components/ui/label.tsx";

function UploadCard(): JSX.Element {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileModel[]>([]);
    const [openSendFilesDialog, setOpenSendFilesDialog] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFilesUploaded = (newFiles: UploadedFileModel[]) => {
        setUploadedFiles(prev => [...prev, ...newFiles]);
    };

    const onDropFiles = useCallback((acceptedFiles: File[]) => {
        setSelectedFiles(prev => [...prev, ...acceptedFiles]);

        const mappedFiles: UploadedFileModel[] = acceptedFiles.map(file => ({
            name: file.name,
            size: file.size,
        }));
        handleFilesUploaded(mappedFiles);
    }, []);


    const { getRootProps: getFileRootProps, getInputProps: getFileInputProps } = useDropzone({
        onDrop: onDropFiles,
        noClick: true,
        multiple: true,
        accept: {
            'application/vnd.rar': ['.rar'],
            'application/zip': ['.zip'],
            'application/x-zip-compressed': ['.zip'],
        }
    });

    const handleFileClick = () => {
        document.getElementById("fileInput")?.click();
    };

    return (
        <Card className="lg:w-[17.5em] w-full max-h-[30em]">
            <div className="flex justify-center gap-1 px-6">
                <div {...getFileRootProps()} className="w-full">
                    <input {...getFileInputProps()} id="fileInput" />
                    <Button className="w-full h-full flex flex-col"
                            variant={"outline"}
                            onClick={handleFileClick}>
                        <CirclePlusIcon className="w-6 h-6" />
                        <Label>Dosya Yükle</Label>
                    </Button>
                </div>
            </div>
            <CardContent className="h-full overflow-y-auto">
                {uploadedFiles.length > 0 ? (
                    <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="bg-muted/90 rounded-md px-4 py-2 flex justify-between items-center text-sm"
                            >
                                <div className="flex-1 truncate text-foreground">{file.name}</div>
                                <Button
                                    variant={"ghost"}
                                    onClick={() => {
                                        setUploadedFiles(prev =>
                                            prev.filter((_, i) => i !== index)
                                        );
                                    }}
                                >
                                    <Trash
                                        size={16}
                                        className="text-red-500 hover:text-red-700"
                                    />
                                </Button>
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

                <SendFilesDialog
                    open={openSendFilesDialog}
                    setOpen={setOpenSendFilesDialog}
                    files={selectedFiles}
                    setFiles={setSelectedFiles}
                />
            </CardFooter>
        </Card>

    );
}

export default UploadCard;
