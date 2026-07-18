"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";

export default function AddTravelPlanPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be below 5MB");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Destination cover uploaded successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Cover image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("Please upload a destination image");
      return;
    }

    setLoading(true);

    const form = new FormData(e.currentTarget);
    const travelData = {
      destination: form.get("destination"),
      duration: form.get("duration"),
      description: form.get("description"),
      category: form.get("category"),
      budget: form.get("budget"),
      estimatedCost: Number(form.get("estimatedCost")),
      image: imageUrl,
      isFeatured: false,
      isReviewed: false,
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userId: session?.user?.id,
      likesCount: 0,
      favoritesCount: 0,
      createdAt: new Date(),
    };

    try {
      // API Route changed to /addTravelPlan
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/addTravelPlan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(travelData),
      });

      console.log("Response from server:", res);

      const data = await res.json();
      if (data.insertedId) {
        toast.success("Travel Plan Created Successfully");
        router.push("/explore");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create travel plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/60 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/40 p-8 sm:p-10">
        {/* Header section */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create AI Travel Plan
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Share or generate a new itinerary, travel experiences, and budget plans with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Destination & Duration Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Destination */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Destination Place
              </label>
              <input
                type="text"
                name="destination"
                required
                placeholder="e.g., Cox's Bazar, Sajek Valley"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Duration / Days
              </label>
              <input
                type="text"
                name="duration"
                required
                placeholder="e.g., 3 Days, 2 Nights"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Itinerary / Plan Description
            </label>
            <textarea
              rows={5}
              name="description"
              required
              placeholder="Describe your day-by-day plan or details about the trip..."
              className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
            />
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Destination Cover Image
            </label>
            <div className="flex items-center gap-5 p-4 bg-gray-50/40 border border-gray-100 rounded-xl">
              <label className="group relative w-24 h-24 border-2 border-dashed border-gray-200 hover:border-purple-400 rounded-xl cursor-pointer overflow-hidden flex items-center justify-center bg-white transition-all">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="destination cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <span className="text-2xl text-gray-400 group-hover:text-purple-500 transition-colors">
                    +
                  </span>
                )}
              </label>

              <div>
                <p className="text-sm font-medium text-gray-800">
                  {uploading ? "Uploading cover..." : "Choose a destination cover"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Supports PNG, JPG, WebP formats up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Dropdown Options & Budget Grid */}
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Travel Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Travel Category
              </label>
              <select
                name="category"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              >
                <option value="Adventure">Adventure</option>
                <option value="Relaxation">Relaxation</option>
                <option value="Solo Trip">Solo Trip</option>
                <option value="Family Trip">Family Trip</option>
                <option value="Historical">Historical</option>
                <option value="Trekking">Trekking</option>
              </select>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                name="budget"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all cursor-pointer"
              >
                <option value="Budget-Friendly">Budget-Friendly 🪙</option>
                <option value="Mid-Range">Mid-Range 💳</option>
                <option value="Luxury">Luxury 💎</option>
              </select>
            </div>

            {/* Estimated Cost */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estimated Cost (BDT)
              </label>
              <input
                type="number"
                name="estimatedCost"
                min="500"
                required
                placeholder="e.g., 5000"
                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Form Action Button */}
          <div className="pt-4">
            <Button
              type="submit"
              isDisabled={loading || uploading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm py-6 rounded-xl shadow-lg shadow-purple-500/10 transition-all tracking-wider"
            >
              {loading ? "Creating..." : "CREATE TRAVEL PLAN ✈️"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}