import React from "react";
import { CheckCircle } from "lucide-react";

export const UploadSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="rounded-full bg-green-100 p-3 animate-pulse">
        <CheckCircle className="h-12 w-12 text-green-600" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-green-700">
        Upload Successful!
      </h3>
      <p className="mt-2 text-gray-600">
        Your note has been successfully uploaded and is now available for others
        to view.
      </p>
    </div>
  );
};
