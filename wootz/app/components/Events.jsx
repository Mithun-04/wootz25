import React from 'react';
import "../styles/events.css";
import { Button } from '@/components/ui/button';
import TiltedCard from '@/components/Components/TiltedCard/TiltedCard';

function Events() {
    return (
        <div className='events-main'>
            <h1 className='bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-300 dark:from-neutral-400 dark:to-gray-200 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight'>
                Exciting Events
            </h1>

            <div className="events">
                
                {/* WOOTZ QUEST */}
                <div className="event-card-container"  data-aos = "fade-up">
                    <TiltedCard
                        imageSrc="/assets/quiz.jpg"
                        altText="Wootz Quest Event"
                        captionText=""
                        containerHeight="350px"
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
                                    <Button>Register</Button>
                                </div>
                            </div>
                        }
                    />
                </div>

                {/* MINDSPARK ARENA */}
                <div className="event-card-container" data-aos = "fade-up" data-aos-delay = "300">
                    <TiltedCard
                        imageSrc="/assets/mind.jpg"
                        altText="MindSpark Arena Event"
                        captionText=""
                        containerHeight="350px"
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
                                    <Button>Register</Button>
                                </div>
                            </div>
                        }
                    />
                </div>

                {/* WOOTZ MAESTRO */}
                <div className="event-card-container" data-aos = "fade-up" data-aos-delay = "600">
                    <TiltedCard
                        imageSrc="/assets/evt3.jpg"
                        altText="Wootz Maestro Event"
                        captionText=""
                        containerHeight="350px"
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
                                    <Button>Register</Button>
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
