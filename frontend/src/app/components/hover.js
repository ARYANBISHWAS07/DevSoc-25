import { LocaleRouteNormalizer } from 'next/dist/server/normalizers/locale-route-normalizer';
import Image from 'next/image';
import React, { useEffect } from 'react';
import Hand from '../../../public/hand.jpg';  
import user from "../../../public/user.png" 
import first from "../../../public/first.png";
import second from "../../../public/second.png";
import third from "../../../public/third.png";
function GridWithHover() {
    const gridItemsData = [
        { img:first,letter: ' Communication Barriers', details: 'Difficulty in expressing needs, emotions, and thoughts.Limited access to effective communication tools like sign language interpreters or speech devices.Misunderstanding by others, leading to frustration.' },
        { img:second, letter: 'Social Isolation & Discrimination ', details: 'Difficulty in making friends or forming relationships due to communication challenges.Being ignored or treated unfairly in social and professional settings.Bullying or stigma attached to their condition.' },
        { img:third ,letter: 'Limited Educational & Job Opportunities ', details: 'Lack of inclusive teaching methods in schools.Fewer job opportunities due to communication difficulties.Workplaces may not provide assistive technologies like text-to-speech tools.' },
        { letter: ' Accessibility Issues', details: 'Public places, hospitals, and government offices often lack accommodations for non-verbal individuals.Emergency services (e.g., calling 911) are hard to access without text-based support.' },
        { letter: 'Emotional & Psychological Impact ', details: 'Feeling of helplessness or frustration when unable to express themselves.Increased risk of anxiety, depression, or low self-esteem.Dependence on family members for communication.' },
        { letter: 'Difficulty in Emergency Situations', details: 'Inability to quickly call for help in medical or safety emergencies.Lack of emergency services equipped to handle non-verbal communication.Risk of being misunderstood or ignored in urgent situations.' },
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
        <div className="relative grid grid-cols-3 gap-4 h-[90vh] mb-16 mt-12  shadow-lg rounded-lg " id="mainCard">
            {gridItemsData.map((item, index) => (
                <div
                    key={index}
                    className={`group relative transition-all duration-300 ease-in-out rounded-md overflow-hidden ${index % 2 === 0 ? '' : 'bg-sky-200' // Alternating background
                        }`}
                >
                    <div className="p-2 h-full flex items-center justify-center"> {/* Removed bg-gray-200 here */}
                        <span className='text-2xl font-mono font-medium transition-opacity duration-300 group-hover:opacity-0'>
                            <Image src={item.img} className='w-[90%]'/>

                        </span>
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