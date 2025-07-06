import { useState, useCallback, useEffect, useMemo } from 'react'
import { Box, Skeleton } from '@mui/material'
import { FALLBACK_IMAGES } from '../../../utils/placeholderImages'

// Default fallback images using generated placeholders
const DEFAULT_FALLBACKS = FALLBACK_IMAGES

interface FallbackImageProps {
  src: string
  alt: string
  fallbackType?: keyof typeof DEFAULT_FALLBACKS
  customFallback?: string
  width?: string | number
  height?: string | number
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
  borderRadius?: string | number
  loading?: 'lazy' | 'eager'
  className?: string
  style?: React.CSSProperties
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  fallbackType = 'travel',
  customFallback,
  width = '100%',
  height = 'auto',
  objectFit = 'cover',
  borderRadius = 0,
  loading = 'eager',
  className,
  style,
  onLoad,
  onError,
}) => {
  const fallbackSrc = customFallback || DEFAULT_FALLBACKS[fallbackType] || DEFAULT_FALLBACKS.travel
  
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc)
  const [isLoading, setIsLoading] = useState(!!src)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("🚀 ~ Image loaded successfully")
    setIsLoading(false)
    setHasError(false)
    onLoad?.(event)
  }, [onLoad])

  const handleError = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
    const imgSrc = (event.target as HTMLImageElement).src
    console.log("🚀 ~ Image error for src:", imgSrc)
    
    // If the failed image is not the fallback, switch to fallback
    if (imgSrc !== fallbackSrc) {
      console.log("🚀 ~ Switching to fallback:", fallbackSrc)
      setCurrentSrc(fallbackSrc)
      setIsLoading(false)
      setHasError(false)
    } else {
      // Fallback also failed, stop loading
      console.log("🚀 ~ Fallback also failed")
      setIsLoading(false)
      setHasError(true)
    }
    onError?.(event)
  }, [fallbackSrc, onError])


  const imageStyle: React.CSSProperties = {
    width,
    height,
    objectFit,
    borderRadius,
    display: isLoading ? 'none' : 'block',
    ...style,
  }

  const containerStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    position: 'relative',
    overflow: 'hidden',
  }

  if (hasError && currentSrc === fallbackSrc) {
    return (
      <Box
        style={{
          ...containerStyle,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '0.875rem',
        }}
        className={className}
      >
        Image not available
      </Box>
    )
  }

  return (
    <Box style={containerStyle} className={className}>
      {isLoading && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          style={{
            borderRadius,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={loading}
        style={imageStyle}
        onLoad={handleLoad}
        onError={handleError}
      />
    </Box>
  )
}

// Hook for background image with fallback
export const useBackgroundImageWithFallback = (
  src: string | undefined,
  fallbackType?: keyof typeof DEFAULT_FALLBACKS,
  customFallback?: string
) => {
  const [currentSrc, setCurrentSrc] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  const fallbackSrc = useMemo(() => 
    customFallback || DEFAULT_FALLBACKS[fallbackType || 'travel'],
    [customFallback, fallbackType]
  )

  useEffect(() => {
    // If no source, use fallback immediately
    if (!src) {
      setCurrentSrc(fallbackSrc)
      setIsLoading(false)
      return
    }

    // Reset state for new image
    setIsLoading(true)
    
    // Create and load image
    const img = new Image()
    
    img.onload = () => {
      setCurrentSrc(src)
      setIsLoading(false)
    }
    
    img.onerror = () => {
      setCurrentSrc(fallbackSrc)
      setIsLoading(false)
    }
    
    img.src = src

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src, fallbackSrc])

  return { imageSrc: currentSrc, isLoading }
}