'use strict';

const db = require('monk')('mongodb://ezekov:rich123945@ds155582.mlab.com:55582/scrap-n-nofity');
const cars = db.get('cars');

exports.addCarToDb = (car) => {
    cars.insert(car);
};