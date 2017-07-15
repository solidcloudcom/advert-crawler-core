'use strict';

const getDbCredentials = require('./credentials').getDbCredentials;

const db = require('monk')(`mongodb://${getDbCredentials()}@ds155582.mlab.com:55582/scrap-n-nofity`);
const demands = db.get('demands');

const getDemands = () => {
    demands.find(function (err, data) {
        console.log(data)
    });
};

const addNeed = () => {
    demands.insert({
        mark: '*',
        model: '*',
        year: JSON.stringify({from: 0, to: 2020}),
        price: JSON.stringify({from: 0, to: 80000}),
        userId: "someUuid003"
    }).then(() => {
        console.log('Gotovo');
    })
};

getDemands();