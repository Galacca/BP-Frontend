import { CSSReset } from '@chakra-ui/css-reset'
import { ThemeProvider } from '@chakra-ui/system'
import React from 'react'
import theme from '../theme'

function MyApp({ Component, pageProps }: any) {
  return (
   <ThemeProvider theme={theme}>
     <CSSReset />
     <Component {...pageProps} />
   </ThemeProvider>
  )
}

export default MyApp
