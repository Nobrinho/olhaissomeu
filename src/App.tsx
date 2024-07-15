
import React, { useEffect, useState } from 'react'
import './App.css'
import logo from './assets/logop.png'
import '@fontsource/roboto/300.css'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
/* import ShareIcon from '@mui/icons-material/Share' */
import FileDownloadIcon from '@mui/icons-material/FileDownload'
/* import FavoriteIcon from '@mui/icons-material/Favorite' */
import axios from 'axios'
import { CardContent, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import banner from './assets/banner.png'
import banner2 from './assets/banner2.png'
import banner3 from './assets/banner3.png'
import fbLogo from './assets/fb.svg'
import instaLogo from './assets/insta.png'
import MobileStepper from '@mui/material/MobileStepper'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import 'dayjs/locale/pt-br'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import SearchIcon from '@mui/icons-material/Search'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: banner,
  },
  {
    label: 'Bird',
    imgPath: banner2,
  },
  {
    label: 'Bali, Indonesia',
    imgPath: banner3,
  },
];

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
  const openFB = () => {
    window.open('https://www.facebook.com/profile.php?id=100090064226997&mibextid=ZbWKwL', '_blank')
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
      const day = (date.getDate()-1).toString().padStart(2, '0')
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

  const theme = useTheme()
  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = images.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStepChange = (step: number) => {
    setActiveStep(step)
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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <div className="main">
          <Grid container className="topBar">
            <Grid item>
              <img width={95} src={logo} alt="logo" />
            </Grid>
            <div className="socials">
              <Button variant='contained' style={{ backgroundColor: '#4272F7', color: 'white', width: '122px' }}>home</Button>
              <Button style={{ marginRight: '20px' }}>informaçöes</Button>
              <img src={fbLogo} alt="fb" min-width={20} width={30} onClick={openFB} />
              <img src={instaLogo} alt="insta" min-width={20} width={30} onClick={openLink} />
            </div>
          </Grid>
          <div className="slider">
            <Box sx={{ width: '100%', flexGrow: 1, bgcolor: 'black' }}>
              <AutoPlaySwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {images.map((step, index) => (
                  <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          maxHeight: 450,
                          display: 'block',
                          width: '100%',
                          overflow: 'hidden',
                          backgroundSize: 'cover',

                        }}
                        src={step.imgPath}
                      />
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              {
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="large"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >

                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}

                    </Button>
                  }
                />}
            </Box>
          </div>
          <div className="searchBar">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Item>
                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold' }}>Vídeos das Quadras</Typography>
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
              <Grid item xs={12} sm={3}>
                <Card sx={{
                  width: '300px'
                }}>
                  <img src={logo} alt="" width={230} />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} sx={{
                textAlign: 'justify',
                padding: '0px 20px 0px 20px',
              }}>
                <Typography variant="h6" sx={{ color: 'white' }}>Olha Isso Meu</Typography>
                <Typography variant="h6" sx={{ color: 'white' }}>"consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim venia."</Typography>
              </Grid>
              <Grid item xs={12} sm={3} sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <img src={fbLogo} alt="fb" min-width={20} width={60} onClick={openFB} />
                <img src={instaLogo} alt="insta" min-width={20} width={60} onClick={openLink} />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
export default App

