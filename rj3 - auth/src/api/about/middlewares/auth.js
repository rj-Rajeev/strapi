'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    
    // Proceed to the next middleware or route handler

    await next();
      // Retrieve the authenticated admin user from the session
      const adminUser = ctx.state.user;


    if (ctx.request.url.includes('/single-types/api::about.about')) {
        if (adminUser) {
            // Fetch the "About" page data
            try {
              const aboutData = await strapi.entityService.findMany('api::about.about', {
                // Specify any query parameters if needed
              });
    
              if (adminUser.email === aboutData.email) {
                console.log('ok');
                
              }else{
                console.log('not ok');
                strapi.log.warn('Unauthenticated access attempt to the About page.');
                ctx.status = 401;
                ctx.body = 'Authentication required.';
              }
    
              // Log the admin user's information and the "About" page data
              strapi.log.info(`Admin User Access: ${adminUser.username} (ID: ${adminUser.id}) accessed the About page.`);
              strapi.log.info(`About Page Data: ${JSON.stringify(aboutData)}`);
            } catch (error) {
              strapi.log.error('Error fetching About page data:', error);
            }
          } else {
            strapi.log.warn('Unauthenticated access attempt to the About page.');
          }
    }
    

  };
};
