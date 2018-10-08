function newSpotSubscribe (parent, args, context, info) {
  return context.db.subscription.spot(
    { where: { mutation_in: ['CREATED', 'DELETED'] } },
    info,
  );
}

const newSpot = {
  subscribe: newSpotSubscribe
};


module.exports = {
  newSpot,
};