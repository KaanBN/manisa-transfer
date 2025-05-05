import React, {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Check, Pencil, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAdminFetchSettings} from "@/hooks/admin/useAdminFetchSettings.ts";
import {useAdminUpdateSetting} from "@/hooks/admin/useAdminUpdateSetting.ts";

const SettingsDialog: React.FC<{ open: boolean; onClose: () => void }> = ({open, onClose}) => {
    const {data: settings, isLoading} = useAdminFetchSettings();
    const updateMutation = useAdminUpdateSetting();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [tempSettings, setTempSettings] = useState<Record<string, { key: string; value: string }>>({});

    const handleEdit = (id: number, value: string) => {
        setEditingId(id);
        setTempSettings(prev => ({...prev, [id]: {value}}));
    };

    const handleUpdate = (id: number) => {
        const updated = tempSettings[id];
        updateMutation.mutate({id: id, key: updated.key, value: updated.value});
        setEditingId(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Ayarlar</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {!isLoading && settings?.data.map(setting => {
                        const isEditing = editingId === setting.id;
                        const isNumber = setting.type === "Number" || setting.type === "number";

                        return (
                            <div key={setting.id} className="flex flex-col gap-1 border p-3 rounded-md">
                                <span className="font-medium">{setting.displayName}</span>

                                {isEditing ? (
                                    <>
                                        <Input
                                            type={isNumber ? "number" : "text"}
                                            step={isNumber ? "1" : undefined}
                                            inputMode={isNumber ? "numeric" : undefined}
                                            pattern={isNumber ? "\\d*" : undefined}
                                            value={tempSettings[setting.id]?.value || ""}
                                            onChange={e => {
                                                const newValue = e.target.value;
                                                if (isNumber && !/^\d*$/.test(newValue)) return; // sadece rakam (tam sayı) kabul et
                                                setTempSettings(prev => ({
                                                    ...prev,
                                                    [setting.id]: {
                                                        ...prev[setting.id],
                                                        value: newValue
                                                    }
                                                }));
                                            }}
                                        />
                                        <div className="flex gap-2 mt-2">
                                            <Button size="icon" onClick={() => handleUpdate(setting.id)}>
                                                <Check size={16} />
                                            </Button>
                                            <Button size="icon" onClick={handleCancelEdit}>
                                                <X size={16} />
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-sm text-muted-foreground break-all">{setting.value}</span>
                                        <div className="flex gap-2 mt-2">
                                            <Button size="icon" onClick={() => handleEdit(setting.id, setting.value)}>
                                                <Pencil size={16} />
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;