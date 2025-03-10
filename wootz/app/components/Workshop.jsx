'use client';

import React from 'react';
import "../styles/events.css";
import { Button } from '@/components/ui/button';
import TiltedCard from '@/components/Components/TiltedCard/TiltedCard';
import { useRouter } from "next/navigation";


function Workshop() {

    const router = useRouter();

    
    return (
        <div className='events-main' id = 'workshops'>
            <h1 className='lg:mt-20 pt-4 md:pt-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-300 dark:from-neutral-400 dark:to-gray-200 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight'>
                Workshop & Paper Presentation
            </h1>

            <div className="events">

             
                <div className="event-card-container" data-aos="fade-up">

                    <TiltedCard
                        imageSrc="/assets/workshop1.jpg"
                        altText="Wootz Quest Event"
                        captionText=""
                        containerHeight="380px"
                        containerWidth="300px"
                        imageHeight="300px" 
                        imageWidth="300px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                            <div className="event-card-overlay">
                                <h2 className="event-title">WorkShop</h2>
                                <div className="event-details">
                                    <p>A hands-on session and demonstrations on advanced metallurgy techniques.</p>
                                    <button className="event-details-button" onClick={() => window.location.href = "/portal?event=Wootz+Quest"}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        }
                    />
                </div>

             
                <div className="event-card-container" data-aos="fade-up" data-aos-delay="300">
                    <TiltedCard
                        imageSrc="/assets/pp2.jpg"
                        altText="MindSpark Arena Event"
                        captionText=""
                        containerHeight="380px"
                        containerWidth="300px"
                        imageHeight="300px"
                        imageWidth="300px"
                        rotateAmplitude={12}
                        scaleOnHover={1.2}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                            <div className="event-card-overlay">
                                <h2 className="event-title">Paper Presentation</h2>
                                <div className="event-details">
                                    <p>A platform to showcase research and innovations in metallurgy.</p>
                                    <button className="event-details-button" onClick={() => window.location.href = "/portal?event=Paper+Presentation+1"}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        }
                    />
                </div>

            </div>
        </div>
    );
}

export default Workshop;