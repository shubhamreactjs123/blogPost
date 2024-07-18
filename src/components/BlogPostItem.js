import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import React from 'react'
import { convertDate } from '../utils/blogPostUtils'
import { useNavigate } from 'react-router-dom';

const BlogPostItem = ({ blogPostItem, index, currentPage, itemPerPage }) => {
  let pulishedDate = convertDate(blogPostItem.publishedAt);
  const navigate = useNavigate();
  const handleViewDetails = () => {
    localStorage.setItem('blogPostItem', JSON.stringify(blogPostItem))
    navigate(`post/${index}`)
  }
  return (
    <TableRow hover>
      <TableCell variant='body'>{itemPerPage * (currentPage - 1) + index + 1}</TableCell>
      <TableCell variant='body'>{blogPostItem.author}</TableCell>
      <TableCell variant='body'>{blogPostItem.title}</TableCell>
      <TableCell variant='body'>{pulishedDate}</TableCell>
      <TableCell variant='body'>
        <Tooltip title="View details">
          <IconButton 
          onClick={handleViewDetails}
          >
            <VisibilityRoundedIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default BlogPostItem
