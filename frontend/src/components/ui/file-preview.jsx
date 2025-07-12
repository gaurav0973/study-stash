import React from "react";
import { FileText, FileImage, Film, File, X } from "lucide-react";

export const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  const getFileIcon = () => {
    const fileType = file.type;

    if (fileType.includes("pdf")) {
      return <FileText className="h-10 w-10 text-red-500" />;
    } else if (fileType.includes("image")) {
      return <FileImage className="h-10 w-10 text-blue-500" />;
    } else if (fileType.includes("video")) {
      return <Film className="h-10 w-10 text-purple-500" />;
    } else {
      return <File className="h-10 w-10 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="mt-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
      <div className="flex items-center">
        {getFileIcon()}
        <div className="ml-3">
          <p className="font-medium text-sm truncate max-w-xs">{file.name}</p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      )}
    </div>
  );
};
