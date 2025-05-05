import {DateRange} from "react-day-picker";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Funnel} from "lucide-react";
import {Label} from "@/components/ui/label.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import React from "react";

type MonthPickerProps = {
    onCallback: (dateRange: DateRange) => void;
    sortDirection?: "asc" | "desc" | false;
    onSortChange?: (direction: "asc" | "desc" | false) => void;
};

export function MonthYearRangePicker({ onCallback, sortDirection = false, onSortChange }: MonthPickerProps) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<DateRange | undefined>(undefined);

    const handleSortToggle = () => {
        if (!onSortChange) return;
        const next = sortDirection === "asc" ? "desc" : sortDirection === "desc" ? false : "asc";
        onSortChange(next);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="text-left justify-start font-normal w-full">
                    <Funnel className="mr-2 h-4 w-4" />
                    <Label>Yüklenme Tarihi</Label>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={1}
                />
                <div className="w-full flex flex-col gap-2 px-4 py-2">
                    {onSortChange && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={handleSortToggle}
                        >
                            {sortDirection === "asc"
                                ? "En eski → En yeni"
                                : sortDirection === "desc"
                                    ? "En yeni → En eski"
                                    : "Sırala"}
                        </Button>
                    )}
                    <div className="flex justify-between gap-2">
                        <Button
                            id="cancel"
                            variant="outline"
                            onClick={() => {
                                setDate(undefined);
                                setOpen(false);
                                onCallback({ from: undefined, to: undefined });
                            }}
                        >
                            İptal
                        </Button>
                        <Button
                            id="confirm"
                            variant="success"
                            disabled={!date?.from || !date?.to}
                            onClick={() => {
                                if (date) {
                                    onCallback(date);
                                    setOpen(false);
                                }
                            }}
                        >
                            Onayla
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}