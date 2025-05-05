import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Funnel } from "lucide-react";
import { Calendar } from "@/components/ui/calendar.tsx";
import { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/label.tsx";

type MonthPickerProps = {
    onCallback: (dateRange: DateRange) => void;
};

export function MonthYearRangePicker({ onCallback }: MonthPickerProps) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<DateRange | undefined>(undefined);

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
                <div className="w-full flex justify-between px-4 py-2">
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
            </PopoverContent>
        </Popover>
    );
}