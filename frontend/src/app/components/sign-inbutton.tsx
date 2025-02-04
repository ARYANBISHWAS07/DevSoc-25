"use client"
import { Button } from "@/components/ui/button";
import  SignIn from "../(auth)/authactions/sign-in"


export default function SignInButton() {
    const handleSignIn = async () => {
        try {
            await SignIn();
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    }
    return (
        <Button onClick={handleSignIn} type="submit" variant="outline" className="w-full">
            Signin with Google
        </Button>
    )
}