import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Funnel, XCircle, ArrowUp, ArrowDown} from "lucide-react";
import {useDebounce} from "@/hooks/useDebounce";
import {Label} from "@/components/ui/label";

type TextColumnFilterProps = {
    columnId: string;
    label: string;
    value: string | undefined;
    onChange: (newValue: string) => void;
    sortDirection?: "asc" | "desc" | false;
    onSortChange?: (direction: "asc" | "desc" | false) => void;
};

export const TextColumnFilter = ({
                                     label,
                                     value,
                                     onChange,
                                     sortDirection = false,
                                     onSortChange,
                                 }: TextColumnFilterProps) => {
    const [inputValue, setInputValue] = React.useState(value ?? "");
    const debouncedValue = useDebounce(inputValue, 500);

    React.useEffect(() => {
        onChange(debouncedValue);
    }, [debouncedValue]);

    React.useEffect(() => {
        setInputValue(value ?? "");
    }, [value]);

    const handleReset = () => {
        setInputValue("");
        onChange("");
    };

    const handleSortToggle = () => {
        if (!onSortChange) return;
        const next = sortDirection === "asc" ? "desc" : sortDirection === "desc" ? false : "asc";
        onSortChange(next);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-left justify-between font-normal w-full flex items-center"
                >
                    <div className="flex items-center gap-2">
                        <Funnel className="h-4 w-4" />
                        <Label>{label}</Label>
                    </div>
                    {sortDirection === "asc" && <ArrowUp className="h-4 w-4 ml-2" />}
                    {sortDirection === "desc" && <ArrowDown className="h-4 w-4 ml-2" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 space-y-2">
                <Input
                    placeholder={`${label}...`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="flex flex-col gap-2">
                    {onSortChange && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={handleSortToggle}
                        >
                            {sortDirection === "asc"
                                ? "A → Z"
                                : sortDirection === "desc"
                                    ? "Z → A"
                                    : "Sırala"}
                        </Button>
                    )}
                    {inputValue && (
                        <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleReset}
                            className="w-full"
                        >
                            <XCircle className="mr-2 h-4 w-4" />
                            Temizle
                        </Button>
                    )}
                </div>
            </PopoverContent>

        </Popover>
    );
};