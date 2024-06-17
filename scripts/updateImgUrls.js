// Required dependencies
const { PrismaClient } = require('@prisma/client');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to extract Image ID from a URL
const extractImageId = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1].split('.')[0];
};

// Function to get all images from a specified Cloudinary folder
const getImagesInFolder = async (folderPath) => {
  let resources = [];
  let nextCursor;

  do {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath,
      max_results: 500,
      next_cursor: nextCursor,
    });

    resources = resources.concat(result.resources);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources;
};

// Function to update image URL in the database
const updateImageUrl = async (model, id, urlKey, newUrl) => {
  await prisma[model].update({
    where: { id },
    data: { [urlKey]: newUrl },
  });
};

const processCollection = async (name, imageKey, imageMap) => {
  const documents = await prisma[name].findMany();
  for (const doc of documents) {
    const imageId = extractImageId(doc[imageKey]);
    if (imageMap.has(imageId)) {
      if (imageMap.get(imageId) !== doc[imageKey]) {
        const newUrl = imageMap.get(imageId);
        await updateImageUrl(name, doc.id, imageKey, newUrl);
        console.log(`Updated ${name} ID ${doc.id} with new image URL.`);
      } else {
        console.log(`Skipping ${name} ID ${doc.id} as URLs already the same.`);
      }
    }
  }
};

// Main function to process all documents
const processDocuments = async () => {
  // Get folder path from environment variables
  const folderPath = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

  // Get all images in the specified folder
  const imagesInFolder = await getImagesInFolder(folderPath);
  const imageMap = new Map();

  imagesInFolder.forEach((image) => {
    const imageId = extractImageId(image.secure_url);
    imageMap.set(imageId, image.secure_url);
  });

  // Process Collections
  await processCollection('artist', 'image', imageMap);
  await processCollection('shop', 'image', imageMap);
  await processCollection('event', 'imageSrc', imageMap);
  await processCollection('heroImages', 'imageUrl', imageMap);

  console.log('Processing completed.');
};

// Run the main function
processDocuments()
  .catch((error) => {
    console.error('Error processing documents:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
