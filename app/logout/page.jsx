'use client'
import React, { useEffect } from "react";
import { signOut } from "next-auth/react";

function LogoutPage() {

    useEffect(()=>{
        signOut({
            redirect: true,
            callbackUrl: "/",
          });
    },[])

  return (
    <>
      <div className="flex flex-col gap-6 items-center justify-center h-screen w-full">
        <div className="flex space-x-2 justify-center items-center bg-white dark:invert">
          <span className="sr-only">Logging Out...</span>
          <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-4 w-4 bg-gray-400 rounded-full animate-bounce"></div>
        </div>

        <div className="mt-10 text-xl font-mono text-gray-600">
          Logging Out...
        </div>
      </div>
    </>
  );
}

export default LogoutPage;
