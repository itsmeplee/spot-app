import { gql } from 'apollo-boost';

const getSpotsQuery = gql`
  query OpenSpotQuery {
    openSpot {
      id
      type
      lat
      lng
      start_time
      end_time
      listing {
        id
      }
    }
  }
`;

const addSpotMutation = gql`
  mutation(
    $lat: String,
    $lng: String,
    $type: Int,
    $start_time: DateTime,
    $end_time: DateTime,
    $status: Int,
    $street1: String,
    $street2: String,
    $city: String,
    $state: String,
    $zip: Int,
  ) {
    addListing(
      lat: $lat
      lng: $lng
      type: $type
      start_time: $start_time
      end_time: $end_time
      status: $status
      street1: $street1
      street2: $street2
      state: $state
      zip: $zip
      city: $city
    ){
      id
    }
  }
`;

const editSpotMutation = gql`
  mutation(
    $start_time: DateTime,
    $end_time: DateTime,
    $id: ID
  ) {
    editSpot(
      id: $id
      start_time: $start_time
      end_time: $end_time
    ){
      is_available
    }
  }
`;

export { addSpotMutation, getSpotsQuery, editSpotMutation };