// src/pages/AllNotes.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AllNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 6;


  
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError(null);
      try {
        let endpoint = "all";
        let params = `page=${page}&limit=${limit}`;

        // If searching, use search endpoint
        if (searchQuery) {
          endpoint = "search";
          params += `&title=${encodeURIComponent(searchQuery)}`;
        }

        const res = await axios.get(
          `http://localhost:8080/api/v1/note/${endpoint}?${params}`,
          { withCredentials: true }
        );
        // console.log(res?.data?.data?.notes)
        setNotes(res?.data?.data?.notes || []);
        setTotalPages(res?.data?.data?.totalPages || 1);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please try again.")
        setLoading(false);
        toast.error("Failed to load notes. Please try again.");
      }
    };
    fetchNotes();
  }, [page, limit, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by the useEffect when searchQuery changes
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-black text-white">
      
      {/* upper part */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-white ">
            📚 Study Materials
          </h1>
          <p className="text-gray-400">
            Find high-quality notes from students across universities
          </p>
        </div>
        <button
          onClick={() => navigate("/upload-note")}
          className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Upload Notes
        </button>
      </div>

      {/* Searching */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search for notes by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2.5 border border-zinc-700 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-gray-500"
          />
          <button
            type="submit"
            className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Search
          </button>
        </form>
      </div>


    {/* Notes List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
          <p className="mt-4 text-gray-400">🔃Loading notes...</p>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 text-red-400 border border-red-800 p-4 rounded-lg text-center">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      ) : notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900 rounded-xl border border-zinc-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p className="mt-4 text-xl text-gray-300">No notes available😔</p>
          <p className="text-gray-500">
            We couldn't find any notes matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-zinc-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-zinc-800 text-white"
            >
              {/*Preview Notes click to view details */}
              <div
                className="h-40 bg-zinc-800 flex items-center justify-center cursor-pointer relative "
                onClick={() => navigate(`/notes/${note._id}`)}
              >
                {note.fileUrl ? (
                  <>
                    {note.fileUrl.endsWith(".pdf") && (
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-white/30"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-xs font-medium text-gray-400 mt-1">
                          PDF Document
                        </span>
                      </div>
                    )}

                    {/\.(jpg|jpeg|png|gif)$/i.test(note.fileUrl) && (
                      <img
                        src={note.fileUrl}
                        alt={note.title}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {!/\.(jpg|jpeg|png|gif|pdf)$/i.test(note.fileUrl) && (
                      <div className="flex flex-col items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-white/30"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span className="text-xs font-medium text-gray-400 mt-1">
                          Document
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium">
                        Preview
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-white/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-400 mt-1">
                      No preview
                    </span>
                  </div>
                )}
              </div>

              <div className="p-5">
                {/* University Badge */}
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold line-clamp-1 text-white">
                    {note.title}
                  </h2>
                  <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-black">
                    {note.university || "University"}
                  </span>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {note.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-bold text-white">₹{note.price}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/notes/${note._id}`)}
                    className="flex-1 bg-white hover:bg-gray-200 text-black py-2 px-4 rounded-md transition-colors"
                  >
                    Preview
                  </button>
                  <button className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-white py-2 px-4 rounded-md transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && notes.length > 0 && (
        <div className="flex justify-center mt-10 mb-6">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className={`p-2 rounded-lg border ${
                page === 1
                  ? "text-gray-600 border-zinc-800 cursor-not-allowed"
                  : "text-white border-zinc-700 hover:bg-zinc-800"
              }`}
              title="First page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>

            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`p-2 rounded-lg border ${
                page === 1
                  ? "text-gray-600 border-zinc-800 cursor-not-allowed"
                  : "text-white border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 mx-1">
              {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                // Show page numbers centered around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                      page === pageNum
                        ? "bg-white text-black"
                        : "text-white hover:bg-zinc-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`p-2 rounded-lg border ${
                page === totalPages
                  ? "text-gray-600 border-zinc-800 cursor-not-allowed"
                  : "text-white border-zinc-700 hover:bg-zinc-800"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>

            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className={`p-2 rounded-lg border ${
                page === totalPages
                  ? "text-gray-600 border-zinc-800 cursor-not-allowed"
                  : "text-white border-zinc-700 hover:bg-zinc-800"
              }`}
              title="Last page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default AllNotes;
