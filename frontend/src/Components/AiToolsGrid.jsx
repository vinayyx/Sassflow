import { useUser } from '@clerk/clerk-react';
import React from 'react';
import { FaRobot, FaHeading, FaImage, FaEraser, FaTrashAlt, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AiToolsGrid() {
    const navigate = useNavigate();
    const { user } = useUser();

    return (
        <div className="min-h-screen flex flex-col gap-12 px-6 sm:px-[5vw] py-10">

            <div className='flex items-center gap-4 justify-center flex-col text-center'>
                <h1 className='text-3xl sm:text-4xl font-bold'>Powerful AI Tools</h1>
                <p className='text-gray-400 text-sm sm:text-base'>
                    Everything you need to create, enhance, and optimize your content with <br className='hidden sm:block' />
                    cutting-edge AI technology.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-[10vw]">

                {/* Card 1 */}
                <div onClick={() => user && navigate("/ai/write-article")} className="p-5 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 bg-white ">
                    <FaRobot size={40} className="text-red-400 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">AI Article Writer</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Generate high-quality articles instantly with AI-powered writing assistance.</p>
                </div>

                {/* Card 2 */}
                <div onClick={() => user && navigate("/ai/blot-titles")} className="p-5 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 bg-white ">
                    <FaHeading size={40} className="text-blue-400 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Blog Title Generator</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Create attention-grabbing blog titles in seconds based on your topic.</p>
                </div>

                {/* Card 3 */}
                <div onClick={() => user && navigate("/ai/genrateimages")} className="p-5 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 bg-white ">
                    <FaImage size={40} className="text-green-400 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">AI Image Generation</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Turn your ideas into stunning images with advanced AI image models.</p>
                </div>

                {/* Card 4 */}
                <div onClick={() => user && navigate("/ai/remove-backround")} className="p-5 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 bg-white ">
                    <FaEraser size={40} className="text-yellow-400 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Background Removal</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Easily remove image backgrounds with one click using AI tools.</p>
                </div>

                {/* Card 5 */}
                <div onClick={() => user && navigate("/ai/remove-Object")} className="p-5 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 bg-white ">
                    <FaTrashAlt size={40} className="text-pink-400 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Object Removal</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Remove unwanted objects from images quickly and cleanly.</p>
                </div>

                {/* Card 6 */}
                <div onClick={() => user && navigate("/ai/review-resume")} className="p-5 rounded-2xl shadow-md hover:scale-105 transition-all duration-300 bg-white ">
                    <FaFileAlt size={40} className="text-purple-400 mb-4" />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">Resume Reviewer</h3>
                    <p className="text-gray-400 text-sm sm:text-base">Get instant feedback and improvement suggestions for your resume.</p>
                </div>

            </div>
        </div>
    );
}

export default AiToolsGrid;
