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

module.exports = {
    getCurrentTime
};