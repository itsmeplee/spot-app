const { getUserIdForSockets } = require('../utils');

function newSpotSubscribe (parent, args, context, info) {
  return context.db.subscription.spot(
    { where: { mutation_in: ['CREATED', 'UPDATED', 'DELETED'] } },
    info,
  ).catch(err => {
    console.log('new spots sub ',err);
  });
}

const newSpot = {
  subscribe: newSpotSubscribe
};

function changedListingSubscribe (parent, args, context, info) {
  const userId = getUserIdForSockets(context);
  return context.db.subscription.listing(
    { 
      where: { 
        mutation_in: ['CREATED', 'UPDATED', 'DELETED'],
        node: {
          OR: [{ listing_user: {id: userId} }, { claiming_user: {id: userId} }],
          type: 1,
          // time_complete: null 
        }  
      }
    },
    info, 
  ).catch(err => {
    console.log('listing sub: ',err);
  });
  // return context.db.subscription.listing(
  //   { where: { mutation_in: 'UPDATED' } },
  //   info,
  // );
}

const listingUpdate = { 
  subscribe: changedListingSubscribe
};


module.exports = {
  newSpot,
  listingUpdate
};