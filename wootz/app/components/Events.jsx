'use client';

import React from 'react';
import "../styles/events.css";
import { Button } from '@/components/ui/button';
import TiltedCard from '@/components/Components/TiltedCard/TiltedCard';
import { useRouter } from "next/navigation";


function Events() {

    const router = useRouter();


    return (
        <div className='events-main' id='events'>
            <h1 className='lg:mt-20 lg:pt-14 pt-4 md:pt-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-300 dark:from-neutral-400 dark:to-gray-200 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight'>
                Exciting Events
            </h1>


            <div className="events">


                <div className="event-card-container" data-aos="fade-up">

                    <TiltedCard
                        imageSrc="/assets/quiz1.jpg"
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
                                <h2 className="event-title">WOOTZ QUEST</h2>
                                <div className="event-details">
                                    <p>A thrilling team challenge in metallurgy and problem-solving!</p>
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
                        imageSrc="/assets/mind1.png"
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
                                <h2 className="event-title">MINDSPARK ARENA</h2>
                                <div className="event-details">
                                    <p>A battle of wit, strategy, and engineering mastery!</p>
                                    <button className="event-details-button" onClick={() => window.location.href = "/portal?event=MindSpark+Arena"}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        }
                    />
                </div>

                <div className="event-card-container" data-aos="fade-up" data-aos-delay="600">
                    <TiltedCard
                        imageSrc="/assets/event3.jpg"
                        altText="Wootz Maestro Event"
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
                                <h2 className="event-title">WOOTZ MAESTRO</h2>
                                <div className="event-details">
                                    <p>The ultimate metallurgical quiz challenge!</p>
                                    <button className="event-details-button" onClick={() => window.location.href = "/portal?event=Wootz+Maestro"}>
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

export default Events;
