import React, { useState, useEffect, useRef } from 'react'
import '../styles/pricepool.css'
import CountUp from '@/components/TextAnimations/CountUp/CountUp'
import BlurText from '@/components/TextAnimations/BlurText/BlurText'

function PricePool() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(false) // Reset animation
          setTimeout(() => setIsVisible(true), 100) // Restart after a short delay
        }
      },
      { threshold: 0.5 } // Trigger when 50% is visible
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className='price-pool'>
      {isVisible && (
        <>
          <div>
            <BlurText
              text='The prize pool is massive! Register now and claim your rewards!'
              delay={70}
              animateBy="words"
              direction="top"
              className="price-pool-title"
            />
            <BlurText
              text='The prize pool is massive!'
              delay={70}
              animateBy="words"
              direction="top"
              className="price-pool-title-mobile"
            />
          </div>
          <div className="count-up" data-aos="fade-up" data-aos-delay="300">
            <span className="rupee-symbol">₹</span>
            <CountUp to={30000} from={29970} duration={2} separator="," />
          </div>
        </>
      )}
    </div>
  )
}

export default PricePool
