import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <>
      <div className="flex flex-col gap-6 items-center justify-center h-screen w-full">
        <div class="flex space-x-2 justify-center items-center bg-white dark:invert">
          <span class="sr-only">Loading...</span>
          <div class="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div class="h-4 w-4 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div class="h-4 w-4 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
        
        <div className="mt-10 text-xl font-mono text-gray-600">
          Page is Loading
        </div>
      </div>
    </>
  );
}

export default Loading;
