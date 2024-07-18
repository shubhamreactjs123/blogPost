export const convertDate = (date) => {
    const dateModified = new Date(date);
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const day = dateModified?.getDate();
    const monthAbbreviation = months[dateModified?.getMonth()];
    const year = dateModified?.getFullYear();
    return `${day}-${monthAbbreviation}-${year}`;
}
