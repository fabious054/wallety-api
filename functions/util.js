// This file contains utility functions that can be used in other files.
// The functions are exported so that they can be used in other files.


//CURRENT TIME GENERATOR
function getCurrentTime() {
    const date = new Date().toLocaleDateString('pt-BR', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit'
    });

    return date;
}

function formatDate(date){
    // 1999-12-06T02:00:00.000Z to 06/12/1999
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
}

module.exports = {
    getCurrentTime,
    formatDate
};