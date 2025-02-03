import OneLogo from "@/components/logo2";
import Link from "next/link";
import { House,User ,Calendar} from 'lucide-react';



export default function Navbar() {
    return (
        <nav className="flex items-center justify-between bg-transparent">
            <div>
                <OneLogo />
            </div>
            <div className="flex justify-center">
                <ul className="flex flex-row gap-6 text-lg font-semibold mr-20">
                    {[
                        {icon:<House/>, name: "Home", path: "/" },
                        {icon:<User/>, name: "Profile", path: "/" },
                        {icon:<Calendar/>, name: "Minutes of Meeting", path: "/" },
                    ].map(({ name, path,icon }) => (
                        <li key={name}>
                            <Link
                                href={path}
                                className="cursor-pointer flex flex-row text-white px-5 py-2 rounded-lg border border-transparent transition-all duration-300 ease-in-out
                                bg-white/10 hover:bg-white/20 gap-2 hover:shadow-lg hover:shadow-white hover:border-white/50"
                            >
                                {icon}
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
                
            </div>
            <div className="invisible">
                    <h1>hello</h1>
            </div>
        </nav>
    );
}
