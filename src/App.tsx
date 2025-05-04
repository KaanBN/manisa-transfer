import {JSX, useState} from 'react';
import bg from './assets/images/background.png';
import bgDark from './assets/images/background-dark.png';
import Navbar from "@/components/navbar";
import {Toaster} from "@/components/ui/sonner.tsx";
import {useTheme} from "@/context/themeProvider.tsx";
import {Navigate, Route, Routes} from "react-router-dom";
import HomePage from "@/routes/homePage.tsx";
import ProtectedRoute from "@/routes/protectedRoute.tsx";
import UserListPage from "@/routes/userListPage.tsx";
import FileListPage from "@/routes/fileListPage.tsx";
import SettingsDialog from "@/components/admin/settingsDialog.tsx";


function App(): JSX.Element {
    const {theme} = useTheme()

    const [settingDialogOpen, setSettingDialogOpen] = useState(false);

    const handleClose = () => {
        setSettingDialogOpen(false);
    }

    return (
        <div
            className="flex flex-col min-h-screen bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url(${theme === 'dark' ? bgDark : bg})`,
            }}
        >
            <Toaster richColors={true} theme={theme}/>
            <Navbar setOpenDialog={setSettingDialogOpen}/>
            <SettingsDialog open={settingDialogOpen} onClose={handleClose}/>

            <Routes>
                <Route path="/" element={<HomePage/>}/>

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute requiredRole="Admin">
                            <UserListPage/>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/files"
                    element={
                        <ProtectedRoute requiredRole="Admin">
                            <FileListPage/>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>

            <footer className="text-center text-xs text-white py-4">
                © {new Date().getFullYear()} Spiltech. Tüm hakları saklıdır.
            </footer>
        </div>
    );
}


export default App;
