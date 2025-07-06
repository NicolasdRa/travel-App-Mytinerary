import { Box, Skeleton } from '@mui/material'

interface PageSkeletonProps {
  variant?: 'landing' | 'listing' | 'detail' | 'profile'
}

export const PageSkeleton: React.FC<PageSkeletonProps> = ({ variant = 'listing' }) => {
  if (variant === 'landing') {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        {/* Hero section skeleton */}
        <Skeleton variant="rectangular" height={300} sx={{ mb: 2 }} />
        
        {/* Content sections */}
        <Box sx={{ px: 2, maxWidth: '1200px', mx: 'auto' }}>
          <Skeleton variant="text" height={60} width="40%" sx={{ mb: 2 }} />
          <Skeleton variant="text" height={24} width="60%" sx={{ mb: 4 }} />
          
          {/* Cards grid skeleton */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2 }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Box key={index}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '10px 10px 0 0' }} />
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="text" height={20} width="80%" />
                  <Skeleton variant="text" height={16} width="60%" />
                  <Skeleton variant="text" height={16} width="40%" />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    )
  }

  if (variant === 'detail') {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh' }}>
        {/* Header image */}
        <Skeleton variant="rectangular" height={250} sx={{ mb: 2 }} />
        
        {/* Content */}
        <Box sx={{ px: 2, maxWidth: '800px', mx: 'auto' }}>
          <Skeleton variant="text" height={48} width="70%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={24} width="50%" sx={{ mb: 3 }} />
          
          {/* Description paragraphs */}
          <Skeleton variant="text" height={20} width="100%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} width="95%" sx={{ mb: 1 }} />
          <Skeleton variant="text" height={20} width="80%" sx={{ mb: 3 }} />
          
          {/* Additional content blocks */}
          <Skeleton variant="rectangular" height={150} sx={{ mb: 2, borderRadius: 1 }} />
          <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
    )
  }

  if (variant === 'profile') {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', px: 2 }}>
        {/* Profile header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pt: 2 }}>
          <Skeleton variant="circular" width={80} height={80} sx={{ mr: 2 }} />
          <Box>
            <Skeleton variant="text" height={32} width={200} />
            <Skeleton variant="text" height={20} width={150} />
          </Box>
        </Box>
        
        {/* Content sections */}
        <Skeleton variant="text" height={40} width="30%" sx={{ mb: 2 }} />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2 }}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Box key={index}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '10px 10px 0 0' }} />
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" height={20} width="80%" />
                <Skeleton variant="text" height={16} width="60%" />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    )
  }

  // Default listing skeleton
  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      {/* Header */}
      <Skeleton variant="rectangular" height={200} sx={{ mb: 3 }} />
      
      {/* Content */}
      <Box sx={{ px: 2, maxWidth: '1200px', mx: 'auto' }}>
        <Skeleton variant="text" height={48} width="40%" sx={{ mb: 3 }} />
        
        {/* Grid of cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 2 }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Box key={index}>
              <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '10px 10px 0 0' }} />
              <Box sx={{ p: 2 }}>
                <Skeleton variant="text" height={20} width="80%" />
                <Skeleton variant="text" height={16} width="60%" />
                <Skeleton variant="text" height={16} width="40%" />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}