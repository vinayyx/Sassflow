import { useAuth } from '@clerk/clerk-react';
import { Edit, Edit2, Hash, HashIcon, Sparkle } from 'lucide-react';
import axios from "axios"
import { toast } from "react-hot-toast"
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

function BlogTitles() {

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

  const titlecatagry = [
    "Technology",
    "Health & Wellness",
    "Education",
    "Finance & Investing",
    "Travel",
    "Food & Recipes",
    "Lifestyle",
  ];


  const [selectedtitlecatagrye, setSelectedtitlecatagry] = useState("Technology");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth()


  const sumbithandler = async (e) => {
    e.preventDefault();


    try {

      setLoading(true)
      const promt = ` genrate a blog title for keyword ${input} in the catagary ${selectedtitlecatagrye}`

      const { data } = await axios.post("/api/ai/genrate-blog", {
        promt,
      }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)

      }


    } catch (error) {

      toast.error(error.message)

    }

    setLoading(false)


  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full  mx-auto px-4 py-8 ">
      {/* Left Box */}
      <form
        onSubmit={sumbithandler}
        className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5"
      >
        <div className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
          <Hash className="w-5 h-5 text-blue-500" />
          Title Configuration
        </div>

        {/* Topic Input */}
        <div>
          <label className="text-sm font-medium text-gray-600">Title Topic</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Benefits of AI in Education"
          />
        </div>

        {/* Article Length Options (Horizontal) */}
        <div>
          <label className="text-sm font-medium text-gray-600">Select Topic</label>
          <div className="flex flex-wrap gap-3 mt-2">
            {titlecatagry.map((item) => (
              <div
                key={item}
                onClick={() => setSelectedtitlecatagry(item)}
                className={`cursor-pointer text-sm px-4 py-2 rounded-md border transition-all ${selectedtitlecatagrye === item
                  ? "bg-blue-100 border-blue-400 text-blue-800"
                  : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >

          {loading ? <span className='h-5 w-5 rounded-full border-2 border-t-transparent animate-spin' ></span>
            : <Hash className="w-4 h-4" />}


          Generate Title
        </button>
      </form>

      {/* Right Box */}
      {
        !content ? (
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-center text-center">
            <div className="space-y-2">
              <Hash className="mx-auto w-6 h-6 text-blue-500" />
              <p className="text-sm text-gray-600">Click the "Generate Title" button to write your article here.</p>
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



export default BlogTitles
