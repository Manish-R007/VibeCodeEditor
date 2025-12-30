import React from "react";

const authLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex justify-center items-center min-h-screen flex-col">
      {/* Base gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-br from-gray-900 via-black to-gray-950"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(90deg,#ffffff08_1px,transparent_1px),linear-gradient(#ffffff08_1px,transparent_1px)] [background-size:40px_40px]"></div>
      
      {/* Neon accents */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-rose-500/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"></div>
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {children}
    </main>
  );
};

export default authLayout;