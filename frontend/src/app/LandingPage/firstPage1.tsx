import { body, nav } from 'motion/react-client';
import React from 'react';

function FirstPage1() {
    return (
        <> 
        <nav className=''>
            <div className='bg-[rgb(32,90,252)]  mx-44 flex justify-between p-4 border-b-2 text-white border-opacity-65'>
                <div className='font-sans font-medium'>ECHOMONO</div>
                <div className='w-1/4 font-sans font-medium flex justify-between'>
                    <div>PROFILE</div>
                    <div>MINUTES</div>
                    <div>LOGIN</div>
                </div>
            </div>
        </nav>
        <div className='bg-[rgb(32,90,252)] h-screen flex items-center justify-center'>
            <section className=" py-14"> {/* Example Tailwind classes */}
                <div className="container mx-auto text-center">
                   <div className='mb-10'>
                   <h1 className="font-light font-sans text-5xl  text-white mb-4 ">
                        CAN YOU
                    </h1>
                    <h1 className="font-extralight font-sans text-5xl  text-white mb-4 ">
                        HEAR ME NOW?
                    </h1>
                   </div>
                    <div className='text-center flex justify-center'>
                    <p className=" font-mono text-xs font-extralight text-center w-1/3 text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde deserunt quasi incidunt blanditiis eaque voluptates minima, voluptatem molestiae ut doloremque dolorum consequuntur, consequatur atque delectus maiores error sequi nulla? {/* Your description */}
                    </p>
                    </div>
                   
                </div>
            </section>
        </div>
        </>

    );
};

export default FirstPage1;