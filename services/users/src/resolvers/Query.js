const { getUserId } = require('../utils');

function userInfo (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.query.user({ where: {id: userId} }, info);
}

function location (parent, args, context, info) {
  return context.db.query.location({ where: {id: args.id} }, info);
}

function locations (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.query.locations({ where: {user: {id: userId }} }, info);
}

function car (parent, args, context, info) {
  return context.db.query.car({ where: {id: args.id} }, info);
}

function cars (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.query.cars({ where: {user: {id: userId }} }, info);
}

function spot (parent, args, context, info) {
  return context.db.query.spot({ where: {id: args.id} }, info);
}

function spots (parent, args, context, info) {
  return context.db.query.spots({}, info);  
}

function listing (parent, args, context, info) {
  return context.db.query.listing({ where: {id: args.id} }, info);
}

function listings (parent, args, context, info) {
  return context.db.query.listings({}, info);
} 

function myListings (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.query.listings(
    { 
      where: {
        AND: [
          { OR: [{listing_user: {id: userId} }, {claiming_user: {id: userId}}]}, 
          {type: 1}, 
          {OR: [{ status: 1 }, { status: 2 }] } 
        ]
      } 
    }, info);
}

function myListingsHistory (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.query.listings({ where: {AND: [{ OR: [{listing_user: {id: userId} }, {claiming_user: {id: userId}}]} ]}}, info);
}

function openSpot (parent, args, context, info) {
  return context.db.query.spots({ where: {is_available: true} }, info);
}

async function getRankingInfo(parent, args, context, info) {

  let userRankings = [];

  const allUsers = await context.db.query.users({}, '{ id }');

  await Promise.all(allUsers.map(async (user) =>  {

    // const countSelectionSet = '{ aggregate { count } }';

    let ranking = {};
    ranking.user_id = user.id;

    // how many listings where success
    let successfullListings = await context.db.query.listingsConnection({
      where: {
        status: 8,
        listing_user: {id: user.id}
      }
    }, '{ aggregate { count } }');

    // how many claims where success
    let successfullClaims = await context.db.query.listingsConnection({
      where: {
        status: 8,
        claiming_user: {id: user.id}
      }
    }, '{ aggregate { count } }');

    ranking.successCount = successfullListings.aggregate.count + successfullClaims.aggregate.count;

    // how many listings where no show
    let noShowListings = await context.db.query.listingsConnection({
      where: {
        status: 4,
        listing_user: {id: user.id}
      }
    }, '{ aggregate { count } }');

    // how many claims where no show
    let noShowClaims = await context.db.query.listingsConnection({
      where: {
        status: 5,
        claiming_user: {id: user.id}
      }
    }, '{ aggregate { count } }');

    ranking.noShowCount = noShowListings.aggregate.count + noShowClaims.aggregate.count;

    // how many listings where cancelled
    let cancelledListings = await context.db.query.listingsConnection({
      where: {
        status: 6,
        listing_user: {id: user.id}
      }
    }, '{ aggregate { count } }');

    // how many claims where cancelled
    let cancelledClaims = await context.db.query.listingsConnection({
      where: {
        status: 7,
        claiming_user: {id: user.id}
      }
    }, '{ aggregate { count } }');
  
    ranking.cancelCount = cancelledListings.aggregate.count + cancelledClaims.aggregate.count;

    console.log(ranking);
    userRankings.push(ranking);

  }));

  return userRankings;
};


module.exports = {
  userInfo,
  location,
  locations,
  car,
  cars,
  spot,
  spots,
  listing,
  listings,
  openSpot,
  myListings,
  myListingsHistory,
  getRankingInfo
};