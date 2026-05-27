/**
 * Format price to INR currency with rupee symbol
 * @param {number} price - Price in rupees
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  if (!price) return '₹ 0';
  return `₹ ${price.toLocaleString('en-IN')}`;
};

/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date and time
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date and time
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} Discount percentage
 */
export const calculateDiscount = (originalPrice, discountedPrice) => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Check if product is in wishlist
 * @param {array} wishlist - Wishlist items
 * @param {number} productId - Product ID
 * @returns {boolean} Is in wishlist
 */
export const isInWishlist = (wishlist, productId) => {
  return wishlist.some((item) => item.id === productId);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Slug from title for URLs
 * @param {string} title - Title to slugify
 * @returns {string} Slug
 */
export const slugify = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

/**
 * Round rating to 1 decimal place
 * @param {number} rating - Rating value
 * @returns {number} Rounded rating
 */
export const roundRating = (rating) => {
  return Math.round(rating * 10) / 10;
};
