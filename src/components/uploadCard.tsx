import CirclePlusIcon from "../assets/svgs/circle-plus.svg";
import AddFolderIcon from "../assets/svgs/add-folders.svg";
import {useState, useCallback, JSX} from "react";
import { useDropzone } from "react-dropzone";
import {UploadedFileModel} from "@/models/uploadedFileModel.ts";

type UploadCardProps = {
    onFilesUploaded: (files: UploadedFileModel[]) => void;
};

function UploadCard({ onFilesUploaded }: UploadCardProps): JSX.Element {
    const [showExpiryOptions, setShowExpiryOptions] = useState<boolean>(false);
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
        <div className="bg-white bg-opacity-90 text-gray-800 rounded-xl shadow-lg p-6 w-[17.5em] h-[30em] flex flex-col">
            <div className="overflow-y-auto flex-grow">
                <div className="flex items-center justify-center gap-1">
                    <div className="div-btn-upload" {...getFileRootProps()}>
                        <input {...getFileInputProps()} id="fileInput" />
                        <button type="button" className="btn-upload" onClick={handleFileClick}>
                            <img src={CirclePlusIcon} alt="file upload" />
                            Dosya Yükle
                        </button>
                    </div>

                    <div className="div-btn-upload" {...getFolderRootProps()}>
                        <input {...getFolderInputProps()} id="folderInput" webkitdirectory="" type="file" />
                        <button type="button" className="btn-upload" onClick={handleFolderClick}>
                            <img src={AddFolderIcon} alt="file folder" />
                            Klasör Yükle
                        </button>
                    </div>
                </div>

                {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                        {uploadedFiles.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="bg-gray-100 rounded-lg px-4 py-2 flex justify-between items-center text-sm"
                            >
                                <span className="text-gray-800 truncate">{file.name}</span>
                                <span className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB</span>
                            </div>
                        ))}
                    </div>
                )}


                <div className="space-y-4 mt-4">
                    <input
                        type="email"
                        placeholder="Alıcı e-posta adresi"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none"
                    />
                    <input
                        type="email"
                        placeholder="E-postanız"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Başlık"
                        className="w-full border-b border-gray-300 py-2 focus:outline-none"
                    />
                    <textarea
                        placeholder="Mesaj"
                        className="w-full border-b border-gray-300 py-2 h-24 resize-none focus:outline-none"
                    />
                </div>
            </div>

            <div className="pt-4 mt-4 bg-white">
                <div className="flex items-center justify-between gap-2 relative">
                    <div
                        className="border border-gray-300 rounded-full py-2 px-4 flex-grow flex items-center justify-between cursor-pointer"
                        onClick={() => setShowExpiryOptions(!showExpiryOptions)}
                    >
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <span className="text-[14px]">Geçerlilik süresi</span>
                        </div>
                        <svg className={`w-4 h-4 transition-transform ${showExpiryOptions ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none">
                            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <button className="border border-gray-300 rounded-full p-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="2" fill="currentColor" />
                            <circle cx="6" cy="12" r="2" fill="currentColor" />
                            <circle cx="18" cy="12" r="2" fill="currentColor" />
                        </svg>
                    </button>

                    {showExpiryOptions && (
                        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-10">
                            <div className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">1 gün</div>
                            <div className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">7 gün</div>
                            <div className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">30 gün</div>
                            <div className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer">Sınırsız</div>
                        </div>
                    )}
                </div>

                <button className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-full hover:bg-blue-700 transition mt-4">
                    Devam et
                </button>
            </div>
        </div>
    );
}

export default UploadCard;
