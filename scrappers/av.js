'use strict';

const request = require('tinyreq');
const $ = require('cheerio');

const config = require('../core/config').getConfig('av.by');
const mapSelectors = require('./common').mapSelectorsToCarHtml;
const errors = require('../core/errors');

const parseCarHtml = (carHtml) => {
    return splitDescription( mapSelectors(config.itemSelectors, carHtml) );
};

const splitDescription = (carData) => {
    const nameItems = carData.name.split(' '),
        mainItems = carData.description.split(',').map((x) => x.trim());

    return {
        make: nameItems[0],
        model: nameItems[1],
        modelPostfix: nameItems.length > 2 ? nameItems[2] : '',
        price: +carData.price.replace(/\s/g, ""),
        year: +mainItems[0],
        gearbox: mainItems[1],
        capacity: mainItems[2],
        engine: mainItems[3]
    };
};

exports.parseAvBy = () => {

    request(config.baseUrl, (err, body) => {
        const carsHtml = $(config.adSelector, body);

        if (!carsHtml.length) {
            throw new errors.ScrapperFoundNoItems("Scrapper didn't find any items in av.by");
        }

        let newCars = [];

        carsHtml.each(function () {
            newCars.push(parseCarHtml($(this).html()));
        });

        
    })

};