const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup (parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
};

async function login (parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
};

function editUser (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.updateUser(
    {
      data: {
        user_name: args.user_name,
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        phone_number: args.phone_number,
        password: args.password,
        current_lat: args.current_lat,
        current_lng: args.current_lng
      },
      where: {id: userId}
    },
    info
  )
};

function addLocation (parent, args, context, info) { //Working
  const userId = getUserId(context);
  return context.db.mutation.createLocation(
    {
      data: {   
        name: args.name,
        street1: args.street1,
        street2: args.street2,
        city: args.city,
        state: args.state,
        zip: args.zip,
        user: {
          connect: {
            id: userId
          }
        }
      }
    },
    info
  )
};

function editLocation (parent, args, context, info) { //Working
  const userId = getUserId(context);
  return context.db.mutation.updateLocation(
    {
      data: {
        name: args.name,
        street1: args.street1,
        street2: args.street2,
        city: args.city,
        state: args.state,
        zip: args.zip
      },
      where: {id: args.id}
    },
    info
  )
};

function deleteLocation (parent, args, context, info) { //working
  const userId = getUserId(context);
  return context.db.mutation.deleteLocation(
    {
      where: {id: args.id}
    },
    info
  )
};

function addCar (parent, args, context, info) { //Working
  const userId = getUserId(context);
  return context.db.mutation.createCar(
    {
      data: {
        size: args.size,
        make: args.make,
        model: args.model,
        color: args.color,
        plate: args.plate,
        state: args.state,
        user: {
          connect: {
            id: userId
          }
        },
        default_car: args.default_car
      }
    },
    info
  )
};

function editCar (parent, args, context, info) { //working
  const userId = getUserId(context);
  return context.db.mutation.updateCar(
    {
      data: {
        size: args.size,
        make: args.make,
        model: args.model,
        color: args.color,
        plate: args.plate,
        state: args.state,
        default_car: args.default_car
      },
      where: {id: args.id}
    },
    info
  )
};

function deleteCar (parent, args, context, info) { //working
  const userId = getUserId(context);
  return context.db.mutation.deleteCar(
    {
      where: {id: args.id}
    },
    info
  )
};

function addSpot (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.createSpot(
    {
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        lat: args.lat,
        lng: args.lng,
        street1: args.street1,
        street2: args.street2,
        city: args.city,
        state: args.state,
        zip: args.zip,
        is_available: true,
        type: args.type,
        start_time: args.start_time,
        end_time: args.end_time
      }
    },
    info
  )
};

function editSpot (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.updateSpot(
    {
      data: {
        is_available: false,
        start_time: args.start_time,
        end_time: args.end_time
      },
      where: {id: args.id}
    },
    info
  )
};

function deleteSpot (parent, args, context, info) {
  const userId = getUserId(context);
  return context.db.mutation.deleteSpot(
    {
      where: {id: args.id}
    },
    info
  )
};

function addListing (parent, args, context, info) { //working
  const userId = getUserId(context);
  return context.db.mutation.createListing(
    {
      data: {
        listing_user: {
          connect: {
            id: userId
          }
        },
        spot: {
          create: {
            lat: args.lat,
            lng: args.lng,
            street1: args.street1,
            street2: args.street2,
            city: args.city,
            state: args.state,
            zip: args.zip,
            is_available: true,
            type: args.type,
            start_time: args.start_time,
            end_time: args.end_time
          }
        },
        type: args.type,
        status: args.status
      }
    },
    info
  )
};

function editListing (parent, args, context, info) { //working until I try to change is_available in spot
  const userId = getUserId(context);
  if (args.claimer) {
    return context.db.mutation.updateListing(
      {
        data: {
          claiming_user: {
            connect: {
              id: userId
            }
          },
          spot: {
            connect: {
              id: args.spot_id
            }
          },
          // spot: {
          //   update:
          //     {
          //       data: {is_available: false},
          //       where: {id: args.spot_id}
          //     }
          // },
          status: args.status,
          time_complete: args.time_complete
        }, 
        where: {id: args.id}
      },
      info
    )
  }
  else {
    return context.db.mutation.updateListing(
      {
        data: {
          spot: {
            connect: {
              id: args.spot_id
            }
          },
          status: args.status,
          time_complete: args.time_complete
        }, 
        where: {id: args.id}
      },
      info
    )
  }
};


function editSpotListing (parent, args, context, info) { //working
  const userId = getUserId(context);
  return context.db.mutation.updateSpot(
    {
      data: {
        is_available: false
      },
      where: { id: args.spot_id}
    },
    info
  )
  .then(() => {
    return  context.db.mutation.updateListing(
      {
        data: {
          status: args.status
        },
        where: {id: args.listing_id}
      }
    )
  })
};

async function expireSpot (parent, args, context, info) {
  const userId = await getUserId(context);
  //check if worker process
  if (args.isWorker) {
    const spots = await context.db.query.spots({
      where: {
        end_time_lte: args.date,
        is_available: true
      }
    });
    const expiredSpots = await spots.map((spot) => {
      context.db.mutation.updateSpot({
        where: {
          id: spot.id
        },
        data: {
          is_available: false
        }
      })  
    });
    return {
      count : spots.length
    }
  }
};

async function updateUserRanking (parent, args, context, info) {
  const userId = await getUserId(context);
  //check if worker process
  if (args.isWorker) {
    return context.db.mutation.updateUser (
    {
      data: {
        rating : args.rating
      },
      where: {id: args.userid}
    },
    info
    )
  }
};

async function updateBalance (parent, args, context, info) {
  const userId = getUserId(context);
  const oldBalance = await context.db.query.user({ where: { id: userId } }, ` { balance } `);

  if (args.claimerId === userId) {
    const newBalance = oldBalance - args.value
    return context.db.mutation.updateUser(
      {
        data: {
          balance: newBalance
        },
        where: {id: userId}
      },
      info
    )
  }
  else if (args.listerId === userId) {
    const newBalance = oldBalance + args.value
    return context.db.mutation.updateUser(
      {
        data: {
          balance: newBalance
        },
        where: {id: userId}
      },
      info
    )
  }
};


module.exports = {
  signup,
  login,
  editUser,
  addLocation,
  editLocation,
  deleteLocation,
  addCar,
  editCar,
  deleteCar,
  addSpot,
  editSpot,
  deleteSpot,
  addListing,
  editListing,
  editSpotListing,
  expireSpot,
  updateUserRanking,
  updateBalance
};