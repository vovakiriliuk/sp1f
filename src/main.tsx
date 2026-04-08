import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { MantineProvider,createTheme, type MantineColorsTuple } from '@mantine/core'

const colors: MantineColorsTuple = [
  '#f0f0f0', '#000000', '#e4e4e4', '#5bb540', '#cce7c9',
  '#0077b6', '#03045e', '#ff2c2c', '#808588', '#999da0'
]

const theme = createTheme({
      fontFamily: 'Monserrat',

      headings : {
        sizes : {
          h4 : {
            fontSize: '20px',
            fontWeight: '600'
          }
        }
      },

      spacing : {
        'md': '1rem',
        'xl': '3rem'
      },

      colors : {
        'custom-theme': colors
      },
      primaryColor: 'custom-theme'
  })

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
  <StrictMode>
    <App />
  </StrictMode>
  </MantineProvider>
  ,
)
