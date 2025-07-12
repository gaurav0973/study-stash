import React from "react";
import { FileText, FileImage, Film, File, X } from "lucide-react";

export const FilePreview = ({ file, onRemove }) => {
  if (!file) return null;

  const getFileIcon = () => {
    const fileType = file.type;

    if (fileType.includes("pdf")) {
      return <FileText className="h-10 w-10 text-white" />;
    } else if (fileType.includes("image")) {
      return <FileImage className="h-10 w-10 text-white" />;
    } else if (fileType.includes("video")) {
      return <Film className="h-10 w-10 text-white" />;
    } else {
      return <File className="h-10 w-10 text-white" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="mt-4 p-4 border border-zinc-700 rounded-lg bg-zinc-800 flex items-center justify-between">
      <div className="flex items-center">
        {getFileIcon()}
        <div className="ml-3">
          <p className="font-medium text-sm truncate max-w-xs text-white">
            {file.name}
          </p>
          <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
        </div>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-1 rounded-full hover:bg-zinc-700"
        >
          <X className="h-5 w-5 text-white" />
        </button>
      )}
    </div>
  );
};
