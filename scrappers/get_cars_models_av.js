'use strict';

const request = require('tinyreq');
const $ = require('cheerio');
const cron = require('node-cron');

const getDbCredentials = require('core/credentials').getDbCredentials();
const config = require('../core/config').getConfig('av.by');

const db = require('monk')(`mongodb://${getDbCredentials()}@ds155582.mlab.com:55582/scrap-n-nofity`);
const automakers = db.get('automakers');

const addAutomakerWithModelsToDb = (carObj) => {
    automakers.insert(carObj);
};

const scrapAllAutomakersToGetModels = () => {

    request(config.homeUrl, (err, body) => {
        const carsHtml = $('form[action="https://cars.av.by/search"] > div > div > select > option', body);

        let i = 0;

        cron.schedule('*/1 * * * * *', () => {

            if (i < carsHtml.length) {
                const carId = $(carsHtml[i]).attr('value'),
                    makerName = $(carsHtml[i]).html();

                scrapModelsByIdAndName(carId, makerName);
                i++;
            }
        });
    })

};

const scrapModelsByIdAndName = (id, name) => {
    const apiUrl = `https://av.by/public/parameters.php?event=Model_List_Search&category_parent=${id}`;

    request(apiUrl, (err, body) => {

        let models = [];
        console.log('Parsing ' + name);

        body.split('\n').forEach(function (elem) {
            models.push(elem.split('=').pop())
        });

        models.shift();
        addAutomakerWithModelsToDb({name: name, models: models});
    })
};

scrapAllAutomakersToGetModels();

