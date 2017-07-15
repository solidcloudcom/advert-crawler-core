'use strict';

const scrapper = require('./scrappers/av');
const cron = require('node-cron');


// cron.schedule('*/20 * * * * *', () => {
//     parser.parseAvBy();
// });

scrapper.parseAvBy();
