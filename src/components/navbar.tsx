import { Button } from "@/components/ui/button.tsx";
import { Menubar } from "@radix-ui/react-menubar";
import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
} from "./ui/menubar";
import { useState } from "react";
import LoginDrawer from "@/components/loginDrawer.tsx";
import { ThemeToggle } from "@/components/themeToggle.tsx";
import {useAuth} from "@/context/authContext.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {EllipsisVertical} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";

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
                            <MenubarTrigger className="bg-accent text-accent-foreground cursor-pointer">
                                {user.fullName}
                            </MenubarTrigger>
                            <MenubarContent align="end">
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
                {
                    user?.role === "Admin" && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline"><EllipsisVertical/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Admin</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            navigate("/admin/users");
                                        }}
                                        className={location.pathname == "/admin/users" ? "bg-primary/10 focus:bg-primary/30 text-primary" : ""}
                                    >
                                        Kullanıcılar
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {
                                            navigate("/admin/files");
                                        }}
                                        className={location.pathname == "/admin/files" ? "bg-primary/10 focus:bg-primary/30 text-primary" : ""}
                                    >
                                        Dosyalar
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem
                                    onClick={() => {
                                        navigate("/");
                                    }}
                                >
                                    Ana Sayfa
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setOpenDialog(true);
                                    }}
                                >
                                    Ayarlar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;