import OneLogo from "@/contents-ui/logo2";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-10 bg-transparent">
            <div>
                <OneLogo />
            </div>
            <div className="flex-1 flex justify-center">
                <ul className="flex flex-row gap-6 text-lg font-semibold">
                    {[
                        { name: "Home", path: "/" },
                        { name: "Profile", path: "/" },
                        { name: "Minutes of Meeting", path: "/" },
                    ].map(({ name, path }) => (
                        <li key={name}>
                            <Link
                                href={path}
                                className="cursor-pointer text-white px-5 py-2 rounded-lg border border-transparent transition-all duration-300 ease-in-out
                                bg-white/10 hover:bg-white/20 hover:shadow-lg hover:shadow-white hover:border-white/50"
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
