import { footer } from "motion/react-client";
import { Instagram } from 'lucide-react';
import { Aperture } from 'lucide-react';
import { Youtube } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Atom } from 'lucide-react';
import { Ear } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Copyright } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-slate-900 border-t-2 border-white py-20 ">
            <div className=" mx-8 ">
                <div className=" flex justify-around pb-6 border-b border-b-purple-500">
                    <div className="text-4xl font-mono font-bold text-purple-800"><span><Ear className="inline-block size-8"/></span>ECHOSIGN</div>
                    <div className="invisible">
                        hello
                    </div>
                    <div className="flex justify-between">
                        <div className="invisible">
                            hello
                        </div>
                        <ul className="font-mono leading-8 text-lg">
                            <li className="pb-4 text-xl font-semibold text-purple-800 opacity-90"><span className="pr-1"><Linkedin className="inline-block pb-1" /></span>LINKEDIN</li>
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
                            <li className="pb-4 text-xl font-semibold text-purple-800 opacity-90"><span className="pr-1"><Instagram className="inline-block pb-1" /></span>SOCIALS</li>
                            <li className="text-purple-500">vansh_277</li>
                            <li className="text-purple-500">aryanbishwas</li>
                            <li className="text-purple-500">somewhere.who.knows</li>
                            <li className="text-purple-500">varshit.kumar</li>
                            <li className="text-purple-500">aditya_fatneek</li>
                        </ul>
                        <div className="invisible">
                            hello
                        </div>
                    </div>

                </div>
                <div className="px-8 pt-6 flex justify-between">
                    <div className=" text-l text-purple-600 font-sans">
                        LETS CONNECT TO DEEPER LEVELS
                    </div>
                    <div className="invisible">

                    </div>
                    <div className="flex gap-8 pr-44">
                        <Facebook color="#8E24AA" />
                        <Aperture color="#8E24AA" />
                        <Youtube color="#8E24AA" />
                        <Atom color="#8E24AA" />
                    </div>
                    <div className=" text-l text-purple-600 font-sans mr-1">
                    <span className="pr-1"><Copyright className="inline-block pb-1" /></span>2025 ECHOSIGN UI.All rights reserved.
                    </div>
                </div>


            </div>

        </footer>
    )
}
export default Footer;