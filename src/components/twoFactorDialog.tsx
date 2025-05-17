import React, { useEffect, useState } from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import { useInitiateTwoFa } from "@/hooks/useInitiateTwoFa.ts";
import { useVerifyTwoFa } from "@/hooks/useVerifyTwoFa.ts";
import Spinner from "@/components/spinner.tsx";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp.tsx";

type TwoFactorDialogProps = {
    open: boolean;
    onSuccess: (token: string) => void;
    onCancel?: () => void;
}

const TwoFactorDialog: React.FC<TwoFactorDialogProps> = ({ open, onSuccess, onCancel }) => {
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [code, setCode] = useState<string>("");
    const [secretCode, setSecretCode] = useState<string | null>(null);

    const {
        mutate: initiateMutate,
        isPending: initiateIsLoading,
        // isError: initiateIsError,
    } = useInitiateTwoFa();

    const {
        mutate: verifyMutate,
        isPending: verifyIsLoading,
        // isError: verifyIsError,
    } = useVerifyTwoFa();

    useEffect(() => {
        if (open) {
            setQrCode(null);
            setSecretCode(null);
            initiateMutate(undefined, {
                onSuccess: (data) => {
                    setQrCode(data.data?.qrCodeBase64 ?? null);
                    setSecretCode(data.data?.secret ?? null);
                },
                onError: () => toast.error("QR kod alınamadı."),
            });
        }
    }, [open]);

    const handleVerify = () => {
        verifyMutate(
            { code },
            {
                onSuccess: (data) => {
                    onSuccess(data.data.token);
                    toast.success("2FA doğrulandı.");
                    setCode("");
                },
                onError: (error) => {
                    // @ts-ignore
                    toast.error(error.response?.data?.message || "Kod doğrulanırken hata.");
                },
            }
        );
    };

    return (
        <Dialog open={open}>
            <DialogContent
                className="max-h-[90vh] overflow-y-auto"
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>İki-Adımlı Doğrulama</DialogTitle>
                    <DialogDescription>
                        {qrCode ? (
                            <>
                                Authenticator uygulamanızı kullanarak Qr kodu okutun. <br />
                                Ya da Authenticator uygulamanıza şu kodu girin: {secretCode} <br />
                                Ardından oluşan kodu buraya girin
                            </>
                        ) : (
                            "Authenticator uygulamanızda oluşan kodu girin"
                        )}
                    </DialogDescription>

                </DialogHeader>

                <div className="grid gap-4 py-4">
                    {(initiateIsLoading || verifyIsLoading) && <Spinner />}

                    {qrCode && (
                        <img
                            src={`data:image/png;base64,${qrCode}`}
                            alt="QR Code"
                            className="mx-auto max-w-[200px]"
                        />
                    )}

                    <div className="flex justify-center">
                        <InputOTP maxLength={6} value={code} onChange={setCode}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>


                    <div className="flex flex-col">
                        <Button
                            onClick={handleVerify}
                            disabled={verifyIsLoading || code.length !== 6}
                            className="mt-2"
                        >
                            Doğrula
                        </Button>

                        <Button
                            onClick={onCancel}
                            disabled={verifyIsLoading}
                            variant="destructive"
                            className="mt-2"
                        >
                            İptal Et
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TwoFactorDialog;