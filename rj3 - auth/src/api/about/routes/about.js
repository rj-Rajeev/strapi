'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::about.about', {
  config: {
    find: {
      middlewares: ['api::about.auth'],
    },
    findOne: {
      middlewares: ['api::about.auth'],
    },
    // Add middleware to other routes as needed
  },
});
