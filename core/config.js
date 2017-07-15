'use strict';

exports.getConfig = (portal) => {
    switch (portal) {
        case 'av.by':
            return {
                'baseUrl': 'https://cars.av.by/search?brand_id%5B%5D=&model_id%5B%5D=&year_from=&year_to=&currency=USD&price_from=&price_to=',
                'adSelector': '.listing-item',
                'itemSelectors': {
                    'name': 'h4 > a',
                    'description': '.listing-item-desc',
                    'price': '.listing-item-price > small'
                }
            }
    }
};