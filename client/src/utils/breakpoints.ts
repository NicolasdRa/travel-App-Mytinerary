import { useMediaQuery } from '@mui/material'
import { theme } from '../theme/Theme'

// Standardized breakpoint hooks for consistent usage across components
export const useResponsiveBreakpoints = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md')) // 0-959px
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')) // 960-1279px  
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')) // 960px+
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg')) // 1280px+
  const isExtraLarge = useMediaQuery(theme.breakpoints.up('xl')) // 1920px+

  return {
    isMobile,      // Show mobile menu, bottom nav
    isTablet,      // Tablet-specific adjustments
    isDesktop,     // Show desktop menu, hide bottom nav
    isLargeDesktop, // Large screen optimizations
    isExtraLarge,  // Extra large screen optimizations
  }
}

// Navigation-specific breakpoint logic
export const useNavigationBreakpoints = () => {
  const { isMobile, isDesktop } = useResponsiveBreakpoints()
  
  return {
    showMobileMenu: isMobile,
    showDesktopMenu: isDesktop,
    showBottomNav: isMobile,
    showFooter: isDesktop,
  }
}

// Hero component breakpoint logic  
export const useHeroBreakpoints = () => {
  const { isMobile, isDesktop, isLargeDesktop } = useResponsiveBreakpoints()
  
  return {
    useOutlinedButton: isDesktop, // HeroLanding button style
    showLoginButtons: isMobile,   // Show login/signup on mobile
    useCompactLayout: isMobile,   // Compact hero layout
    useFullLayout: isLargeDesktop, // Full hero layout
  }
}

// Standardized breakpoint values for consistent usage
// Note: These match the theme breakpoints defined in Theme.ts
export const BREAKPOINT_VALUES = {
  xs: 0,
  sm: 600,
  md: 960,  // Main mobile/desktop breakpoint
  lg: 1280,
  xl: 1920,
} as const

// Raw media query strings for use in styled-components when theme is not available
export const MEDIA_QUERIES = {
  xs: '@media (min-width: 0px)',
  sm: '@media (min-width: 600px)',
  md: '@media (min-width: 960px)',
  lg: '@media (min-width: 1280px)',
  xl: '@media (min-width: 1920px)',
  smDown: '@media (max-width: 599px)',
  mdDown: '@media (max-width: 959px)',
  lgDown: '@media (max-width: 1279px)',
  xlDown: '@media (max-width: 1919px)',
} as const

// Helper functions for manual breakpoint checks
export const isAboveBreakpoint = (width: number, breakpoint: keyof typeof BREAKPOINT_VALUES): boolean => {
  return width >= BREAKPOINT_VALUES[breakpoint]
}

export const isBelowBreakpoint = (width: number, breakpoint: keyof typeof BREAKPOINT_VALUES): boolean => {
  return width < BREAKPOINT_VALUES[breakpoint]
}