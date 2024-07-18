
import React from 'react'
import './App.css'
import '@fontsource/roboto/300.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import TopBar from './layout/topbar/index'
import Footer from './layout/footer/index'
import Galery from './layout/content/galery/index'


const Theme = createTheme({
  palette: {
    mode: 'light',
  },
})

const App: React.FC = () => {

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <div className="App">
        <div className="main">
          <div className='background'></div>
          <TopBar />
          <Galery />
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  )
}
export default App

