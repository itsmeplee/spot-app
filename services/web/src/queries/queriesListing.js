import { gql } from 'apollo-boost';

const editListingMutation = gql`
mutation(
  $spot_id: ID, 
  $listing_id: ID, 
  $status: Int,
) {
  editSpotListing(
    spot_id: $spot_id
    listing_id: $listing_id 
    status: $status
  ){
    id
  }
}
`;

const updateListingMutation = gql`
mutation(
  $id: ID, 
  $spot_id: ID, 
  $claimer: Boolean
) {
  editListing(
    id: $id
    claimer: $claimer
    spot_id: $spot_id
  ){
    id
  }
}
`;

const getListingsQuery = gql`
query{
  myListings{
    id
    status
    claiming_user{
      id
      user_name
      user_cars (where: {default_car: true }) {
        id
        color
        default_car
        make
        model
        plate
      }
    }
    listing_user{
      id
      user_name
      user_cars (where: {default_car: true }) {
        id
        color
        default_car
        make
        model
        plate
      }
    }
    spot {
      is_available
      id
      start_time
      end_time
      street1
      street2
      state
      city
    }
  }
}
`;

const CHANGED_LISTINGS_SUBSCRIPTION = gql`
  subscription {
    listingUpdate {
      node {
        id
        status
        spot{
          id
          is_available
          end_time
          start_time
          street1
          street2
          state
          city
        }
        claiming_user {
          user_name
          id
          user_cars (where: {default_car: true }) {
            id
            color
            default_car
            make
            model
            plate
          }
        }
        listing_user {
          user_name
          id
          user_cars (where: {default_car: true }) {
            id
            color
            default_car
            make
            model
            plate
          }
        }
      }
    }
  }
`;


export { editListingMutation, getListingsQuery, updateListingMutation, CHANGED_LISTINGS_SUBSCRIPTION };