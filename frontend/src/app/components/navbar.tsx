import OneLogo from "@/components/logo2";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-1 bg-[#205afc] shadow-lg">
            <div>
                <OneLogo />
            </div>
            <ul className="flex flex-row gap-8 text-lg font-semibold">
                {[
                    { name: "Home", path: "/" },
                    { name: "Profile", path: "/" },
                    { name: "Minutes of Meeting", path: "/" },
                ].map(({ name, path }) => (
                    <li key={name}>
                        <Link
                            href={path}
                            className="cursor-pointer text-white transition-all duration-300 ease-in-out hover:text-white/90 hover:opacity-80 px-3 py-2 rounded-lg"
                        >
                            {name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
