
import React from 'react'
import './App.css'
import '@fontsource/roboto/300.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import TopBar from './layout/topbar/index'
import Footer from './layout/footer/index'
import Galery from './layout/content/galery/index'
import zapIcon from './assets/zap-icon.svg'


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
          <div className='background' />
          <TopBar />
          <Galery />
          <Footer />
          <img src={zapIcon} alt="zapicon" className='zapButton' />
        </div>
      </div>

    </ThemeProvider>
  )
}
export default App

