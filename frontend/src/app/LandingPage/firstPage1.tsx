import { body, nav } from 'motion/react-client';
import React from 'react';
import Navbar from '../components/navbar';

function FirstPage1() {
    return (
        <>
             <div className="flex flex-col items-center justify-center h-[1000px] w-full  bg-green-100 p-10 ">
                <h1 className="text-4xl font-bold">Page 1</h1>
                <p className="mt-4 text-lg">This is the second page content.</p>
            </div>
        </>

    );
};

export default FirstPage1;