import {
    Box,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getListOfBlogPost } from '../services/BlogPostAPI';
import BlogPostItem from '../components/BlogPostItem';
import CustomPagination from '../components/CustomPagination';

const BlogPostList = () => {
    const [blogPostData, setBlogPostData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPageItem] = useState(10);
    const [paginatedData, setpaginatedData] = useState([])
    const getList = () => {
        getListOfBlogPost(
            (respo) => {
                let cleanData = respo.data.articles.filter(item => item.author !== null)
                setBlogPostData(cleanData)
            },
            (err) => console.log(err)
        )
    }
    useEffect(() => {
        getList()
    }, [])
    useEffect(() => {
        if (blogPostData.length > 0) {
            const startIndex = (currentPage - 1) * perPageItem;
            const endIndex = startIndex + perPageItem;
            console.log(startIndex, endIndex, blogPostData)
            setpaginatedData(blogPostData.slice(startIndex, endIndex));
        }

    }, [currentPage, perPageItem, blogPostData])
    return (
        <div>
            <Container sx={{ py: 2 }}>
                <Typography variant='h4' mb={2}>Blog Posts</Typography>
                <TableContainer sx={{ mb: 2 }} component={Paper}>
                    <Table
                        stickyHeader={true}
                        size='small' >
                        <TableHead>
                            <TableRow>
                                <TableCell variant='head'>#</TableCell>
                                <TableCell variant='head'>Expert</TableCell>
                                <TableCell variant='head'>Title</TableCell>
                                <TableCell variant='head'>Published Date</TableCell>
                                <TableCell variant='head'>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                paginatedData.map((item, index) => {
                                    return (
                                        <BlogPostItem
                                            blogPostItem={item}
                                            index={index}
                                            currentPage={currentPage}
                                            itemPerPage={perPageItem}
                                            key={index}
                                        />
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                    {
                        blogPostData.length > 0 &&
                        <Box sx={{ p: 2 }}>
                            <CustomPagination
                                dataLength={blogPostData.length}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                                perPageData={perPageItem}
                            />
                        </Box>
                    }
                </TableContainer>

            </Container >
        </div>
    )
}

export default BlogPostList
