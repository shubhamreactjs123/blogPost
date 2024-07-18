import { Box, Button, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import { convertDate } from '../utils/blogPostUtils'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { useNavigate } from 'react-router-dom';
import LazyLoadImageComponent from './LazyLoadImage';
import imagePlaceHolder from '../assets/imagePlaceHolder.png'

const BlogPostDetails = () => {
  const blogPostData = localStorage.getItem('blogPostItem') && JSON.parse(localStorage.getItem('blogPostItem'))
  const publishedDate = convertDate(blogPostData.publishedAt)
  const navigate = useNavigate();
  return (
    <Container sx={{ py: 3 }}>
      <Typography variant='h5'>{blogPostData.title}</Typography>
      <Paper sx={{ p: 3, mt: 2 }}>
        <Box >
          <LazyLoadImageComponent
            src={blogPostData.urlToImage}
            alt={blogPostData.author}
            placeholder={imagePlaceHolder}
          />
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2px",
          marginBottom: "10px"
        }}>
          <Typography
            variant='p'
            align='left'
            color={'black'}
          >{blogPostData.author}</Typography>
          <Typography
            variant='p'
            align='left'
            fontSize={'14px'}
            color={'GrayText'}
          >{publishedDate}</Typography>
        </Box>
        <Box>
          <Typography
            fontWeight={500}
            color={'GrayText'}
            fontSize={'18px'}
          >Description</Typography>
          <Typography variant='p'>{blogPostData.description}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            alignItems: "center",
            paddingTop: "10px"
          }}
        >
          <Button
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate('/')}
          >
            Back
          </Button>
          {
            blogPostData.url &&
            <Button
              startIcon={<LaunchRoundedIcon />}
              onClick={() => {
                window.open(blogPostData.url)
              }}
            >
              Read more
            </Button>
          }

        </Box>
      </Paper>

    </Container>
  )
}

export default BlogPostDetails
