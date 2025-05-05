import React from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Funnel, XCircle} from "lucide-react";
import {useDebounce} from "@/hooks/useDebounce";
import {Label} from "@/components/ui/label.tsx";

type TextColumnFilterProps = {
    columnId: string;
    label: string;
    value: string | undefined;
    onChange: (newValue: string) => void;
};

export const TextColumnFilter = ({
                                     label,
                                     value,
                                     onChange
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

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="text-left justify-start font-normal w-full">
                    <Funnel className="mr-2 h-4 w-4" />
                    <Label>{label}</Label>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 space-y-2">
                <Input
                    placeholder={`${label}...`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
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
            </PopoverContent>
        </Popover>
    );
};