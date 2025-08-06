import React from 'react'
import Button from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import TrustedTestimonials from '../ui/TrustedTestimonials'
import Brands from './Brands'

function Hero() {
    const navigate = useNavigate()

    return (
        <div className=' h-[80vh] sm:h-[100vh]  mt-5 sm:mt-0 flex items-center justify-center px-4 sm:px-6 pt-10 sm:pt-20 pb-12  sm:gap-0 sm:pb-20'>
            <div className='flex flex-col items-center gap-6 sm:gap-10 justify-center max-w-4xl w-full'>

                <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold text-center leading-tight'>
                    Create amazing content <br className='hidden sm:block' /> with AI tools
                </h1>

                <p className='text-gray-500 text-center text-sm sm:text-base leading-relaxed'>
                    Transform your content creation with our suite of premium AI tools. <br className='hidden sm:block' />
                    Write articles, generate images, and enhance your workflow.
                </p>

                {/* Buttons in same row with proper spacing */}
                <div className='flex flex-row items-center mt-2 sm:mt-0 justify-center gap-x-4'>
                    <Button label="Get Started" onClick={() => navigate("/ai")} />
                    <Button label="Watch Demo" />
                </div>

                <div className='w-full mt-5 sm:mt-0 '>
                    <TrustedTestimonials />
                </div>

                <div className='w-full mt-5 sm:mt-0 '>
                    <Brands />
                </div>

            </div>
        </div>
    )
}

export default Hero
