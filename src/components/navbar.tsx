import { Button } from "@/components/ui/button.tsx";
import { Menubar } from "@radix-ui/react-menubar";
import {
    MenubarContent,
    MenubarGroup,
    MenubarItem, MenubarLabel,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger
} from "./ui/menubar";
import { useState } from "react";
import LoginDrawer from "@/components/loginDrawer.tsx";
import { ThemeToggle } from "@/components/themeToggle.tsx";
import {useAuth} from "@/context/authContext.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {EllipsisVertical} from "lucide-react";

type Props = {
    setOpenDialog: (open: boolean) => void;
}

const Navbar: React.FC<Props> = ({setOpenDialog}) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);

    return (
        <nav>
            <div className="navbar-container">
                {user ? (
                    <Menubar>
                        <MenubarMenu>
                            <MenubarTrigger className="bg-accent text-accent-foreground cursor-pointer gap-2">
                                {user.fullName}
                                {
                                    <EllipsisVertical size={14}/>
                                }
                            </MenubarTrigger>
                            <MenubarContent align="end">
                                {
                                    user?.role === "Admin" && (
                                        <>
                                            <MenubarLabel>Admin</MenubarLabel>
                                            <MenubarSeparator />
                                            <MenubarGroup>
                                                <MenubarItem
                                                    onClick={() => {
                                                        navigate("/admin/users");
                                                    }}
                                                    className={location.pathname == "/admin/users" ? "bg-primary/10 focus:bg-primary/30 text-primary" : ""}
                                                >
                                                    Kullanıcılar
                                                </MenubarItem>
                                                <MenubarItem
                                                    onClick={() => {
                                                        navigate("/admin/files");
                                                    }}
                                                    className={location.pathname == "/admin/files" ? "bg-primary/10 focus:bg-primary/30 text-primary" : ""}
                                                >
                                                    Dosyalar
                                                </MenubarItem>
                                            </MenubarGroup>
                                            <MenubarSeparator/>
                                            <MenubarItem
                                                onClick={() => {
                                                    navigate("/");
                                                }}
                                            >
                                                Ana Sayfa
                                            </MenubarItem>
                                            <MenubarItem
                                                onClick={() => {
                                                    setOpenDialog(true);
                                                }}
                                            >
                                                Ayarlar
                                            </MenubarItem>
                                        </>
                                    )
                                }
                                <MenubarItem
                                    className="text-red-400 focus:bg-red-400 focus:text-white cursor-pointer transition duration-150 "
                                    onClick={logout}
                                >
                                    Çıkış Yap
                                </MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                ) : (
                    <>
                        <Button className="mr-2" onClick={() => setLoginDrawerOpen(true)}>
                            Giriş Yap
                        </Button>

                        <LoginDrawer open={loginDrawerOpen} setOpen={setLoginDrawerOpen}/>
                    </>
                )}
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;