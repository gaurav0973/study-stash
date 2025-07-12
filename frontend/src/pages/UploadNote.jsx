import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { baseURL } from "@/lib/helper";
import { UploadSuccess } from "@/components/ui/upload-success";
import { FilePreview } from "@/components/ui/file-preview";

const UploadNote = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        file,
      }));
    }
  };

  const removeFile = () => {
    setFormData((prev) => ({
      ...prev,
      file: null,
    }));
    // Reset the file input
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!formData.file) {
        throw new Error("Please select a file to upload");
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("file", formData.file);

      const response = await axios.post(`${baseURL}/note/upload`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Note uploaded:", response.data);
      setSuccess(true);

      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        file: null,
      });

      // Redirect to all notes page after 2 seconds
      setTimeout(() => {
        navigate("/notes");
      }, 2000);
    } catch (err) {
      console.error("Error uploading note:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to upload note. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <UploadSuccess />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-black text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📝 Upload Study Material</h1>
        <p className="text-gray-400">
          Share your knowledge with others by uploading your notes, study
          guides, or other educational materials
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-zinc-900 border border-zinc-700 rounded-lg flex items-start">
          <AlertCircle className="text-white mt-0.5 mr-2 h-5 w-5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-white">Upload Failed</h4>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-zinc-900 rounded-xl shadow-md p-6 border border-zinc-800">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-1">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-white"
              >
                Title *
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="e.g., Advanced Calculus Notes"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-white"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your study material in detail..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-zinc-500 focus-visible:ring-zinc-500/50 focus-visible:ring-[3px] text-white"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-white"
              >
                Price (in USD) *
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter 0 for free materials
              </p>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-white"
              >
                File Upload *
              </label>
              <div className="mt-1 flex items-center justify-center w-full">
                {!formData.file ? (
                  <label
                    htmlFor="file-upload"
                    className="w-full flex flex-col items-center justify-center border-2 border-zinc-700 border-dashed rounded-lg cursor-pointer bg-zinc-800 hover:bg-zinc-700"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-white" />
                      <p className="mb-2 text-sm text-white">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400">
                        PDF, DOCX, PPT, or other document formats (max 100MB)
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      name="file"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      required={!formData.file}
                    />
                  </label>
                ) : (
                  <FilePreview file={formData.file} onRemove={removeFile} />
                )}
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent border-black mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Note
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8 text-gray-400 text-sm bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        <h4 className="font-medium mb-3 text-white border-b border-zinc-700 pb-2">
          📋 Upload Guidelines:
        </h4>
        <ul className="list-disc pl-5 space-y-2">
          <li>Ensure your notes are original or properly cited</li>
          <li>Material should be educational and helpful for others</li>
          <li>PDF format is preferred for better compatibility</li>
          <li>Clearly describe what's included in your notes</li>
          <li>Set a fair price or make it free to help more students</li>
        </ul>
      </div>
    </div>
  );
};

export default UploadNote;
