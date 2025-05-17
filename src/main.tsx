import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import "./styles/styles.css"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeProvider} from "@/context/themeProvider.tsx";
import {AuthProvider} from "@/context/authContext.tsx";
import {BrowserRouter} from 'react-router-dom';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    // TODO: EĞER QR OLUŞTURURKEN İLKİNDE ÇALIŞMIYOSA STRİCT MODE KALDIR
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <AuthProvider>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
)
