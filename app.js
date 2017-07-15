'use strict';

const av = require('./scrappers/av');
const cron = require('node-cron');


let i = 0;

cron.schedule('*/60 * * * * *', () => {
    console.log(i)
    i++
});