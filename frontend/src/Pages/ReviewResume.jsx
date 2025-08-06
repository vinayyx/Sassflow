import { Eraser, File, Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from "axios"
import { useAuth } from '@clerk/clerk-react'
import { toast } from "react-hot-toast"
import ReactMarkdown from 'react-markdown';


function ReviewResume() {

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth()

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input) {
      toast.error("Please choose an pdf.");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("resume", input); // backend me multer ya equivalent "image" field expect kar raha hai

      const { data } = await axios.post("/api/ai/review-resume", fd, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full mx-auto px-4 py-8">
      {/* Left Box */}
      <form
        onSubmit={submitHandler}
        className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5"
      >
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
          <Sparkles className="w-5 h-5 text-blue-500" />
          Review Resume Configuration
        </div>

        {/* File Upload Input */}
        <div>
          <label className="text-sm font-medium text-gray-600">Upload Resume</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setInput(e.target.files[0])}
            required
            className="block w-full text-sm text-gray-700 mt-2 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 transition"
          />
          <p className="text-xs text-gray-500 mt-4">Supported formats Pdf  Resume only</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {loading ? <span className='h-5 w-5 rounded-full border-2 border-t-transparent animate-spin' ></span>
            : <File className="w-4 h-4" />}

          Review Resume
        </button>
      </form>

      {/* Right Box */}
      {
        !content ? (
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-center text-center">
            <div className="space-y-2">
              <Eraser className="mx-auto w-6 h-6 text-blue-500" />
              <p className="text-sm text-gray-600">Click the "Review Resume" button to write your article here.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6  h-[60vh]">

            <div className='w-full h-full overflow-y-auto pr-2 text-sm text-gray-700 whitespace-pre-line '>
              <div className='reset-tw'>

                <ReactMarkdown>
                  {content}
                </ReactMarkdown>

              </div>


            </div>




          </div>
        )
      }
    </div>
  );
}



export default ReviewResume
