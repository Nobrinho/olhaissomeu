import React from 'react'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import olhaissmomeulogo2 from '../../assets/olhaissomeulogo2.svg'

const Footer = () => {
  return (
    <div className='footer'>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent:'center', padding: "5px 50px 0px 50px"}}>
          <Typography variant="h6" sx={{ color: 'white' }}>© 2024 - Todos oss direitos reservados - OlhaIssoMeu. Clique ao lado e saiba mais</Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{ background: "white", padding: "5px 70px 0px 70px", borderRadius: "22px", margin: '20px' }}>
            <img src={olhaissmomeulogo2} alt="olha-isso-meu-logo" width={'200px'} />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
export default Footer
