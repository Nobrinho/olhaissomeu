import React from 'react'
import logo from './assets/brand.svg'
import { Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import TranslateIcon from '@mui/icons-material/Translate'


const openLink = () => {
  window.open('https://www.instagram.com/olhaissomeu.brasil?igsh=MXd0cHhzeDZoMTAwMg==', '_blank')
}

const TopBar = () => {
  return (
    <div>
      <div className="topBar">
        <div>
          <div>
            <img src={logo} alt="logo" height={50} />
          </div>
          <a href="/">Onde estamos</a>
          <a href="/">Sobre nós</a>
          <a href="/">Eventos</a>
          <button onClick={openLink} style={{ display: 'flex', alignItems: 'center' }} className='button'>
            <InstagramIcon sx={{ color: 'white', marginRight: '10px' }} />
            <Typography variant="h6" color={'white'}>Conheça nosso instagram</Typography>
          </button>
          <button onClick={openLink} style={{ display: 'flex', alignItems: 'center' }} className='button'>
            <TranslateIcon sx={{ color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TopBar
