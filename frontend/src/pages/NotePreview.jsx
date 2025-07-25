import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { cn } from "@/lib/utils";

const NotePreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewMode, setPreviewMode] = useState("preview"); // preview or details

  useEffect(() => {
    const fetchNoteDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:8080/api/v1/note/${id}`, {
          withCredentials: true,
        });
        setNote(res?.data?.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching note details:", err);
        setError("Failed to load note details. Please try again.");
        setLoading(false);
      }
    };

    if (id) {
      fetchNoteDetails();
    }
  }, [id]);

  const handlePurchase = () => {
    // Implement purchase functionality
    alert(`Note "${note.title}" added to cart!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center bg-black text-white">
        {" "}
        <div className="bg-zinc-900 border border-zinc-700 text-white p-4 rounded-lg">
          <p>{error}</p>
          <Button
            onClick={() => navigate(-1)}
            className="mt-4 bg-white text-black hover:bg-gray-200"
            variant="outline"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-black text-white">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 text-white hover:bg-white/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Notes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left Column - Preview */}
        <div className="lg:col-span-3">
          <Card className="shadow-md h-full bg-zinc-900 border-zinc-800 text-white">
            <CardHeader className="border-b border-zinc-700">
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold text-white">
                  {note.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={previewMode === "preview" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("preview")}
                    className={
                      previewMode === "preview"
                        ? "bg-white text-black hover:bg-gray-200"
                        : "border-white text-white hover:bg-white/10"
                    }
                  >
                    Preview
                  </Button>
                  <Button
                    variant={previewMode === "details" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode("details")}
                    className={
                      previewMode === "details"
                        ? "bg-white text-black hover:bg-gray-200"
                        : "border-white text-white hover:bg-white/10"
                    }
                  >
                    Details
                  </Button>
                </div>
              </div>
              <CardDescription className="text-gray-400 mt-2">
                {note.university ? (
                  <span className="inline-flex items-center bg-zinc-800 border border-zinc-700 px-2 py-1 rounded text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-1"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                      <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                    </svg>
                    {`From ${note.university}`}
                  </span>
                ) : (
                  "Study Note"
                )}
              </CardDescription>
            </CardHeader>

            <CardContent
              className={cn(
                "flex items-center justify-center min-h-[500px] transition-all duration-300",
                previewMode === "details" && "hidden"
              )}
            >
              {note.fileUrl ? (
                <div className="relative w-full h-full min-h-[500px]">
                  {/* PDF Preview */}{" "}
                  {note.fileUrl.endsWith(".pdf") && (
                    <iframe
                      src={`${note.fileUrl}#toolbar=0&navpanes=0`}
                      className="w-full h-full min-h-[500px] rounded-md border border-zinc-700"
                      title={note.title}
                    />
                  )}
                  {/* Image Preview */}
                  {/\.(jpg|jpeg|png|gif)$/i.test(note.fileUrl) && (
                    <img
                      src={note.fileUrl}
                      alt={note.title}
                      className="max-w-full max-h-[500px] object-contain mx-auto rounded-md border border-zinc-700"
                    />
                  )}
                  {/* Default Preview */}
                  {!/\.(jpg|jpeg|png|gif|pdf)$/i.test(note.fileUrl) && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <line x1="10" y1="9" x2="8" y2="9" />
                      </svg>
                      <p className="mt-4 text-gray-400">
                        Preview not available
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 bg-white text-black hover:bg-gray-200"
                        onClick={() => window.open(note.fileUrl, "_blank")}
                      >
                        Download to View
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-400">No preview available</p>
                </div>
              )}
            </CardContent>

            <CardContent
              className={cn(
                "transition-all duration-300",
                previewMode === "preview" && "hidden"
              )}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-2 text-white border-b border-zinc-700 pb-2">
                    Description
                  </h3>
                  <p className="text-gray-400 bg-zinc-800 p-3 rounded-lg border border-zinc-700 mt-3">
                    {note.description}
                  </p>
                </div>{" "}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                    <h4 className="text-sm font-medium text-gray-400 border-b border-zinc-700 pb-1 mb-2">
                      University
                    </h4>
                    <p className="text-white">
                      {note.university || "Not specified"}
                    </p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                    <h4 className="text-sm font-medium text-gray-400 border-b border-zinc-700 pb-1 mb-2">
                      Uploaded By
                    </h4>
                    <p className="text-white">
                      {note.uploadedBy?.username || "Anonymous"}
                    </p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                    <h4 className="text-sm font-medium text-gray-400 border-b border-zinc-700 pb-1 mb-2">
                      Uploaded On
                    </h4>
                    <p className="text-white">
                      {new Date(note.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
                    <h4 className="text-sm font-medium text-gray-400 border-b border-zinc-700 pb-1 mb-2">
                      File Type
                    </h4>
                    <p className="text-white">
                      <span className="inline-block px-2 py-1 bg-black border border-zinc-700 rounded text-sm">
                        {note.fileUrl
                          ? note.fileUrl.split(".").pop().toUpperCase()
                          : "Unknown"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Purchase Info */}
        <div className="lg:col-span-2">
          <Card className="shadow-md sticky top-6 bg-zinc-900 border-zinc-800 text-white">
            <CardHeader className="border-b border-zinc-700">
              <CardTitle className="text-white">Purchase Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price:</span>
                  <span className="text-2xl font-bold text-white bg-zinc-800 border border-zinc-700 px-3 py-1 rounded">
                    ₹{note.price}
                  </span>
                </div>

                <div className="border-t border-b border-zinc-700 py-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating:</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill={star <= 4 ? "currentColor" : "none"}
                          stroke="currentColor"
                          className={star <= 4 ? "text-white" : "text-gray-500"}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-white bg-zinc-800 border border-zinc-700 px-2 rounded">
                        4.0
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Downloads:</span>
                    <span className="text-white bg-zinc-800 border border-zinc-700 px-2 rounded text-sm">
                      120+
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pages:</span>
                    <span className="text-white bg-zinc-800 border border-zinc-700 px-2 rounded text-sm">
                      24
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-white border-b border-zinc-700 pb-2">
                    What You'll Get
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-white">
                      <svg
                        className="text-white mr-2"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Full access to download
                    </li>
                    <li className="flex items-center text-white">
                      <svg
                        className="text-white mr-2"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Print & digital copy
                    </li>
                    <li className="flex items-center text-white">
                      <svg
                        className="text-white mr-2"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      Lifetime access
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                onClick={handlePurchase}
                className="w-full bg-white text-black hover:bg-gray-200"
                size="lg"
              >
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white/10"
                size="lg"
              >
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotePreview;
