import React, {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Check, Pencil, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useAdminFetchSettings} from "@/hooks/admin/useAdminFetchSettings.ts";
import {useAdminUpdateSetting} from "@/hooks/admin/useAdminUpdateSetting.ts";
import {useAdminCreateSetting} from "@/hooks/admin/useAdminCreateSetting.ts";

const SettingsDialog: React.FC<{ open: boolean; onClose: () => void }> = ({open, onClose}) => {
    const {data: settings, isLoading} = useAdminFetchSettings();
    const updateMutation = useAdminUpdateSetting();
    const createMutation = useAdminCreateSetting();

    const [editingId, setEditingId] = useState<number | null>(null);
    const [tempSettings, setTempSettings] = useState<Record<string, { key: string; value: string }>>({});
    const [newSetting, setNewSetting] = useState<{ key: string; value: string } | null>(null);

    const handleEdit = (id: number, key: string, value: string) => {
        setEditingId(id);
        setTempSettings(prev => ({...prev, [id]: {key, value}}));
    };

    const handleUpdate = (id: number) => {
        const updated = tempSettings[id];
        updateMutation.mutate({id: id, key: updated.key, value: updated.value});
        setEditingId(null);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleNewSettingAdd = () => {
        if (!newSetting?.key.trim() || !newSetting?.value.trim()) return;
        createMutation.mutate(newSetting);
        setNewSetting(null);
    };

    const handleNewSettingCancel = () => {
        setNewSetting(null);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Ayarlar</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {newSetting && (
                        <div className="flex items-center gap-2">
                            <Input
                                placeholder="Key"
                                value={newSetting.key}
                                onChange={e => setNewSetting({...newSetting, key: e.target.value})}
                            />
                            <Input
                                placeholder="Value"
                                value={newSetting.value}
                                onChange={e => setNewSetting({...newSetting, value: e.target.value})}
                            />
                            <Button size="icon" onClick={handleNewSettingAdd}><Check size={16}/></Button>
                            <Button size="icon" onClick={handleNewSettingCancel}><X size={16}/></Button>
                        </div>
                    )}

                    {!isLoading && settings?.data.map(setting => (
                        <div key={setting.id} className="flex items-center gap-2">
                            {editingId === setting.id ? (
                                <>
                                    <span className="flex-1">{setting.key}</span>


                                    <Input
                                        value={tempSettings[setting.id]?.value || ""}
                                        onChange={e => setTempSettings(prev => ({
                                            ...prev,
                                            [setting.id]: {...prev[setting.id], value: e.target.value}
                                        }))}
                                    />
                                    <Button size="icon" onClick={() => handleUpdate(setting.id)}><Check
                                        size={16}/></Button>
                                    <Button size="icon" onClick={handleCancelEdit}><X size={16}/></Button>
                                </>
                            ) : (
                                <>
                                    <span className="flex-1">{setting.key}</span>
                                    <span className="flex-1">{setting.value}</span>
                                    <Button size="icon"
                                            onClick={() => handleEdit(setting.id, setting.key, setting.value)}><Pencil
                                        size={16}/></Button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SettingsDialog;