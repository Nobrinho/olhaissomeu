import React, { useEffect, useState } from 'react'
import { CardContent, Typography } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Item from '@mui/material/Grid'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import Card from '@mui/material/Card'
import axios from 'axios'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/pt-br'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import Avatar from '@mui/material/Avatar';
import ShareIcon from '@mui/icons-material/Share';
import thumb from '../../../assets/thumb.jpeg'
import thumb2 from '../../../assets/thumb2.jpeg'
import thumb3 from '../../../assets/thumb3.jpeg'
import thumb4 from '../../../assets/thumb5.jpeg'


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
] as any
type Video = {
  created_at: string;
  filename: string;
  id: number;
  spot_id: string;
  url: string;
  time: string;
}

const downloadVideo = (url: string, filename: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const baseUrl = 'https://olhaissomeu.com.br/api/videobyspot?spot_id=13'

const Galery = () => {
  const token = '$10$gqUEvTBQY9zSFzjqjMSzi.Y6mmz2i94/vF/mFP3uZuUqYHR9Cia5i'
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedStartDate, setSelectedStartDate] = useState(null as any)
  const [selectedStartTime, setSelectedStartTime] = useState(null as any)
  const [selectedEndTime, setSelectedEndTime] = useState(null as any)
  const handleStartDateChange = (newValue: any) => {
    setSelectedStartDate(newValue)
  }
  const handleStartTimeChange = (newValue: any) => {
    setSelectedStartTime(newValue)
  }
  const handleEndTimeChange = (newValue: any) => {
    setSelectedEndTime(newValue)
  }

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

  async function fetchVideoBySpot(spot_id: number, page: number, per_page: number, start_date: string, start_time: string, end_time: string): Promise<any> {
    const convertDateAndTimeToYYYYMMDDHHMMSS = (dateString: string, isoTimeString: string) => {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0') // Corrigido aqui
      const time = new Date(isoTimeString)
      const hours = time.getHours().toString().padStart(2, '0') // Mudança potencial aqui para getHours() se você quiser a hora local
      const minutes = time.getMinutes().toString().padStart(2, '0') // Mudança potencial aqui para getMinutes() se você quiser os minutos locais
      const seconds = '00'
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }
    const correctedStartDate = encodeURIComponent(convertDateAndTimeToYYYYMMDDHHMMSS(start_date, start_time))
    const correctedEndDate = encodeURIComponent(convertDateAndTimeToYYYYMMDDHHMMSS(start_date, end_time))

    console.log(correctedStartDate, correctedEndDate);
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
    console.log('Video clicked:', videoElement);
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen().then(() => {
        videoElement.play()
      }).catch(err => {
        console.error(err)
      })
    }
  }

  const shareInfo = (videoUrl: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Compartilhe nas redes sociais',
        text: 'OLHA ISSO MEU!',
        url: `/play/${videoUrl}`
      })
        .then(() => console.log('Compartilhamento bem-sucedido!'))
        .catch((error) => console.log('Erro ao compartilhar:', error));
    } else {
      window.open(`https://api.whatsapp.com/send?text=Confira este conteúdo incrível! /play/${videoUrl}`, '_blank');
    }
  };
  const scrollToTarget = () => {
    const target = document.getElementById('galleryTarget');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  return (
    <div className='box-galery'>
      <div className="slider">
        <div>
          <div className='header-text'>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', textAlign: 'left', paddingTop: '15vh' }}>
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
              <button onClick={() => { scrollToTarget()}} style={{ display: 'flex', alignItems: 'center', width: '293px' }} className='button'>
                <PlayCircleOutlineIcon sx={{ color: 'white', marginRight: '20px' }} />
                <Typography variant="h6" fontWeight={'bold'} color={'white'}>Assistir meus videos</Typography>
              </button>
            </Typography>
          </div>
        </div>
        <div className='box-reel'>
          {reels.map((item: any) => (
            <div key={item.img} className='reel-container'>
              <img
                src={item.img}
                alt={item.img}
                className='reel'
              />
              <PlayCircleOutlineIcon className='icon' />
            </div>
          ))}
        </div>
      </div>
      <div className="searchBar" id="galleryTarget">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Acesse seus vídeos com filtros personalizados</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '0.99rem' }}>Registre e compartilhe momentos inesquecíves com os seus amigos e redes sociais. Não esqueça das <span style={{ fontWeight: '1000' }}> HASHTAGS!</span></Typography>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item>
              <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={4} sm={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <MobileDatePicker
                      label="Data"
                      value={selectedStartDate}
                      onChange={handleStartDateChange}
                      sx={{ width: '100%', borderRadius: '20px', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '20px' } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <MobileTimePicker
                      label="Hora Início"
                      value={selectedStartTime}
                      onChange={handleStartTimeChange}
                      sx={{ width: '100%', borderRadius: '20px', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '20px' } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4} sm={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                    <MobileTimePicker
                      label="Hora final"
                      value={selectedEndTime}
                      onChange={handleEndTimeChange}
                      sx={{ width: '100%', borderRadius: '20px', '& .MuiOutlinedInput-notchedOutline': { borderRadius: '20px' } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Item>
                    <Button
                      sx={{ borderRadius: '20px' }}
                      fullWidth
                      className='button'
                      startIcon={<SearchIcon />}
                      variant="contained"
                      onClick={() => fetchVideoBySpot(13, 1, 12, selectedStartDate, selectedStartTime, selectedEndTime)}
                    > Buscar</Button>
                  </Item>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </div>
      <div className="gallery" >
        <Grid container spacing={2}>
          {videos.map((video: Video) => (
            <Grid item xs={12} sm={6} lg={3} key={video.id}>
              <Item>
                <Card
                  sx={{
                    minHeight: '300px',
                    borderRadius: '20px',
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
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <Typography variant="body2" color="primary" sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 'bold',
                      fontSize: '1rem',
                      marginBottom: '30px',
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
                    <div className='avatarContainer'>
                      <Avatar sx={{ width: 30, height: 30 }}> <p style={{ fontSize: '15px' }}>BT</p> </Avatar>
                      <p>Arena BT</p>
                    </div>
                    {<div>
                      <IconButton aria-label="share" size='small'>
                        <ShareIcon color='primary' onClick={() => { shareInfo(video.filename.split('.')[0]) }} />
                      </IconButton>
                      <IconButton aria-label="download" onClick={() => downloadVideo(video.url, video.filename)} size='small'>
                        <FileDownloadIcon color='primary' />
                      </IconButton>
                    </div>}
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Galery
