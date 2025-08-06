import { useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, Home, Image, LogOut, SquarePen, User } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar({ sidebar, setSidebar }) {
  const { user } = useUser();
  const {signOut, openUserProfile} = useClerk ()

  const navitems = [
    { name: 'Dashboard', path: '/ai/', Icon: Home },
    { name: 'BlogTitles', path: '/ai/blot-titles', Icon: Hash },
    { name: 'GenrateImages', path: '/ai/genrateimages/', Icon: Image },
    { name: 'RemoveBackround', path: '/ai/remove-backround', Icon: Eraser },
    { name: 'RemoveObject', path: '/ai/remove-Object', Icon: Eraser },
    { name: 'ReviewResume', path: '/ai/review-resume', Icon: FileText },
    { name: 'WriteArticle', path: '/ai/write-article', Icon: SquarePen },
    { name: 'community', path: '/ai/community', Icon: User },
  ];

  return (
    <div
      className={`
        h-[86vh] w-60 bg-white shadow-md z-50 
        sm:relative sm:translate-x-0 
        fixed mt-6 left-0 
        transform ${sidebar ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out
      `}
    >
      <div className="w-full flex flex-col items-center px-4">
        <img
          src={user?.imageUrl}
          alt="User"
          className="rounded-full w-20 h-20 object-cover border-2 border-zinc-700"
        />
        <h1 className="mt-2 text-lg font-semibold text-center text-zinc-700">
          {user?.fullName || 'Guest'}
        </h1>

        <div className="mt-6 w-full px-2">
          {navitems.map(({ name, path, Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/ai/"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 p-2 text-zinc-900 hover:bg-zinc-100 rounded-md ${isActive ? 'bg-zinc-200 font-bold' : ''
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      <div className='border-t  gap-3 border-zinc-200 w-full bottom-0 absolute flex justify-center items-center py-4'>

        <img src={user?.imageUrl} onClick={openUserProfile} className='h-8 w-8 cursor-pointer rounded-full' />
        <h1 className='text-sm text-bold'>{user?.fullName}</h1>
        <LogOut onClick={signOut} className='h-6 w-6 cursor-pointer ' />


      </div>



    </div>
  );
}

export default Sidebar;
