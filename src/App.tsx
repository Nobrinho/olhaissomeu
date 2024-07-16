
import React, { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/brand.svg'
import thumb from './assets/thumb.jpeg'
import thumb2 from './assets/thumb2.jpeg'
import thumb3 from './assets/thumb3.jpeg'
import thumb4 from './assets/thumb4.jpeg'

import olhaissmomeulogo2 from './assets/olhaissomeulogo2.svg'
import '@fontsource/roboto/300.css'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import axios from 'axios'
import { CardContent, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import 'dayjs/locale/pt-br'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import SearchIcon from '@mui/icons-material/Search'
import InstagramIcon from '@mui/icons-material/Instagram';
import TranslateIcon from '@mui/icons-material/Translate';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';


const Theme = createTheme({
  palette: {
    mode: 'light',
  },
});

const reels = [
  {
    img: thumb,
  },
  {
    img: thumb2,
  },
  {
    img: thumb3,
  },
  {
    img: thumb4,
  },
]


type Video = {
  created_at: string;
  filename: string;
  id: number;
  spot_id: string;
  url: string;
  time: string;
};

const downloadVideo = (url: string, filename: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const baseUrl = 'https://olhaissomeu.com.br/api/videobyspot?spot_id=13'

const App: React.FC = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null as any)
  const [selectedStartTime, setSelectedStartTime] = useState(null as any)
  const [selectedEndDate, setSelectedEndDate] = useState(null as any)
  const [selectedEndTime, setSelectedEndTime] = useState(null as any)
  const handleStartDateChange = (newValue: any) => {
    setSelectedStartDate(newValue)
  }
  const handleStartTimeChange = (newValue: any) => {
    setSelectedStartTime(newValue)
  }
  const handleEndDateChange = (newValue: any) => {
    setSelectedEndDate(newValue)
  }
  const handleEndTimeChange = (newValue: any) => {
    setSelectedEndTime(newValue)
  }
  const openLink = () => {
    window.open('https://www.instagram.com/olhaissomeu.brasil?igsh=MXd0cHhzeDZoMTAwMg==', '_blank')
  }
  const token = '$10$gqUEvTBQY9zSFzjqjMSzi.Y6mmz2i94/vF/mFP3uZuUqYHR9Cia5i'
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl, {
          headers: { 'x-access-token': token }
        })

        const videosWithUrl = response.data.data.map((video: Video) => {
          const date = new Date(video.created_at)
          const formattedDate = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })
          const time = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })
          return {
            ...video,
            url: `https://olhaissomeu.com.br/stream/${video.filename.split('.')[0]}`,
            created_at: formattedDate,
            time: time,
          }
        })
        setVideos(videosWithUrl)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [token])

  async function fetchVideoBySpot(spot_id: number, page: number, per_page: number, start_date: string, start_time: string, end_date: string, end_time: string): Promise<any> {
    const convertDateAndTimeToYYYYMMDDHHMMSS = (dateString: string, isoTimeString: string) => {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = (date.getDate() - 1).toString().padStart(2, '0')
      const time = new Date(isoTimeString)
      const hours = time.getUTCHours().toString().padStart(2, '0')
      const minutes = time.getUTCMinutes().toString().padStart(2, '0')
      const seconds = '00'
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
    const correctedStartDate = encodeURIComponent(convertDateAndTimeToYYYYMMDDHHMMSS(start_date, start_time))
    const correctedEndDate = encodeURIComponent(convertDateAndTimeToYYYYMMDDHHMMSS(end_date, end_time))
    const baseUrl = 'https://olhaissomeu.com.br/api/videobyspot'
    const url = `${baseUrl}?spot_id=${spot_id}&page=${page}&per_page=${per_page}&start_date=${correctedStartDate}&end_date=${correctedEndDate}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        }
      })
      const responseData = await response.json()
      const videosWithUrl = responseData.data.map((video: Video) => {
        const date = new Date(video.created_at)
        const formattedDate = date.toLocaleString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
        const time = date.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        })
        return {
          ...video,
          url: `https://olhaissomeu.com.br/stream/${video.filename.split('.')[0]}`,
          created_at: formattedDate,
          time: time,
        }
      })
      setVideos(videosWithUrl)
    } catch (error) {
      console.error('Failed to fetch data:', error)
      throw error
    }
  }


  const handleVideoClick = (videoElement: HTMLVideoElement) => {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen().then(() => {
        videoElement.play()
      }).catch(err => {
        console.error(err)
      })
    }
  }

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <div className="App">
        <div className="main">
          <div className="topBar">
            <div>
              <div>
                <img src={logo} alt="logo" height={50} />
              </div>
              <a href="/">Onde estamos</a>
              <a href="/">Sobre nós</a>
              <a href="/">Eventos</a>
              <div onClick={openLink} style={{ display: 'flex', alignItems: 'center' }} className='button'>
                <InstagramIcon sx={{ color: 'white', marginRight: '10px' }} />
                <Typography variant="h6" color={'white'}>Conheça nosso instagram</Typography>
              </div>
              <div onClick={openLink} style={{ display: 'flex', alignItems: 'center' }} className='button'>
                <TranslateIcon sx={{ color: 'white' }} />
              </div>
            </div>
          </div>
          <div className="slider">
            <div className='background'>
              <div style={{
                height: '30vh',
                width: '100%',
                padding: '0 5%',
              }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left', paddingTop: '8.5vh' }}>
                  Compartilhe os seus melhores momentos <br /> com a Arena BT Sports
                  <br />
                  <br />
                  <p style={{
                    width: '350px',
                    textShadow: '0px 0px 10px rgba(0, 0, 0, 0.9)',
                    fontSize: '1.2rem',
                    fontWeight: 'normal',
                  }}>Registre e compartilhe momentos inesqueciveis com as pessoas e redes sociais!</p>
                  <br />
                  <div onClick={openLink} style={{ display: 'flex', alignItems: 'center', width: '293px' }} className='button'>
                    <PlayCircleOutlineIcon sx={{ color: 'white', marginRight: '20px' }} />
                    <Typography variant="h6" fontWeight={'bold'} color={'white'}>Assistir meus videos</Typography>
                  </div>
                </Typography>
              </div>

            </div>
            <div >
              <Grid container spacing={2} className='cardGroup'>
                {reels.map((real) => (
                  <Grid item xs={6} sm={3} style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <Card key={real.img} style={{ margin: '10px' }} className='card'>
                      <img src={real.img} alt="reels" />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
          <div className="searchBar">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Vídeos das Quadras</Typography>
                </Item>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Item>
                  <Grid container>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <MobileDatePicker
                          label="Data"
                          value={selectedStartDate}
                          onChange={handleStartDateChange}
                          sx={{ width: '95%' }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <MobileTimePicker
                          label="Hora Início"
                          value={selectedStartTime}
                          onChange={handleStartTimeChange}
                          sx={{ width: '95%' }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={0}></Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <MobileDatePicker
                          label="Data Final"
                          value={selectedEndDate}
                          onChange={handleEndDateChange}
                          sx={{ width: '95%' }}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <MobileTimePicker
                          label="Hora Início"
                          value={selectedEndTime}
                          onChange={handleEndTimeChange}
                          sx={{ width: '95%' }}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Item
                  sx={
                    {
                      display: 'flex',
                      justifyContent: 'end',
                      height: '100%',
                      alignItems: 'center',
                    }
                  }>
                  <Button
                    sx={{ color: 'white', backgroundColor: '#4272F7' }}
                    startIcon={<SearchIcon />}
                    variant="contained"
                    onClick={() => fetchVideoBySpot(13, 1, 20, selectedStartDate, selectedStartTime, selectedEndDate, selectedEndTime)}
                  > Buscar</Button>
                </Item>
              </Grid>
            </Grid>
          </div>
          <div className="gallery">
            <Grid container spacing={2}>
              {videos.map((video: Video) => (
                <Grid item xs={12} sm={4} lg={2} key={video.id}>
                  <Item>
                    <Card
                      sx={{
                        minHeight: '300px',
                      }}
                    >
                      <video
                        style={{ width: '100%' }}
                        onClick={(e) => handleVideoClick(e.currentTarget)}
                      >
                        <source
                          src={video.url}
                          type="video/mp4"
                        />
                      </video>
                      <CardContent sx={{
                        padding: '0 16px 0 16px',
                      }}>
                        <Typography gutterBottom variant="h6" component="div">
                          Quadra {video.spot_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                          <span>{video.created_at}</span>
                          <span> {video.time}</span>
                        </Typography>
                      </CardContent>
                      <CardActions sx={
                        {
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0 16px 10px 16px',
                        }
                      }>
                        <IconButton aria-label="add to favorites" size='small'>
                          {/*    <FavoriteIcon /> */}
                        </IconButton>
                        {<div>
                          <IconButton aria-label="share" size='small'>
                            {/*    <ShareIcon /> */}
                          </IconButton>
                          <IconButton aria-label="download" onClick={() => downloadVideo(video.url, video.filename)} size='small'>
                            <FileDownloadIcon />
                          </IconButton>
                        </div>}
                      </CardActions>
                    </Card>
                  </Item>
                </Grid>
              ))}
            </Grid>
          </div>
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
        </div>
      </div>
    </ThemeProvider>
  )
}
export default App

