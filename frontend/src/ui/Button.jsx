import React from 'react';

function Button({ label = "Get Started", onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden text-white transition-all duration-300 ease-out rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 group hover:from-indigo-600 hover:to-blue-600 shadow-md hover:shadow-xl"
    >
      <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
      <span className="relative z-10 font-semibold tracking-wide">{label}</span>
    </button>
  );
}

export default Button;
