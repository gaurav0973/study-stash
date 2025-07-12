import React from "react";
import { CheckCircle } from "lucide-react";

export const UploadSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center bg-black">
      <div className="rounded-full bg-zinc-800 border border-zinc-700 p-3 animate-pulse">
        <CheckCircle className="h-12 w-12 text-white" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">
        Upload Successful!
      </h3>
      <p className="mt-2 text-gray-400">
        Your note has been successfully uploaded and is now available for others
        to view.
      </p>
    </div>
  );
};
