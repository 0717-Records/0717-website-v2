export const supportedExtensions = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'gif', 'svg'];

const isSupportedImageURL = (url: string): boolean => {
  const pattern = new RegExp(`\\.(${supportedExtensions.join('|')})$`, 'i');
  return pattern.test(url);
};

export default isSupportedImageURL;
