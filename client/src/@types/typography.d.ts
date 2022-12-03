import '@mui/material/Typography'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    byline: React.CSSProperties
    topNavTab: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    byline?: React.CSSProperties
    topNavTab?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    byline: true
    topNavTab: true
  }
}
