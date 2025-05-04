import {JSX, useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {CirclePlusIcon, Trash} from "lucide-react";
import SendFilesDialog from "@/components/sendFilesDialog";
import {Label} from "@/components/ui/label";

interface FileItem {
    file: File;
    name: string;
}

const FileList = ({
                      files,
                      onRemoveFile
                  }: {
    files: FileItem[],
    onRemoveFile: (index: number) => void
}) => {
    if (files.length === 0) {
        return (
            <div className="text-sm text-muted-foreground text-center">
                Paylaşmak için dosya ekleyin.
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {files.map((fileItem, index) => (
                <div
                    key={`${fileItem.name}-${index}`}
                    className="bg-muted/90 rounded-md px-4 py-2 flex justify-between items-center text-sm"
                >
                    <div className="flex-1 truncate text-foreground">{fileItem.name}</div>
                    <Button
                        variant="ghost"
                        onClick={() => onRemoveFile(index)}
                    >
                        <Trash size={16} className="text-red-500 hover:text-red-700"/>
                    </Button>
                </div>
            ))}
        </div>
    );
};

function UploadCard(): JSX.Element {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [openSendFilesDialog, setOpenSendFilesDialog] = useState(false);

    const onDropFiles = useCallback((acceptedFiles: File[]) => {
        const newFiles: FileItem[] = acceptedFiles.map(file => ({
            file,
            name: file.name,
        }));

        setFiles(prev => [...prev, ...newFiles]);
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    }, []);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: onDropFiles,
        noClick: true,
        multiple: true,
        accept: {
            'application/vnd.rar': ['.rar'],
            'application/zip': ['.zip'],
            'application/x-zip-compressed': ['.zip'],
        }
    });

    const handleSendClick = () => {
        if (files.length === 0) {
            toast.error("Lütfen en az bir dosya yükleyin.");
            return;
        }

        setOpenSendFilesDialog(true);
    };

    return (
        <Card className="lg:w-[17.5em] w-full max-h-[30em]">
            <div className="flex justify-center items-center gap-1 px-6">
                <div {...getRootProps()}>
                    <input {...getInputProps()} id="fileInput"/>
                    <Button
                        className="h-full flex flex-col"
                        variant="outline"
                        onClick={() => document.getElementById("fileInput")?.click()}
                    >
                        <CirclePlusIcon className="w-6 h-6"/>
                        <Label>Dosya Yükle</Label>
                    </Button>
                </div>
            </div>

            <CardContent className="h-full overflow-y-auto">
                <FileList files={files} onRemoveFile={removeFile}/>
            </CardContent>

            <CardFooter className="flex">
                <Button onClick={handleSendClick} className="w-full">
                    Gönder
                </Button>

                <SendFilesDialog
                    open={openSendFilesDialog}
                    setOpen={setOpenSendFilesDialog}
                    files={files.map(f => f.file)}
                    setFiles={(newFiles) => {
                        setFiles(newFiles.map(file => ({
                            file,
                            name: file.name,
                        })));
                    }}
                />
            </CardFooter>
        </Card>
    );
}

export default UploadCard;