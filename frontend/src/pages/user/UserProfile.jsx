import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "@/lib/helper";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  PenLine,
  Upload,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";

const UserProfile = () => {
  const { userData, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userNotes, setUserNotes] = useState([]);
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    university: "",
  });
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Get user data from auth context
    if (userData && userData.data && userData.data.user) {
      setProfile({
        username: userData.data.user.username || "",
        email: userData.data.user.email || "",
        university: userData.data.user.university || "",
      });
      fetchUserNotes();
    }
  }, [userData]);

  const fetchUserNotes = async () => {
    try {
      setLoading(true);
      // Make API call to fetch notes uploaded by the user
      const response = await axios.get(`${baseURL}/note/my-notes`, {
        withCredentials: true,
      });

      if (response.data && response.data.data) {
        setUserNotes(response.data.data.notes || []);
      }
    } catch (err) {
      console.error("Error fetching user's notes:", err);
      setError("Failed to load your notes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);
    setSuccess(null);

    try {
      // Make API call to update profile
      await axios.put(`${baseURL}/user/update`, profile, {
        withCredentials: true,
      });

      setSuccess("Profile updated successfully!");
      // Update context with new user data if needed
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${baseURL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      logoutUser();
      navigate("/login");
    }
  };

  return (
    <div className="container max-w-6xl mx-auto p-6 bg-black text-white">
      <h1 className="text-3xl font-bold mb-2 text-white">My Profile</h1>
      <p className="text-gray-400 mb-8">Manage your account and settings</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <Card className="md:col-span-1 bg-zinc-900 border-zinc-800 text-white">
          <CardContent className="p-4">
            <div className="flex flex-col space-y-1 mt-2">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <span className="text-3xl font-semibold">
                      {profile.username
                        ? profile.username[0].toUpperCase()
                        : "U"}
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                    <PenLine className="h-4 w-4 text-black" />
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-center text-white">
                {profile.username}
              </h3>
              <p className="text-sm text-gray-400 text-center">
                {profile.university}
              </p>
            </div>

            <div className="mt-8 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate("/user/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate("/notes")}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                My Notes
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
                onClick={() => navigate("/upload-note")}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Notes
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/10 hover:text-white"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-gray-400 hover:bg-red-900/20 hover:text-red-400"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3 space-y-6">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-900 text-white">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-white data-[state=active]:text-black"
              >
                Profile Information
              </TabsTrigger>
              <TabsTrigger
                value="notes"
                className="data-[state=active]:bg-white data-[state=active]:text-black"
              >
                My Uploads
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle className="text-white">
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Update your personal details here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {error && (
                    <div className="mb-4 p-3 bg-red-900/20 border border-red-800 text-red-400 rounded-md">
                      {error}
                    </div>
                  )}

                  {success && (
                    <div className="mb-4 p-3 bg-green-900/20 border border-green-800 text-green-400 rounded-md">
                      {success}
                    </div>
                  )}

                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="username"
                          className="text-sm font-medium text-white"
                        >
                          Username
                        </label>
                        <Input
                          id="username"
                          name="username"
                          value={profile.username}
                          onChange={handleInputChange}
                          placeholder="Your username"
                          className="bg-zinc-800 border-zinc-700 text-white focus:border-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-white"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleInputChange}
                          placeholder="Your email address"
                          disabled
                          className="bg-zinc-800 border-zinc-700 text-white focus:border-white opacity-70"
                        />
                        <p className="text-xs text-gray-400">
                          Email cannot be changed
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="university"
                        className="text-sm font-medium text-white"
                      >
                        University
                      </label>
                      <Input
                        id="university"
                        name="university"
                        value={profile.university}
                        onChange={handleInputChange}
                        placeholder="Your university"
                        className="bg-zinc-800 border-zinc-700 text-white focus:border-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={updating}
                      className="w-full md:w-auto bg-white text-black hover:bg-gray-200"
                    >
                      {updating ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card className="bg-zinc-900 border-zinc-800 text-white">
                <CardHeader>
                  <CardTitle className="text-white">
                    My Uploaded Notes
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage all the notes you've uploaded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-white"></div>
                    </div>
                  ) : userNotes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {userNotes.map((note) => (
                        <Card
                          key={note._id}
                          className="overflow-hidden bg-zinc-800 border-zinc-700 text-white"
                        >
                          <div className="p-4">
                            <h3 className="font-medium truncate text-white">
                              {note.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                              {note.description}
                            </p>
                            <div className="mt-3 flex justify-between items-center">
                              <span className="text-sm text-white">
                                ₹{note.price}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate(`/notes/${note._id}`)}
                                className="border-white text-white hover:bg-white hover:text-black"
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="flex justify-center">
                        <Upload className="h-12 w-12 text-gray-500" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-white">
                        No notes uploaded yet
                      </h3>
                      <p className="mt-1 text-gray-400">
                        Share your knowledge by uploading your first note!
                      </p>
                      <Button
                        className="mt-4 bg-white text-black hover:bg-gray-200"
                        onClick={() => navigate("/upload-note")}
                      >
                        Upload Notes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
