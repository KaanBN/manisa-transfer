import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import {useTheme} from "@/context/themeProvider.tsx";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <Button
            className={"h-9 w-9 p-0 transition-all bg-background hover:bg-background text-foreground"}
            size="icon"
            onClick={() => {
                if (theme === "dark") {
                    setTheme("light")
                } else if (theme === "light") {
                    setTheme("dark")
                }
            }}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
