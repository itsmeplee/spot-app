import { gql } from 'apollo-boost';

const editListingMutation = gql`
mutation(
  $spot_id: ID, 
  $listing_id: ID, 
  $status: Int
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
  $status: Int,
  $claimer: Boolean,
  $time_complete: DateTime
) {
  editListing(
    id: $id
    spot_id: $spot_id
    claimer: $claimer
    status: $status
    time_complete: $time_complete
  ){
    id
  }
}
`;

const getListingsQuery = gql`
query getListings{
  myListings{
    id
    value
    status
    time_complete
    claiming_user{
      id
      user_name
      balance
      current_lat
      current_lng
      user_cars {
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
      balance
      current_lat
      current_lng
      user_cars {
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
      lng
      lat
    }
  }
}
`;

const CHANGED_LISTINGS_SUBSCRIPTION = gql`
  subscription {
    listingUpdate {
      node {
        id
        value
        status
        time_complete
        spot{
          id
          lat
          lng
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
          balance
          id
          current_lat
          current_lng
          user_cars {
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
          balance
          current_lat
          current_lng
          user_cars {
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