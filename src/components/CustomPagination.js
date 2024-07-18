import { Pagination } from '@mui/material'
import React from 'react'

const CustomPagination = ({
    dataLength,
    currentPage,
    onPageChange,
    perPageData
}) => {
    const pages = Math.ceil(dataLength / perPageData)
    const handleChange = (event, page) => {
        onPageChange(page)
    }
    return (
        <div style={{
            display: "flex",
            justifyContent: "end",
            width: "100%"
        }}>
            <Pagination
                count={+pages}
                defaultPage={1}
                page={+currentPage}
                siblingCount={1}
                onChange={handleChange}
            />
        </div>
    )
}

export default CustomPagination
