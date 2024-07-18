import React from 'react'
import Grid from '@mui/material/Grid'
import {Typography } from '@mui/material'
import olhaissmomeulogo2 from './assets/olhaissomeulogo2.svg'

const Footer = () => {
  return (
    <div className='footer'>
            <Grid container>
              <Grid item xs={12} sm={12} sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '100px',
                alignItems: 'center',
                padding: '10px',
              }}>
                <Typography variant="h6" sx={{ color: 'white' }}>© 2024 - Todos os direitos reservados - OlhaIssoMeu. Clique ao lado e saiba mais</Typography>
                <div style={{ background: "white", padding: "5px 70px 0px 70px", borderRadius: "22px" }}>
                  <img src={olhaissmomeulogo2} alt="olha-isso-meu-logo" height={40} />
                </div>
              </Grid>
            </Grid>
          </div>
  )
}

export default Footer
