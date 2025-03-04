// cloudinaryService.js
const CLOUD_NAME = "dmj2uz5ao";
const UPLOAD_PRESET = "letter_pad";

// Upload image to Cloudinary
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data.secure_url; // Return the URL of the uploaded image
};

// Fetch uploaded images
export const fetchImagesFromCloudinary = async (folder) => {
  const response = await fetch(
    `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${folder}.json`
  );
  const data = await response.json();
  return data.resources; // Return array of images
};

// Delete image by public ID
export const deleteImageFromCloudinary = async (publicId) => {
  const response = await fetch(`/deleteImage/${publicId}`, {
    method: "DELETE",
  });
  return response.json();
};
