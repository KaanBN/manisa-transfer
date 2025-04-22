import {useState, useCallback, JSX} from "react";
import { useDropzone } from "react-dropzone";
import {UploadedFileModel} from "@/models/uploadedFileModel.ts";
import {Card, CardAction, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {CirclePlusIcon, FolderPlusIcon, Trash} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";

type UploadCardProps = {
    onFilesUploaded: (files: UploadedFileModel[]) => void;
};

function UploadCard({ onFilesUploaded }: UploadCardProps): JSX.Element {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileModel[]>([]);

    const onDropFiles = useCallback((acceptedFiles: File[]) => {
        const mappedFiles: UploadedFileModel[] = acceptedFiles.map(file => ({
            name: file.name,
            size: file.size,
            oneTimeDownload: false,
        }));
        setUploadedFiles(prev => [...prev, ...mappedFiles]);
        onFilesUploaded(mappedFiles);
    }, [onFilesUploaded]);

    const onDropFolders = useCallback((acceptedFiles: File[]) => {
        const mappedFiles: UploadedFileModel[] = acceptedFiles.map(file => ({
            name: file.name,
            size: file.size,
            oneTimeDownload: false,
        }));
        setUploadedFiles(prev => [...prev, ...mappedFiles]);
        onFilesUploaded(mappedFiles);
    }, [onFilesUploaded]);

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
        <Card className="w-[17.5em] h-[30em]">
            <CardContent className="h-full flex flex-col overflow-y-auto relative space-y-4">
                <div className="flex items-center justify-center gap-1">
                    <div className="div-btn-upload" {...getFileRootProps()}>
                        <input {...getFileInputProps()} id="fileInput" />
                        <Button onClick={handleFileClick}>
                            <CirclePlusIcon />
                            Dosya Yükle
                        </Button>
                    </div>

                    <div className="div-btn-upload" {...getFolderRootProps()}>
                        <input
                            {...getFolderInputProps()}
                            id="folderInput"
                            webkitdirectory=""
                            type="file"
                        />
                        <Button onClick={handleFolderClick}>
                            <FolderPlusIcon />
                            Klasör Yükle
                        </Button>
                    </div>
                </div>

                {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center text-sm"
                            >
                                <div className="flex-1 truncate text-gray-800">{file.name}</div>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 text-xs">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </span>
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
                            </div>
                        ))}
                    </div>
                )}

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="title">Başlık</Label>
                    <Input id="title" placeholder="Başlık" />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="message">Mesaj</Label>
                    <Textarea className="min-h-[100px]" placeholder="Mesajınızı buraya yazabilirsiniz." id="message" />
                </div>
            </CardContent>
            <CardFooter className="flex">
                <Button className={"w-full"}>Gönder</Button>
            </CardFooter>
        </Card>

    );
}

export default UploadCard;
