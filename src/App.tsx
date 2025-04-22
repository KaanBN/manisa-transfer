import {JSX, useState} from 'react';
import bg from './assets/images/background.png';
import Navbar from "@/components/navbar";
import UploadCard from "@/components/uploadCard.tsx";
import {UploadedFileModel} from "@/models/uploadedFileModel.ts";

function App(): JSX.Element {
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFileModel[]>([]);

    const handleFilesUploaded = (newFiles: UploadedFileModel[]) => {
        setUploadedFiles(prev => [...prev, ...newFiles]);
    };

    return (
        <div
            className="home-background min-h-screen w-full"
            style={{
                backgroundImage: `url(${bg})`
            }}
        >
            <Navbar />

            <div className="flex justify-between items-center px-6 py-8 gap-6 h-[calc(100vh-80px)]">
                <div className="flex-row flex flex-auto gap-2">
                    <UploadCard onFilesUploaded={handleFilesUploaded} />
                </div>
            </div>
        </div>
    );
}

export default App;
