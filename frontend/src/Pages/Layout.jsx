import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import { Eraser, FileText, Hash, Home, icons, Image, Menu, SquarePen, User, X } from 'lucide-react';
import { SignIn, useUser } from "@clerk/clerk-react"

function Layout() {
  const [sidebar, setSidebar] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate()



  return user ? (
    <div className="flex flex-col min-h-screen items-start relative justify-start">
      <nav className="font-bold h-[10vh] text-3xl italic text-zinc-700 relative w-full z-50 px-[5vw] py-5 cursor-pointer flex justify-between items-center">
        <h1 onClick={()=>navigate("/")} >SassFlow</h1>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden">
          {sidebar ? (
            <X onClick={() => setSidebar(false)} className="h-8 w-8" />
          ) : (
            <Menu onClick={() => setSidebar(true)} className="h-8 w-8" />
          )}
        </div>
      </nav>

      <div className="flex flex-1 h-[calc(100vh-10vh)] w-full">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className="flex-1 h-full overflow-y-auto  px-4 py-6">

          <Outlet />
        </div>
      </div>
    </div>
  ) : (<div className=" flex items-center justify-center w-full h-screen">

    <SignIn />


  </div>);
}

export default Layout;
