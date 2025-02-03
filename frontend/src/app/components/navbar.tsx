import OneLogo from "@/components/logo2";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8  py-1 bg-[#205afc] shadow-lg">
            <div>
                <OneLogo />
            </div>
            <ul className="flex flex-row gap-8 text-lg font-semibold">
                <li className="cursor-pointer text-white transition duration-300 ease-in-out hover:text-white/80 hover:backdrop-brightness-110 px-3 py-2 rounded-lg">
                    Home
                </li>
                <li className="cursor-pointer text-white transition duration-300 ease-in-out hover:text-white/80 hover:backdrop-brightness-110 px-3 py-2 rounded-lg">
                    Profile
                </li>
                <li className="cursor-pointer text-white transition duration-300 ease-in-out hover:text-white/80 hover:backdrop-brightness-110 px-3 py-2 rounded-lg">
                    Minutes of Meeting
                </li>
            </ul>
        </nav>
    );
}
