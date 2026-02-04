// api/cloudinary.js
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_PRESETS } from './config';

export const uploadToCloudinary = async (file, category = 'OTHERS') => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);

  // This selects the preset string (e.g., "hr_preset") based on the category passed
  const presetName = CLOUDINARY_PRESETS[category]; 
  formData.append("upload_preset", presetName);

  try {
    // Adding /auto/ ensures Cloudinary handles PDFs, ZIPs, and images correctly
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) throw new Error("Upload failed");
    
    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id,
      format: data.format // e.g., 'pdf', 'png'
    };
  } catch (error) {
    console.error("Cloudinary Error:", error);
    throw error;
  }
};