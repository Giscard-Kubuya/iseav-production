"use client";

import { useState, useRef, useCallback } from "react";
import { apiRequest } from "@/lib/api";

interface ImageUploadProps {
  module: string;
  onImageUploaded: (imageData: ImageData) => void;
  currentImageUrl?: string;
  altText?: string;
  className?: string;
  acceptedFormats?: string[];
  maxSizeMB?: number;
}

interface ImageData {
  url: string;
  public_id: string;
  responsive_urls: {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
  };
  width: number;
  height: number;
  format: string;
  size_bytes: number;
  alt_text?: string;
}

export default function ImageUpload({
  module,
  onImageUploaded,
  currentImageUrl,
  altText,
  className = "",
  acceptedFormats = ["jpg", "jpeg", "png", "webp"],
  maxSizeMB = 5
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList) => {
    const file = files[0];
    if (!file) return;

    // Validate file
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
      setError(`Format non supporté. Formats acceptés: ${acceptedFormats.join(', ')}`);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Fichier trop volumineux. Taille maximale: ${maxSizeMB}MB`);
      return;
    }

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('module', module);
      if (altText) {
        formData.append('alt_text', altText);
      }

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await apiRequest.post('/upload/image', formData, {
        headers: {
          'Website-ID': '1',
          'Content-Type': 'multipart/form-data',
        },
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.data.success) {
        onImageUploaded(response.data.data);
        setTimeout(() => {
          setUploadProgress(0);
        }, 1000);
      } else {
        setError(response.data.error || 'Erreur lors de l\'upload');
      }

    } catch (error: any) {
      console.error('Upload error:', error);
      setError(
        error.response?.data?.error || 
        error.response?.data?.message || 
        'Erreur lors de l\'upload de l\'image'
      );
    } finally {
      setUploading(false);
    }
  }, [module, acceptedFormats, maxSizeMB, altText, onImageUploaded]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = async () => {
    if (currentImageUrl) {
      // For now, just clear the image URL
      // In a full implementation, you'd want to call the delete API
      onImageUploaded({
        url: "",
        public_id: "",
        responsive_urls: { thumbnail: "", small: "", medium: "", large: "" },
        width: 0,
        height: 0,
        format: "",
        size_bytes: 0,
      });
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept={acceptedFormats.map(format => `.${format}`).join(',')}
        onChange={handleChange}
        disabled={uploading}
      />

      {currentImageUrl ? (
        // Current image display
        <div className="relative group">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={currentImageUrl}
              alt={altText || "Uploaded image"}
              className="w-full h-full object-cover"
            />
            
            {uploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-12 h-12 mx-auto mb-2">
                    <div className="w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-sm">Upload en cours... {uploadProgress}%</p>
                </div>
              </div>
            )}

            {/* Overlay buttons */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                <button
                  type="button"
                  onClick={openFileDialog}
                  disabled={uploading}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  Changer
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={uploading}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:opacity-50"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Upload area
        <div
          className={`
            relative w-full h-48 border-2 border-dashed rounded-lg transition-colors duration-200
            ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'}
            ${uploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:border-blue-400 hover:bg-blue-50'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4">
                  <div className="w-full h-full border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-600 mb-2">Upload en cours...</p>
                <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto">
                  <div 
                    className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{uploadProgress}%</p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                </svg>
                <p className="text-gray-600 mb-2">
                  Cliquez pour choisir une image ou glissez-déposez
                </p>
                <p className="text-sm text-gray-500">
                  Formats: {acceptedFormats.join(', ')} • Max: {maxSizeMB}MB
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
    </div>
  );
}