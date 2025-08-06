import React, { useEffect, useState } from 'react';
import { dummyCreationData } from '../assets/assets';
import { Sparkles } from 'lucide-react';
import RecentCreation from '../Components/RecentCreation';
import axios from "axios"
import { Protect, useAuth, useUser } from '@clerk/clerk-react'
import { toast } from "react-hot-toast"

function Dashboard() {
  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

  const [creationdata, setCreationdata] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth()

  const fatchcreation = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/user/get-user-creation", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });




      if (data.success) {
        setCreationdata(data.creation);
      } else {
        toast.error("eror");
      }



    } catch (error) {

      toast.error("eror");
    } finally {
      setLoading(false);

    }

  }

  useEffect(() => {
    fatchcreation()
  }, []);


  return (

    <>


      <div className="w-full flex flex-wrap gap-6 p-4 sm:justify-start justify-center">
        {/* Card 1 */}
        <div className="flex justify-between items-center bg-gray-100 text-gray-800 rounded-xl p-5 w-[300px] shadow-md hover:shadow-xl transition-all duration-300">
          <div className='flex items-start gap-1 justify-center flex-col'>
            <p className="text-sm text-gray-500">Total Creations</p>
            {!loading ? <h1 className="text-3xl font-bold">{creationdata.length} </h1> : (<div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>)}

          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Sparkles className="text-blue-500" size={28} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex justify-between items-center bg-gray-100 text-gray-800 rounded-xl p-5 w-[300px] shadow-md hover:shadow-xl transition-all duration-300">
          <div>
            <p className="text-sm text-gray-500">Plan</p>
            <h1 className="text-3xl font-bold">
              <Protect plan="premium" fallback="free" > Premium </Protect>
            </h1>
          </div>

          <div className="bg-green-100 p-3 rounded-full">
            <Sparkles className="text-green-500" size={28} />
          </div>
        </div>
      </div>

      {!loading ? (
        <div className="flex flex-col p-4 gap-1 w-full h-[65vh]">
          <h2 className="text-2xl font-bold text-gray-800 mt-2 mb-4">Recent Creations</h2>

          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            {creationdata.map((items) => (
              <RecentCreation key={items.id} items={items} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center h-[40vh] w-full items-center">
          <div className="w-8 h-8 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}




    </>
  );
}

export default Dashboard;
