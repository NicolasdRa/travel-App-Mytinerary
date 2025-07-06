// Utility to generate SVG landscape placeholder images as data URIs
export const generateLandscapePlaceholder = (
  width: number = 400,
  height: number = 300,
  type: string = 'landscape',
  primaryColor: string = '#4A90E2',
  secondaryColor: string = '#87CEEB'
): string => {
  const svg = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
      <!-- Sky gradient -->
      <defs>
        <linearGradient id="skyGradient_${type}" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:${secondaryColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${primaryColor};stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Sky background -->
      <rect width="100%" height="100%" fill="url(#skyGradient_${type})"/>
      
      <!-- Mountains -->
      <polygon points="0,200 100,120 200,160 300,100 400,140 400,300 0,300" fill="#2C3E50" opacity="0.8"/>
      <polygon points="50,220 150,140 250,180 350,120 400,160 400,300 0,300" fill="#34495E" opacity="0.6"/>
      
      <!-- Sun -->
      <circle cx="320" cy="80" r="25" fill="#FFD700" opacity="0.9"/>
      
      <!-- Clouds -->
      <ellipse cx="100" cy="60" rx="25" ry="15" fill="white" opacity="0.7"/>
      <ellipse cx="120" cy="55" rx="30" ry="18" fill="white" opacity="0.7"/>
      <ellipse cx="140" cy="60" rx="20" ry="12" fill="white" opacity="0.7"/>
      
      <ellipse cx="280" cy="45" rx="20" ry="12" fill="white" opacity="0.6"/>
      <ellipse cx="295" cy="40" rx="25" ry="15" fill="white" opacity="0.6"/>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

// Utility to generate simple SVG placeholder images as data URIs
export const generatePlaceholderImage = (
  width: number = 400,
  height: number = 300,
  text: string = 'Image',
  backgroundColor: string = '#f0f0f0',
  textColor: string = '#666'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
            font-family="Arial, sans-serif" font-size="16" fill="${textColor}">
        ${text}
      </text>
    </svg>
  `
  return `data:image/svg+xml;base64,${btoa(svg)}`
}

// Pre-generated placeholder images for different types
export const PLACEHOLDER_IMAGES = {
  city: generateLandscapePlaceholder(400, 300, 'city', '#1976d2', '#e3f2fd'),
  travel: generateLandscapePlaceholder(400, 300, 'travel', '#7b1fa2', '#f3e5f5'),
  activity: generateLandscapePlaceholder(400, 300, 'activity', '#388e3c', '#e8f5e8'),
  hero: generateLandscapePlaceholder(800, 400, 'hero', '#f57c00', '#fff3e0'),
  user: generatePlaceholderImage(150, 150, 'User', '#fce4ec', '#c2185b'),
  itinerary: generateLandscapePlaceholder(400, 300, 'itinerary', '#689f38', '#f1f8e9'),
}

// Fallback image URLs (these would be actual image files in production)
export const FALLBACK_IMAGES = {
  city: PLACEHOLDER_IMAGES.city,
  travel: PLACEHOLDER_IMAGES.travel,
  activity: PLACEHOLDER_IMAGES.activity,
  hero: PLACEHOLDER_IMAGES.hero,
  user: PLACEHOLDER_IMAGES.user,
  itinerary: PLACEHOLDER_IMAGES.itinerary,
}