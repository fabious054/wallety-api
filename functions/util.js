// This file contains utility functions that can be used in other files.
// The functions are exported so that they can be used in other files.


//CURRENT TIME GENERATOR
function getCurrentTime() {
    const date = new Date().toLocaleString('pt-BR', {year: 'numeric',month: '2-digit',day: '2-digit',hour: '2-digit', minute: '2-digit',second: '2-digit',hour12: false}); // JUST TO USE 24H FORMAT
    return date;
}

module.exports = {
    getCurrentTime
};