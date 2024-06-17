const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

// ****** SET FOLDER NAMES HERE *****
const sourceFolder = '07-17-website-test';
const destinationFolder = '07-17-website-staging';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to copy a Cloudinary folder
const copyFolder = async (sourceFolder, destinationFolder) => {
  try {
    // Fetch all resources in the source folder
    const { resources } = await cloudinary.search.expression(`folder:${sourceFolder}`).execute();

    if (resources.length === 0) {
      console.log('No images found in the source folder.');
      return;
    }

    // Copy each resource to the destination folder
    for (const resource of resources) {
      const publicId = resource.public_id;
      const newPublicId = path.join(destinationFolder, path.basename(publicId));

      // Get the image URL
      const imageUrl = cloudinary.url(publicId, { resource_type: 'image' });

      // Download the image temporarily
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const tempFilePath = `/tmp/${path.basename(publicId)}.jpg`;
      fs.writeFileSync(tempFilePath, response.data);

      // Upload the image to the new folder with the same public ID
      await cloudinary.uploader.upload(tempFilePath, {
        public_id: newPublicId,
        overwrite: true,
        resource_type: 'image',
      });

      // Clean up the temporary file
      fs.unlinkSync(tempFilePath);

      console.log(`Copied ${publicId} to ${newPublicId}`);
    }

    console.log('Folder copy completed successfully.');
  } catch (error) {
    console.error('Error copying folder:', error);
  }
};

// Run function
copyFolder(sourceFolder, destinationFolder);
