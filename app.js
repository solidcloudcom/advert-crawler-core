'use strict';

const scrapper = require('./scrappers/av');
const cron = require('node-cron');


let i = 0;

cron.schedule('*/1 * * * * *', () => {
    console.log(i)
    i++
});