"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle,CardDescription, CardHeader, CardContent } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { startTransition, useState, useTransition } from "react";
import { start } from "repl";
import { toast } from "sonner";
import { email } from "zod";

export default function VerifyRequestPage(){
    const [otp, setOtp] = useState("");
    const [emailpending, setEmailPending] = useTransition();
    const params = useSearchParams()
    const email = params.get("email") || "";
    const router = useRouter();
    const isOtpCompleted = otp.length === 6;
    function VerifyOtp(){
        startTransition(async ()=>{
            await authClient.signIn.emailOtp({
                email: email,
                otp: otp,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Successfully verified, You will be redirected...");
                        router.push('/');
                    },
                    onError: (error) => {
                        toast.error("Invalid OTP, Please try again");
                    },
                },

            })
        })
    }
    return (
        <Card className="w-full mx-auto ">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Please check your email</CardTitle>
                <CardDescription>
                    We have sent you a verification link. Please check your inbox.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col items-center space-y-2">
                    <InputOTP maxLength={6} className="gap-2" value={otp} onChange={(value)=>setOtp(value)}>
                    <InputOTPGroup>
                    <InputOTPSlot index={0}></InputOTPSlot>
                    <InputOTPSlot index={1}></InputOTPSlot>
                    <InputOTPSlot index={2}></InputOTPSlot>
                    </InputOTPGroup>
                     <InputOTPGroup>
                    <InputOTPSlot index={3}></InputOTPSlot>
                    <InputOTPSlot index={4}></InputOTPSlot>
                    <InputOTPSlot index={5}></InputOTPSlot>
                    </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email</p>
                </div>
                <Button onClick={VerifyOtp} disabled={emailpending || !isOtpCompleted} className="w-full">
                    { emailpending ?
                    ( <>
                    <Loader2 className="size-4 animate-spin"/>
                    <span>Verifying...</span>

                    </>) : "Verify Account" }
                </Button>
            </CardContent>
        </Card>
    )
}