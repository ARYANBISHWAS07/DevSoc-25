"use client"
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
        <button onClick={handleSignIn} type="submit" className=" p-5 w-[12vw] border-4 border-[#9B52E0] rounded-full font-bold">
            Signin with Google
        </button>
    )
}