import React from 'react'
import logo from '../../assets/brand.svg'
import { Typography } from '@mui/material'
import InstagramIcon from '@mui/icons-material/Instagram'
import TranslateIcon from '@mui/icons-material/Translate'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InfoIcon from '@mui/icons-material/Info';
import CelebrationIcon from '@mui/icons-material/Celebration'
import FmdGoodIcon from '@mui/icons-material/FmdGood';;

const openLink = () => {
  window.open('https://www.instagram.com/olhaissomeu.brasil?igsh=MXd0cHhzeDZoMTAwMg==', '_blank')


}
const TopBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div>
      <div className="topBar">
        <div>
          <div className='logo'>
            <img src={logo} alt="logo" height={50} />
          </div>
          <div className='desktopMenu'>
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
          <div className='hamburguer'>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><FmdGoodIcon/> Onde Estamos</MenuItem>
              <MenuItem onClick={handleClose}><CelebrationIcon/> Eventos</MenuItem>
              <MenuItem onClick={handleClose}><InfoIcon/> Sobre</MenuItem>
              <MenuItem onClick={openLink}><InstagramIcon/>Instagram</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
