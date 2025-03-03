'use client';  // This must be the very first line, even before imports

import OneLogo from "@/app/components/logo2";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { House, LayoutDashboard,LogIn,SquareUserRound } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            setScrolled(scrollTop > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 transition-colors duration-300 ease-in-out ${scrolled
                ? 'bg-slate-900 text-white opacity-80'
                : 'bg-transparent text-white'
                }`}
        >
            <div>
                <OneLogo />
            </div>
            <div className="flex justify-between ml-72">
                <ul className="flex flex-row gap-6 text-lg font-semibold">
                    {[
                        { icon: <House className="w-5 h-5" />, name: "Home", path: "/" },
                        { icon: <LayoutDashboard className="w-5 h-5 " />, name: "Dashboard", path: "/main" },
                    ].map(({ name, path, icon }) => (
                        <li key={name}>
                            <Link
                                href={path}
                                className="flex items-center gap-2 px-5 py-2 rounded-lg border border-transparent transition-all duration-300 ease-in-out bg-white/10 hover:bg-white/20 hover:shadow-lg hover:shadow-white hover:border-white/50"
                            >
                                {icon}
                                <span>{name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                
            </div>
            <div className="flex ">
            <div className="w-[100px] invisible">
                <h1>hello</h1>
                </div>
                <ul className="flex flex-row gap-6 text-lg font-semibold">
                    {[
                        {icon:<LogIn className="w-5 h-5"/>,name:"Login",path:"/auth/login"},
                        {icon:<SquareUserRound className="w-5 h-5"/>,name:"SignUp",path:"/auth/signup"},
                    ].map(({ name, path, icon }) => (
                        <li key={name}>
                            <Link
                                href={path}
                                className="flex items-center gap-2 px-5 py-2 rounded-lg border border-transparent transition-all duration-300 ease-in-out bg-white/10 hover:bg-white/20 hover:shadow-lg hover:shadow-white hover:border-white/50"
                            >
                                {icon}
                                <span>{name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;