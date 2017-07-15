'use strict';

const $ = require('cheerio');

exports.mapSelectorsToCarHtml = (selectors, carHtml) => {
    let carRoughData = {};

    Object.keys(selectors).forEach(k => {
        carRoughData[k] = $(selectors[k], carHtml).text().replace(/\s\s/g, "").trim();
    });

    return carRoughData;
};