import React, { useEffect, useState } from 'react';
import { dummyPublishedCreationData } from '../assets/assets';
import { useUser } from '@clerk/clerk-react';
import { Heart } from 'lucide-react';
import axios from "axios"
import { useAuth } from '@clerk/clerk-react'
import { toast } from "react-hot-toast"


function Community() {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


  const [contentcreation, setcontentcreation] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth()


  const fatchcreation = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/user/get-published-creation", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });


      if (data.success) {
        setcontentcreation(data.creation);
      } else {
        toast.error("eror");
      }



    } catch (error) {

      toast.error("eror");
    } finally {
      setLoading(false);

    }

  }

  const togglelike = async (id) => {

    try {

      console.log(id)
      if (!id) {
        toast.error("Invalid creation ID");
        return;
      }



      const { data } = await axios.post("/api/user/toggled-liked-creation", { id }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        toast.success(data.message);
        fatchcreation();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };


  useEffect(() => {

    fatchcreation()

  }, [user]);

  const handleLike = (index) => {
    setcontentcreation((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
            ...item,
            liked: !item.liked,
            likes: item.liked
              ? item.likes.slice(0, -1)
              : [...item.likes, 'newlike'],
          }
          : item
      )
    );
  };

  return (

    !loading ?

      <div className="p-4 sm:p-6 h-[80vh] flex flex-col">
        {/* Fixed Heading */}
        <h1 className="text-2xl font-semibold mb-4 text-black sticky top-0 bg-white z-10 py-2">
          Community Creations
        </h1>

        {/* Scrollable Image Grid */}
        <div className="overflow-y-auto flex-1 pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {contentcreation.map((item, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl shadow-md bg-gray-800"
              >
                <img
                  src={item.content}
                  alt="creation"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 space-y-3">
                  <p className="text-white text-sm">{item.promt}</p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleLike(index)} className="focus:outline-none">
                      <Heart
                        onClick={() => { togglelike(item.id) }}
                        className={`w-5 h-5 transition-colors duration-200 ${item.likes.includes(user.id) ? 'text-red-500 fill-red-500' : 'text-white'
                          }`}
                      />
                    </button>
                    <span className="text-white text-sm">{item.likes.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> : (
        <div className="flex justify-center h-[80vh] w-full items-center">
          <div className="w-8 h-8 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )
  );
}

export default Community;
