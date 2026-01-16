"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ImageUploadProps {
  images: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onChange, maxImages = 6 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setUploading(true);

    try {
      const newUrls: string[] = [];
      const filesToUpload = Array.from(files).slice(0, remainingSlots);

      for (const file of filesToUpload) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          alert(`${file.name} is not an image`);
          continue;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert(`${file.name} is too large (max 5MB)`);
          continue;
        }

        // Generate unique filename
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from("listing-images")
          .upload(filePath, file);

        if (error) {
          console.error("Upload error:", error);
          alert(`Failed to upload ${file.name}`);
          continue;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("listing-images")
          .getPublicUrl(filePath);

        newUrls.push(urlData.publicUrl);
      }

      onChange([...images, ...newUrls]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(urlToRemove: string) {
    onChange(images.filter((url) => url !== urlToRemove));
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleUpload(e.dataTransfer.files);
  }

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`
          relative rounded-2xl border-2 border-dashed transition-all duration-300
          ${dragActive 
            ? "border-[#4F8CFF] bg-[#4F8CFF]/5" 
            : "border-white/15 hover:border-white/30"
          }
          ${images.length >= maxImages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleUpload(e.target.files)}
          disabled={uploading || images.length >= maxImages}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        <div className="p-8 text-center">
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-[#4F8CFF] animate-spin" />
              <p className="text-sm text-white/60">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#7CF5C8]/20 border border-white/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-[#4F8CFF]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/90">
                  {dragActive ? "Drop images here" : "Click or drag images to upload"}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  Max {maxImages} images • PNG, JPG up to 5MB each
                </p>
                <p className="text-xs text-white/40">
                  {images.length}/{maxImages} uploaded
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div
              key={url}
              className="relative group aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
              />

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
              >
                <X className="h-4 w-4 text-white" />
              </button>

              {/* Index badge */}
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 text-xs text-white/80">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}