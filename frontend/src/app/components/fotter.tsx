import { footer } from "motion/react-client";
import { Instagram } from 'lucide-react';
import { Aperture } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Atom } from 'lucide-react';
import { Ear } from 'lucide-react';

function Footer() {
    return (
        <footer className="bottom-0 bg-slate-800 border-t-2 border-white py-20 
                dark:bg-slate-900 dark:border-gray-700 transition-all duration-300">
            <div className=" mx-8 ">
                <div className=" flex justify-around pb-4 border-b border-b-purple-500">
                    <div className="text-4xl font-mono font-bold text-purple-800"><span><Ear className="inline-block size-8"/></span>ECHOSIGN</div>
                    <div className="invisible">
                        hello
                    </div>
                    <div className="flex justify-between">
                        <div className="invisible">
                            hello
                        </div>
                        <ul className="font-mono leading-8 text-lg">
                            <li className="pb-4 text-xl font-semibold text-purple-800 opacity-50"><span className="pr-1"><Linkedin className="inline-block pb-1" /></span>LINKEDIN</li>
                            <li className="text-purple-500">Vansh Dhir</li>
                            <li className="text-purple-500">Aryan Bishwas</li>
                            <li className="text-purple-500" >Dibyendu De</li>
                            <li className="text-purple-500">Varsheit Kumar Reddy</li>
                            <li className="text-purple-500">Aditya Mishra</li>
                        </ul>
                        <div className="invisible">
                            hello
                        </div>
                        <ul className="font-mono leading-8 text-lg">
                            <li className="pb-4 text-xl font-semibold text-purple-800 opacity-50">SOCIALS</li>
                            <li className="text-purple-500">DaddyVD</li>
                            <li className="text-purple-500">BAKWAS</li>
                            <li className="text-purple-500">KALA JADU</li>
                            <li className="text-purple-500">GUNDA</li>
                            <li className="text-purple-500">GJASUNDAY</li>
                        </ul>
                        <div className="invisible">
                            hello
                        </div>
                    </div>

                </div>
                <div className="px-8 pt-6 flex justify-between">
                    <div className=" text-xl text-purple-600 font-sans">
                        LETS CONNECT TO DEEPER LEVELS
                    </div>
                    <div className="invisible">

                    </div>
                    <div className="flex gap-8 pr-2">
                        <Instagram color="#8E24AA" />
                        <Aperture color="#8E24AA" />
                        <Youtube color="#8E24AA" />
                        <Atom color="#8E24AA" />
                    </div>
                    <div className=" text-xl text-purple-600 font-sans">
                        WE SHALL SUE IF USED WITHOUT PERMISSION COPYRIGHT!!
                    </div>
                </div>


            </div>

        </footer>
    )
}
export default Footer;