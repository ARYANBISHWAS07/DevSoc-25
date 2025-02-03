import { LocaleRouteNormalizer } from 'next/dist/server/normalizers/locale-route-normalizer';
import React, { useEffect } from 'react';

function GridWithHover() {
    const gridItemsData = [
        { letter: 'CAUSE 1', details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde deserunt quasi incidunt blanditiis eaque voluptates minima, voluptatem molestiae ut doloremque dolorum consequuntur, consequatur atque delectus maiores error sequi nulla?' },
        { letter: 'CAUSE 2', details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde deserunt quasi incidunt blanditiis eaque voluptates minima, voluptatem molestiae ut doloremque dolorum consequuntur, consequatur atque delectus maiores error sequi nulla?' },
        { letter: 'CAUSE 3', details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde deserunt quasi incidunt blanditiis eaque voluptates minima, voluptatem molestiae ut doloremque dolorum consequuntur, consequatur atque delectus maiores error sequi nulla?' },
        { letter: 'CAUSE 4', details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde deserunt quasi incidunt blanditiis eaque voluptates minima, voluptatem molestiae ut doloremque dolorum consequuntur, consequatur atque delectus maiores error sequi nulla?' },
        { letter: 'CAUSE 5', details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde deserunt quasi incidunt blanditiis eaque voluptates minima, voluptatem molestiae ut doloremque dolorum consequuntur, consequatur atque delectus maiores error sequi nulla?' },
        { letter: 'CAUSE 6', details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti unde deserunt quasi incidunt blanditiis eaque voluptates minima, voluptatem molestiae ut doloremque dolorum consequuntur, consequatur atque delectus maiores error sequi nulla?' },
    ];

    useEffect(() => {
        const gridItems = document.querySelectorAll('.grid > div');
        const main = document.querySelector("#mainCard");

        gridItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gridItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.add('opacity-10', 'scale-1');
                        main.classList.add('shadow-none');
                        item.classList.add('shadow-xl', 'shadow-white', 'rounded-lg', 'bg-purple-500', 'opacity-100');
                    }
                });
                item.style.transform = 'scale(1.3)';
            });

            item.addEventListener('mouseleave', () => {
                gridItems.forEach(otherItem => {
                    otherItem.classList.remove('opacity-10', 'scale-1');
                    main.classList.remove('shadow-none');
                    item.classList.remove('shadow-xl', 'shadow-white', 'rounded-lg', 'bg-purple-500', 'opacity-100');
                });
                item.style.transform = 'scale(1)';
            });
        });

        return () => {
            gridItems.forEach(item => {
                item.removeEventListener('mouseenter', () => { });
                item.removeEventListener('mouseleave', () => { });
            });
        };
    }, []);

    return (
        <div className="relative grid grid-cols-3 gap-4 h-[90vh] mb-16 mt-12 shadow-md rounded-md" id="mainCard">
            {gridItemsData.map((item, index) => (
                <div
                    key={index}
                    className={`group relative transition-all duration-300 ease-in-out rounded-md overflow-hidden ${index % 2 === 0 ? '' : 'bg-sky-200' // Alternating background
                        }`}
                >
                    <div className="p-4 h-full flex items-center justify-center"> {/* Removed bg-gray-200 here */}
                        <span className="text-2xl font-mono font-medium transition-opacity duration-300 group-hover:opacity-0">
                            {item.letter}
                        </span>
                        <span className="opacity-0 absolute inset-0 flex items-center text-center font-mono font-light justify-center text-base transition-opacity duration-300 group-hover:opacity-100 gorup-hover:shadow-sm ">
                            {item.details}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default GridWithHover;