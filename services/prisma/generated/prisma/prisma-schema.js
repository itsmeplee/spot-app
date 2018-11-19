module.exports = {
        typeDefs: /* GraphQL */ `type AggregateCar {
  count: Int!
}

type AggregateListing {
  count: Int!
}

type AggregateLocation {
  count: Int!
}

type AggregateSpot {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Car {
  id: ID!
  default_car: Boolean
  size: Int
  make: String
  model: String
  color: String
  plate: String
  state: String
  user: User
}

type CarConnection {
  pageInfo: PageInfo!
  edges: [CarEdge]!
  aggregate: AggregateCar!
}

input CarCreateInput {
  default_car: Boolean
  size: Int
  make: String
  model: String
  color: String
  plate: String
  state: String
  user: UserCreateOneWithoutUser_carsInput
}

input CarCreateManyWithoutUserInput {
  create: [CarCreateWithoutUserInput!]
  connect: [CarWhereUniqueInput!]
}

input CarCreateWithoutUserInput {
  default_car: Boolean
  size: Int
  make: String
  model: String
  color: String
  plate: String
  state: String
}

type CarEdge {
  node: Car!
  cursor: String!
}

enum CarOrderByInput {
  id_ASC
  id_DESC
  default_car_ASC
  default_car_DESC
  size_ASC
  size_DESC
  make_ASC
  make_DESC
  model_ASC
  model_DESC
  color_ASC
  color_DESC
  plate_ASC
  plate_DESC
  state_ASC
  state_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CarPreviousValues {
  id: ID!
  default_car: Boolean
  size: Int
  make: String
  model: String
  color: String
  plate: String
  state: String
}

type CarSubscriptionPayload {
  mutation: MutationType!
  node: Car
  updatedFields: [String!]
  previousValues: CarPreviousValues
}

input CarSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CarWhereInput
  AND: [CarSubscriptionWhereInput!]
  OR: [CarSubscriptionWhereInput!]
  NOT: [CarSubscriptionWhereInput!]
}

input CarUpdateInput {
  default_car: Boolean
  size: Int
  make: String
  model: String
  color: String
  plate: String
  state: String
  user: UserUpdateOneWithoutUser_carsInput
}

input CarUpdateManyMutationInput {
  default_car: Boolean
  size: Int
  make: String
  model: String
  color: String
  plate: String
  state: String
}

input CarUpdateManyWithoutUserInput {
  create: [CarCreateWithoutUserInput!]
  delete: [CarWhereUniqueInput!]
  connect: [CarWhereUniqueInput!]
  disconnect: [CarWhereUniqueInput!]
  update: [CarUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [CarUpsertWithWhereUniqueWithoutUserInput!]
}

input CarUpdateWithoutUserDataInput {
  default_car: Boolean
  size: Int
  make: String
  model: String
  color: String
  plate: String
  state: String
}

input CarUpdateWithWhereUniqueWithoutUserInput {
  where: CarWhereUniqueInput!
  data: CarUpdateWithoutUserDataInput!
}

input CarUpsertWithWhereUniqueWithoutUserInput {
  where: CarWhereUniqueInput!
  update: CarUpdateWithoutUserDataInput!
  create: CarCreateWithoutUserInput!
}

input CarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  default_car: Boolean
  default_car_not: Boolean
  size: Int
  size_not: Int
  size_in: [Int!]
  size_not_in: [Int!]
  size_lt: Int
  size_lte: Int
  size_gt: Int
  size_gte: Int
  make: String
  make_not: String
  make_in: [String!]
  make_not_in: [String!]
  make_lt: String
  make_lte: String
  make_gt: String
  make_gte: String
  make_contains: String
  make_not_contains: String
  make_starts_with: String
  make_not_starts_with: String
  make_ends_with: String
  make_not_ends_with: String
  model: String
  model_not: String
  model_in: [String!]
  model_not_in: [String!]
  model_lt: String
  model_lte: String
  model_gt: String
  model_gte: String
  model_contains: String
  model_not_contains: String
  model_starts_with: String
  model_not_starts_with: String
  model_ends_with: String
  model_not_ends_with: String
  color: String
  color_not: String
  color_in: [String!]
  color_not_in: [String!]
  color_lt: String
  color_lte: String
  color_gt: String
  color_gte: String
  color_contains: String
  color_not_contains: String
  color_starts_with: String
  color_not_starts_with: String
  color_ends_with: String
  color_not_ends_with: String
  plate: String
  plate_not: String
  plate_in: [String!]
  plate_not_in: [String!]
  plate_lt: String
  plate_lte: String
  plate_gt: String
  plate_gte: String
  plate_contains: String
  plate_not_contains: String
  plate_starts_with: String
  plate_not_starts_with: String
  plate_ends_with: String
  plate_not_ends_with: String
  state: String
  state_not: String
  state_in: [String!]
  state_not_in: [String!]
  state_lt: String
  state_lte: String
  state_gt: String
  state_gte: String
  state_contains: String
  state_not_contains: String
  state_starts_with: String
  state_not_starts_with: String
  state_ends_with: String
  state_not_ends_with: String
  user: UserWhereInput
  AND: [CarWhereInput!]
  OR: [CarWhereInput!]
  NOT: [CarWhereInput!]
}

input CarWhereUniqueInput {
  id: ID
}

scalar DateTime

type Listing {
  id: ID!
  listing_user: User
  claiming_user: User
  spot: Spot
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

type ListingConnection {
  pageInfo: PageInfo!
  edges: [ListingEdge]!
  aggregate: AggregateListing!
}

input ListingCreateInput {
  listing_user: UserCreateOneWithoutList_listingsInput
  claiming_user: UserCreateOneWithoutClaim_listingsInput
  spot: SpotCreateOneWithoutListingInput
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

input ListingCreateManyWithoutClaiming_userInput {
  create: [ListingCreateWithoutClaiming_userInput!]
  connect: [ListingWhereUniqueInput!]
}

input ListingCreateManyWithoutListing_userInput {
  create: [ListingCreateWithoutListing_userInput!]
  connect: [ListingWhereUniqueInput!]
}

input ListingCreateOneWithoutSpotInput {
  create: ListingCreateWithoutSpotInput
  connect: ListingWhereUniqueInput
}

input ListingCreateWithoutClaiming_userInput {
  listing_user: UserCreateOneWithoutList_listingsInput
  spot: SpotCreateOneWithoutListingInput
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

input ListingCreateWithoutListing_userInput {
  claiming_user: UserCreateOneWithoutClaim_listingsInput
  spot: SpotCreateOneWithoutListingInput
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

input ListingCreateWithoutSpotInput {
  listing_user: UserCreateOneWithoutList_listingsInput
  claiming_user: UserCreateOneWithoutClaim_listingsInput
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

type ListingEdge {
  node: Listing!
  cursor: String!
}

enum ListingOrderByInput {
  id_ASC
  id_DESC
  type_ASC
  type_DESC
  status_ASC
  status_DESC
  time_complete_ASC
  time_complete_DESC
  value_ASC
  value_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ListingPreviousValues {
  id: ID!
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

type ListingSubscriptionPayload {
  mutation: MutationType!
  node: Listing
  updatedFields: [String!]
  previousValues: ListingPreviousValues
}

input ListingSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ListingWhereInput
  AND: [ListingSubscriptionWhereInput!]
  OR: [ListingSubscriptionWhereInput!]
  NOT: [ListingSubscriptionWhereInput!]
}

input ListingUpdateInput {
  listing_user: UserUpdateOneWithoutList_listingsInput
  claiming_user: UserUpdateOneWithoutClaim_listingsInput
  spot: SpotUpdateOneWithoutListingInput
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

input ListingUpdateManyMutationInput {
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

input ListingUpdateManyWithoutClaiming_userInput {
  create: [ListingCreateWithoutClaiming_userInput!]
  delete: [ListingWhereUniqueInput!]
  connect: [ListingWhereUniqueInput!]
  disconnect: [ListingWhereUniqueInput!]
  update: [ListingUpdateWithWhereUniqueWithoutClaiming_userInput!]
  upsert: [ListingUpsertWithWhereUniqueWithoutClaiming_userInput!]
}

input ListingUpdateManyWithoutListing_userInput {
  create: [ListingCreateWithoutListing_userInput!]
  delete: [ListingWhereUniqueInput!]
  connect: [ListingWhereUniqueInput!]
  disconnect: [ListingWhereUniqueInput!]
  update: [ListingUpdateWithWhereUniqueWithoutListing_userInput!]
  upsert: [ListingUpsertWithWhereUniqueWithoutListing_userInput!]
}

input ListingUpdateOneWithoutSpotInput {
  create: ListingCreateWithoutSpotInput
  update: ListingUpdateWithoutSpotDataInput
  upsert: ListingUpsertWithoutSpotInput
  delete: Boolean
  disconnect: Boolean
  connect: ListingWhereUniqueInput
}

input ListingUpdateWithoutClaiming_userDataInput {
  listing_user: UserUpdateOneWithoutList_listingsInput
  spot: SpotUpdateOneWithoutListingInput
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

input ListingUpdateWithoutListing_userDataInput {
  claiming_user: UserUpdateOneWithoutClaim_listingsInput
  spot: SpotUpdateOneWithoutListingInput
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

input ListingUpdateWithoutSpotDataInput {
  listing_user: UserUpdateOneWithoutList_listingsInput
  claiming_user: UserUpdateOneWithoutClaim_listingsInput
  type: Int
  status: Int
  time_complete: DateTime
  value: Int
}

input ListingUpdateWithWhereUniqueWithoutClaiming_userInput {
  where: ListingWhereUniqueInput!
  data: ListingUpdateWithoutClaiming_userDataInput!
}

input ListingUpdateWithWhereUniqueWithoutListing_userInput {
  where: ListingWhereUniqueInput!
  data: ListingUpdateWithoutListing_userDataInput!
}

input ListingUpsertWithoutSpotInput {
  update: ListingUpdateWithoutSpotDataInput!
  create: ListingCreateWithoutSpotInput!
}

input ListingUpsertWithWhereUniqueWithoutClaiming_userInput {
  where: ListingWhereUniqueInput!
  update: ListingUpdateWithoutClaiming_userDataInput!
  create: ListingCreateWithoutClaiming_userInput!
}

input ListingUpsertWithWhereUniqueWithoutListing_userInput {
  where: ListingWhereUniqueInput!
  update: ListingUpdateWithoutListing_userDataInput!
  create: ListingCreateWithoutListing_userInput!
}

input ListingWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  listing_user: UserWhereInput
  claiming_user: UserWhereInput
  spot: SpotWhereInput
  type: Int
  type_not: Int
  type_in: [Int!]
  type_not_in: [Int!]
  type_lt: Int
  type_lte: Int
  type_gt: Int
  type_gte: Int
  status: Int
  status_not: Int
  status_in: [Int!]
  status_not_in: [Int!]
  status_lt: Int
  status_lte: Int
  status_gt: Int
  status_gte: Int
  time_complete: DateTime
  time_complete_not: DateTime
  time_complete_in: [DateTime!]
  time_complete_not_in: [DateTime!]
  time_complete_lt: DateTime
  time_complete_lte: DateTime
  time_complete_gt: DateTime
  time_complete_gte: DateTime
  value: Int
  value_not: Int
  value_in: [Int!]
  value_not_in: [Int!]
  value_lt: Int
  value_lte: Int
  value_gt: Int
  value_gte: Int
  AND: [ListingWhereInput!]
  OR: [ListingWhereInput!]
  NOT: [ListingWhereInput!]
}

input ListingWhereUniqueInput {
  id: ID
}

type Location {
  id: ID!
  name: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  lat: String
  lng: String
  user: User
}

type LocationConnection {
  pageInfo: PageInfo!
  edges: [LocationEdge]!
  aggregate: AggregateLocation!
}

input LocationCreateInput {
  name: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  lat: String
  lng: String
  user: UserCreateOneWithoutLocationsInput
}

input LocationCreateManyWithoutUserInput {
  create: [LocationCreateWithoutUserInput!]
  connect: [LocationWhereUniqueInput!]
}

input LocationCreateWithoutUserInput {
  name: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  lat: String
  lng: String
}

type LocationEdge {
  node: Location!
  cursor: String!
}

enum LocationOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  street1_ASC
  street1_DESC
  street2_ASC
  street2_DESC
  city_ASC
  city_DESC
  state_ASC
  state_DESC
  zip_ASC
  zip_DESC
  lat_ASC
  lat_DESC
  lng_ASC
  lng_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type LocationPreviousValues {
  id: ID!
  name: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  lat: String
  lng: String
}

type LocationSubscriptionPayload {
  mutation: MutationType!
  node: Location
  updatedFields: [String!]
  previousValues: LocationPreviousValues
}

input LocationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: LocationWhereInput
  AND: [LocationSubscriptionWhereInput!]
  OR: [LocationSubscriptionWhereInput!]
  NOT: [LocationSubscriptionWhereInput!]
}

input LocationUpdateInput {
  name: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  lat: String
  lng: String
  user: UserUpdateOneWithoutLocationsInput
}

input LocationUpdateManyMutationInput {
  name: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  lat: String
  lng: String
}

input LocationUpdateManyWithoutUserInput {
  create: [LocationCreateWithoutUserInput!]
  delete: [LocationWhereUniqueInput!]
  connect: [LocationWhereUniqueInput!]
  disconnect: [LocationWhereUniqueInput!]
  update: [LocationUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [LocationUpsertWithWhereUniqueWithoutUserInput!]
}

input LocationUpdateWithoutUserDataInput {
  name: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  lat: String
  lng: String
}

input LocationUpdateWithWhereUniqueWithoutUserInput {
  where: LocationWhereUniqueInput!
  data: LocationUpdateWithoutUserDataInput!
}

input LocationUpsertWithWhereUniqueWithoutUserInput {
  where: LocationWhereUniqueInput!
  update: LocationUpdateWithoutUserDataInput!
  create: LocationCreateWithoutUserInput!
}

input LocationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  street1: String
  street1_not: String
  street1_in: [String!]
  street1_not_in: [String!]
  street1_lt: String
  street1_lte: String
  street1_gt: String
  street1_gte: String
  street1_contains: String
  street1_not_contains: String
  street1_starts_with: String
  street1_not_starts_with: String
  street1_ends_with: String
  street1_not_ends_with: String
  street2: String
  street2_not: String
  street2_in: [String!]
  street2_not_in: [String!]
  street2_lt: String
  street2_lte: String
  street2_gt: String
  street2_gte: String
  street2_contains: String
  street2_not_contains: String
  street2_starts_with: String
  street2_not_starts_with: String
  street2_ends_with: String
  street2_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  state: String
  state_not: String
  state_in: [String!]
  state_not_in: [String!]
  state_lt: String
  state_lte: String
  state_gt: String
  state_gte: String
  state_contains: String
  state_not_contains: String
  state_starts_with: String
  state_not_starts_with: String
  state_ends_with: String
  state_not_ends_with: String
  zip: Int
  zip_not: Int
  zip_in: [Int!]
  zip_not_in: [Int!]
  zip_lt: Int
  zip_lte: Int
  zip_gt: Int
  zip_gte: Int
  lat: String
  lat_not: String
  lat_in: [String!]
  lat_not_in: [String!]
  lat_lt: String
  lat_lte: String
  lat_gt: String
  lat_gte: String
  lat_contains: String
  lat_not_contains: String
  lat_starts_with: String
  lat_not_starts_with: String
  lat_ends_with: String
  lat_not_ends_with: String
  lng: String
  lng_not: String
  lng_in: [String!]
  lng_not_in: [String!]
  lng_lt: String
  lng_lte: String
  lng_gt: String
  lng_gte: String
  lng_contains: String
  lng_not_contains: String
  lng_starts_with: String
  lng_not_starts_with: String
  lng_ends_with: String
  lng_not_ends_with: String
  user: UserWhereInput
  AND: [LocationWhereInput!]
  OR: [LocationWhereInput!]
  NOT: [LocationWhereInput!]
}

input LocationWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createCar(data: CarCreateInput!): Car!
  updateCar(data: CarUpdateInput!, where: CarWhereUniqueInput!): Car
  updateManyCars(data: CarUpdateManyMutationInput!, where: CarWhereInput): BatchPayload!
  upsertCar(where: CarWhereUniqueInput!, create: CarCreateInput!, update: CarUpdateInput!): Car!
  deleteCar(where: CarWhereUniqueInput!): Car
  deleteManyCars(where: CarWhereInput): BatchPayload!
  createListing(data: ListingCreateInput!): Listing!
  updateListing(data: ListingUpdateInput!, where: ListingWhereUniqueInput!): Listing
  updateManyListings(data: ListingUpdateManyMutationInput!, where: ListingWhereInput): BatchPayload!
  upsertListing(where: ListingWhereUniqueInput!, create: ListingCreateInput!, update: ListingUpdateInput!): Listing!
  deleteListing(where: ListingWhereUniqueInput!): Listing
  deleteManyListings(where: ListingWhereInput): BatchPayload!
  createLocation(data: LocationCreateInput!): Location!
  updateLocation(data: LocationUpdateInput!, where: LocationWhereUniqueInput!): Location
  updateManyLocations(data: LocationUpdateManyMutationInput!, where: LocationWhereInput): BatchPayload!
  upsertLocation(where: LocationWhereUniqueInput!, create: LocationCreateInput!, update: LocationUpdateInput!): Location!
  deleteLocation(where: LocationWhereUniqueInput!): Location
  deleteManyLocations(where: LocationWhereInput): BatchPayload!
  createSpot(data: SpotCreateInput!): Spot!
  updateSpot(data: SpotUpdateInput!, where: SpotWhereUniqueInput!): Spot
  updateManySpots(data: SpotUpdateManyMutationInput!, where: SpotWhereInput): BatchPayload!
  upsertSpot(where: SpotWhereUniqueInput!, create: SpotCreateInput!, update: SpotUpdateInput!): Spot!
  deleteSpot(where: SpotWhereUniqueInput!): Spot
  deleteManySpots(where: SpotWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  car(where: CarWhereUniqueInput!): Car
  cars(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Car]!
  carsConnection(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CarConnection!
  listing(where: ListingWhereUniqueInput!): Listing
  listings(where: ListingWhereInput, orderBy: ListingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Listing]!
  listingsConnection(where: ListingWhereInput, orderBy: ListingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ListingConnection!
  location(where: LocationWhereUniqueInput!): Location
  locations(where: LocationWhereInput, orderBy: LocationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Location]!
  locationsConnection(where: LocationWhereInput, orderBy: LocationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): LocationConnection!
  spot(where: SpotWhereUniqueInput!): Spot
  spots(where: SpotWhereInput, orderBy: SpotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Spot]!
  spotsConnection(where: SpotWhereInput, orderBy: SpotOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SpotConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Spot {
  id: ID!
  user: User
  lat: String
  lng: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  is_available: Boolean!
  type: Int
  start_time: DateTime
  end_time: DateTime
  listing: Listing
}

type SpotConnection {
  pageInfo: PageInfo!
  edges: [SpotEdge]!
  aggregate: AggregateSpot!
}

input SpotCreateInput {
  user: UserCreateOneInput
  lat: String
  lng: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  is_available: Boolean
  type: Int
  start_time: DateTime
  end_time: DateTime
  listing: ListingCreateOneWithoutSpotInput
}

input SpotCreateOneWithoutListingInput {
  create: SpotCreateWithoutListingInput
  connect: SpotWhereUniqueInput
}

input SpotCreateWithoutListingInput {
  user: UserCreateOneInput
  lat: String
  lng: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  is_available: Boolean
  type: Int
  start_time: DateTime
  end_time: DateTime
}

type SpotEdge {
  node: Spot!
  cursor: String!
}

enum SpotOrderByInput {
  id_ASC
  id_DESC
  lat_ASC
  lat_DESC
  lng_ASC
  lng_DESC
  street1_ASC
  street1_DESC
  street2_ASC
  street2_DESC
  city_ASC
  city_DESC
  state_ASC
  state_DESC
  zip_ASC
  zip_DESC
  is_available_ASC
  is_available_DESC
  type_ASC
  type_DESC
  start_time_ASC
  start_time_DESC
  end_time_ASC
  end_time_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type SpotPreviousValues {
  id: ID!
  lat: String
  lng: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  is_available: Boolean!
  type: Int
  start_time: DateTime
  end_time: DateTime
}

type SpotSubscriptionPayload {
  mutation: MutationType!
  node: Spot
  updatedFields: [String!]
  previousValues: SpotPreviousValues
}

input SpotSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SpotWhereInput
  AND: [SpotSubscriptionWhereInput!]
  OR: [SpotSubscriptionWhereInput!]
  NOT: [SpotSubscriptionWhereInput!]
}

input SpotUpdateInput {
  user: UserUpdateOneInput
  lat: String
  lng: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  is_available: Boolean
  type: Int
  start_time: DateTime
  end_time: DateTime
  listing: ListingUpdateOneWithoutSpotInput
}

input SpotUpdateManyMutationInput {
  lat: String
  lng: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  is_available: Boolean
  type: Int
  start_time: DateTime
  end_time: DateTime
}

input SpotUpdateOneWithoutListingInput {
  create: SpotCreateWithoutListingInput
  update: SpotUpdateWithoutListingDataInput
  upsert: SpotUpsertWithoutListingInput
  delete: Boolean
  disconnect: Boolean
  connect: SpotWhereUniqueInput
}

input SpotUpdateWithoutListingDataInput {
  user: UserUpdateOneInput
  lat: String
  lng: String
  street1: String
  street2: String
  city: String
  state: String
  zip: Int
  is_available: Boolean
  type: Int
  start_time: DateTime
  end_time: DateTime
}

input SpotUpsertWithoutListingInput {
  update: SpotUpdateWithoutListingDataInput!
  create: SpotCreateWithoutListingInput!
}

input SpotWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user: UserWhereInput
  lat: String
  lat_not: String
  lat_in: [String!]
  lat_not_in: [String!]
  lat_lt: String
  lat_lte: String
  lat_gt: String
  lat_gte: String
  lat_contains: String
  lat_not_contains: String
  lat_starts_with: String
  lat_not_starts_with: String
  lat_ends_with: String
  lat_not_ends_with: String
  lng: String
  lng_not: String
  lng_in: [String!]
  lng_not_in: [String!]
  lng_lt: String
  lng_lte: String
  lng_gt: String
  lng_gte: String
  lng_contains: String
  lng_not_contains: String
  lng_starts_with: String
  lng_not_starts_with: String
  lng_ends_with: String
  lng_not_ends_with: String
  street1: String
  street1_not: String
  street1_in: [String!]
  street1_not_in: [String!]
  street1_lt: String
  street1_lte: String
  street1_gt: String
  street1_gte: String
  street1_contains: String
  street1_not_contains: String
  street1_starts_with: String
  street1_not_starts_with: String
  street1_ends_with: String
  street1_not_ends_with: String
  street2: String
  street2_not: String
  street2_in: [String!]
  street2_not_in: [String!]
  street2_lt: String
  street2_lte: String
  street2_gt: String
  street2_gte: String
  street2_contains: String
  street2_not_contains: String
  street2_starts_with: String
  street2_not_starts_with: String
  street2_ends_with: String
  street2_not_ends_with: String
  city: String
  city_not: String
  city_in: [String!]
  city_not_in: [String!]
  city_lt: String
  city_lte: String
  city_gt: String
  city_gte: String
  city_contains: String
  city_not_contains: String
  city_starts_with: String
  city_not_starts_with: String
  city_ends_with: String
  city_not_ends_with: String
  state: String
  state_not: String
  state_in: [String!]
  state_not_in: [String!]
  state_lt: String
  state_lte: String
  state_gt: String
  state_gte: String
  state_contains: String
  state_not_contains: String
  state_starts_with: String
  state_not_starts_with: String
  state_ends_with: String
  state_not_ends_with: String
  zip: Int
  zip_not: Int
  zip_in: [Int!]
  zip_not_in: [Int!]
  zip_lt: Int
  zip_lte: Int
  zip_gt: Int
  zip_gte: Int
  is_available: Boolean
  is_available_not: Boolean
  type: Int
  type_not: Int
  type_in: [Int!]
  type_not_in: [Int!]
  type_lt: Int
  type_lte: Int
  type_gt: Int
  type_gte: Int
  start_time: DateTime
  start_time_not: DateTime
  start_time_in: [DateTime!]
  start_time_not_in: [DateTime!]
  start_time_lt: DateTime
  start_time_lte: DateTime
  start_time_gt: DateTime
  start_time_gte: DateTime
  end_time: DateTime
  end_time_not: DateTime
  end_time_in: [DateTime!]
  end_time_not_in: [DateTime!]
  end_time_lt: DateTime
  end_time_lte: DateTime
  end_time_gt: DateTime
  end_time_gte: DateTime
  listing: ListingWhereInput
  AND: [SpotWhereInput!]
  OR: [SpotWhereInput!]
  NOT: [SpotWhereInput!]
}

input SpotWhereUniqueInput {
  id: ID
}

type Subscription {
  car(where: CarSubscriptionWhereInput): CarSubscriptionPayload
  listing(where: ListingSubscriptionWhereInput): ListingSubscriptionPayload
  location(where: LocationSubscriptionWhereInput): LocationSubscriptionPayload
  spot(where: SpotSubscriptionWhereInput): SpotSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  user_name: String!
  rating: Int
  first_name: String
  last_name: String
  email: String!
  phone_number: String
  password: String!
  locations(where: LocationWhereInput, orderBy: LocationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Location!]
  user_cars(where: CarWhereInput, orderBy: CarOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Car!]
  current_lng: String
  current_lat: String
  claim_listings(where: ListingWhereInput, orderBy: ListingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Listing!]
  list_listings(where: ListingWhereInput, orderBy: ListingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Listing!]
  balance: Int
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  user_name: String!
  rating: Int
  first_name: String
  last_name: String
  email: String!
  phone_number: String
  password: String!
  locations: LocationCreateManyWithoutUserInput
  user_cars: CarCreateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingCreateManyWithoutClaiming_userInput
  list_listings: ListingCreateManyWithoutListing_userInput
  balance: Int
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutClaim_listingsInput {
  create: UserCreateWithoutClaim_listingsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutList_listingsInput {
  create: UserCreateWithoutList_listingsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutLocationsInput {
  create: UserCreateWithoutLocationsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutUser_carsInput {
  create: UserCreateWithoutUser_carsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutClaim_listingsInput {
  user_name: String!
  rating: Int
  first_name: String
  last_name: String
  email: String!
  phone_number: String
  password: String!
  locations: LocationCreateManyWithoutUserInput
  user_cars: CarCreateManyWithoutUserInput
  current_lng: String
  current_lat: String
  list_listings: ListingCreateManyWithoutListing_userInput
  balance: Int
}

input UserCreateWithoutList_listingsInput {
  user_name: String!
  rating: Int
  first_name: String
  last_name: String
  email: String!
  phone_number: String
  password: String!
  locations: LocationCreateManyWithoutUserInput
  user_cars: CarCreateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingCreateManyWithoutClaiming_userInput
  balance: Int
}

input UserCreateWithoutLocationsInput {
  user_name: String!
  rating: Int
  first_name: String
  last_name: String
  email: String!
  phone_number: String
  password: String!
  user_cars: CarCreateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingCreateManyWithoutClaiming_userInput
  list_listings: ListingCreateManyWithoutListing_userInput
  balance: Int
}

input UserCreateWithoutUser_carsInput {
  user_name: String!
  rating: Int
  first_name: String
  last_name: String
  email: String!
  phone_number: String
  password: String!
  locations: LocationCreateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingCreateManyWithoutClaiming_userInput
  list_listings: ListingCreateManyWithoutListing_userInput
  balance: Int
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  user_name_ASC
  user_name_DESC
  rating_ASC
  rating_DESC
  first_name_ASC
  first_name_DESC
  last_name_ASC
  last_name_DESC
  email_ASC
  email_DESC
  phone_number_ASC
  phone_number_DESC
  password_ASC
  password_DESC
  current_lng_ASC
  current_lng_DESC
  current_lat_ASC
  current_lat_DESC
  balance_ASC
  balance_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  user_name: String!
  rating: Int
  first_name: String
  last_name: String
  email: String!
  phone_number: String
  password: String!
  current_lng: String
  current_lat: String
  balance: Int
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateDataInput {
  user_name: String
  rating: Int
  first_name: String
  last_name: String
  email: String
  phone_number: String
  password: String
  locations: LocationUpdateManyWithoutUserInput
  user_cars: CarUpdateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingUpdateManyWithoutClaiming_userInput
  list_listings: ListingUpdateManyWithoutListing_userInput
  balance: Int
}

input UserUpdateInput {
  user_name: String
  rating: Int
  first_name: String
  last_name: String
  email: String
  phone_number: String
  password: String
  locations: LocationUpdateManyWithoutUserInput
  user_cars: CarUpdateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingUpdateManyWithoutClaiming_userInput
  list_listings: ListingUpdateManyWithoutListing_userInput
  balance: Int
}

input UserUpdateManyMutationInput {
  user_name: String
  rating: Int
  first_name: String
  last_name: String
  email: String
  phone_number: String
  password: String
  current_lng: String
  current_lat: String
  balance: Int
}

input UserUpdateOneInput {
  create: UserCreateInput
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutClaim_listingsInput {
  create: UserCreateWithoutClaim_listingsInput
  update: UserUpdateWithoutClaim_listingsDataInput
  upsert: UserUpsertWithoutClaim_listingsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutList_listingsInput {
  create: UserCreateWithoutList_listingsInput
  update: UserUpdateWithoutList_listingsDataInput
  upsert: UserUpsertWithoutList_listingsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutLocationsInput {
  create: UserCreateWithoutLocationsInput
  update: UserUpdateWithoutLocationsDataInput
  upsert: UserUpsertWithoutLocationsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutUser_carsInput {
  create: UserCreateWithoutUser_carsInput
  update: UserUpdateWithoutUser_carsDataInput
  upsert: UserUpsertWithoutUser_carsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutClaim_listingsDataInput {
  user_name: String
  rating: Int
  first_name: String
  last_name: String
  email: String
  phone_number: String
  password: String
  locations: LocationUpdateManyWithoutUserInput
  user_cars: CarUpdateManyWithoutUserInput
  current_lng: String
  current_lat: String
  list_listings: ListingUpdateManyWithoutListing_userInput
  balance: Int
}

input UserUpdateWithoutList_listingsDataInput {
  user_name: String
  rating: Int
  first_name: String
  last_name: String
  email: String
  phone_number: String
  password: String
  locations: LocationUpdateManyWithoutUserInput
  user_cars: CarUpdateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingUpdateManyWithoutClaiming_userInput
  balance: Int
}

input UserUpdateWithoutLocationsDataInput {
  user_name: String
  rating: Int
  first_name: String
  last_name: String
  email: String
  phone_number: String
  password: String
  user_cars: CarUpdateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingUpdateManyWithoutClaiming_userInput
  list_listings: ListingUpdateManyWithoutListing_userInput
  balance: Int
}

input UserUpdateWithoutUser_carsDataInput {
  user_name: String
  rating: Int
  first_name: String
  last_name: String
  email: String
  phone_number: String
  password: String
  locations: LocationUpdateManyWithoutUserInput
  current_lng: String
  current_lat: String
  claim_listings: ListingUpdateManyWithoutClaiming_userInput
  list_listings: ListingUpdateManyWithoutListing_userInput
  balance: Int
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserUpsertWithoutClaim_listingsInput {
  update: UserUpdateWithoutClaim_listingsDataInput!
  create: UserCreateWithoutClaim_listingsInput!
}

input UserUpsertWithoutList_listingsInput {
  update: UserUpdateWithoutList_listingsDataInput!
  create: UserCreateWithoutList_listingsInput!
}

input UserUpsertWithoutLocationsInput {
  update: UserUpdateWithoutLocationsDataInput!
  create: UserCreateWithoutLocationsInput!
}

input UserUpsertWithoutUser_carsInput {
  update: UserUpdateWithoutUser_carsDataInput!
  create: UserCreateWithoutUser_carsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  user_name: String
  user_name_not: String
  user_name_in: [String!]
  user_name_not_in: [String!]
  user_name_lt: String
  user_name_lte: String
  user_name_gt: String
  user_name_gte: String
  user_name_contains: String
  user_name_not_contains: String
  user_name_starts_with: String
  user_name_not_starts_with: String
  user_name_ends_with: String
  user_name_not_ends_with: String
  rating: Int
  rating_not: Int
  rating_in: [Int!]
  rating_not_in: [Int!]
  rating_lt: Int
  rating_lte: Int
  rating_gt: Int
  rating_gte: Int
  first_name: String
  first_name_not: String
  first_name_in: [String!]
  first_name_not_in: [String!]
  first_name_lt: String
  first_name_lte: String
  first_name_gt: String
  first_name_gte: String
  first_name_contains: String
  first_name_not_contains: String
  first_name_starts_with: String
  first_name_not_starts_with: String
  first_name_ends_with: String
  first_name_not_ends_with: String
  last_name: String
  last_name_not: String
  last_name_in: [String!]
  last_name_not_in: [String!]
  last_name_lt: String
  last_name_lte: String
  last_name_gt: String
  last_name_gte: String
  last_name_contains: String
  last_name_not_contains: String
  last_name_starts_with: String
  last_name_not_starts_with: String
  last_name_ends_with: String
  last_name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  phone_number: String
  phone_number_not: String
  phone_number_in: [String!]
  phone_number_not_in: [String!]
  phone_number_lt: String
  phone_number_lte: String
  phone_number_gt: String
  phone_number_gte: String
  phone_number_contains: String
  phone_number_not_contains: String
  phone_number_starts_with: String
  phone_number_not_starts_with: String
  phone_number_ends_with: String
  phone_number_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  locations_every: LocationWhereInput
  locations_some: LocationWhereInput
  locations_none: LocationWhereInput
  user_cars_every: CarWhereInput
  user_cars_some: CarWhereInput
  user_cars_none: CarWhereInput
  current_lng: String
  current_lng_not: String
  current_lng_in: [String!]
  current_lng_not_in: [String!]
  current_lng_lt: String
  current_lng_lte: String
  current_lng_gt: String
  current_lng_gte: String
  current_lng_contains: String
  current_lng_not_contains: String
  current_lng_starts_with: String
  current_lng_not_starts_with: String
  current_lng_ends_with: String
  current_lng_not_ends_with: String
  current_lat: String
  current_lat_not: String
  current_lat_in: [String!]
  current_lat_not_in: [String!]
  current_lat_lt: String
  current_lat_lte: String
  current_lat_gt: String
  current_lat_gte: String
  current_lat_contains: String
  current_lat_not_contains: String
  current_lat_starts_with: String
  current_lat_not_starts_with: String
  current_lat_ends_with: String
  current_lat_not_ends_with: String
  claim_listings_every: ListingWhereInput
  claim_listings_some: ListingWhereInput
  claim_listings_none: ListingWhereInput
  list_listings_every: ListingWhereInput
  list_listings_some: ListingWhereInput
  list_listings_none: ListingWhereInput
  balance: Int
  balance_not: Int
  balance_in: [Int!]
  balance_not_in: [Int!]
  balance_lt: Int
  balance_lte: Int
  balance_gt: Int
  balance_gte: Int
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`
      }
    