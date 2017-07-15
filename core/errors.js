'use strict';

const NE = require('node-exceptions');

class ScrapperFoundNoItems extends NE.LogicalException {}

exports.ScrapperFoundNoItems = ScrapperFoundNoItems;