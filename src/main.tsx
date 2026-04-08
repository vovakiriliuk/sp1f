import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider,createTheme, type MantineColorsTuple } from '@mantine/core'

const colors: MantineColorsTuple = [
  '#f0f0f0', '#ffffff', '#cce7c9','#e4e4e4',
   '#ff2c2c','#0077b6', '#c8d349','#5bb540','#999da0' , '#000000'
]

const theme = createTheme({
      fontFamily: 'Monserrat',

      headings : {
        sizes : {
          h4 : {
            fontSize: '20px',
            fontWeight: '600',
          }
        },
      },

      spacing : {
        'md': '1rem',
        'xl': '3rem'
      },

      colors : {
        'custom-theme': colors,
      },
      primaryColor: 'custom-theme'
  })

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme} defaultColorScheme='dark'>
  <StrictMode>
    <App />
  </StrictMode>
  </MantineProvider>
  ,
)
