import { gql } from 'apollo-boost';

const signupQuery = gql`
  mutation SignupMutation(
    $email: String!,
    $password: String!
    $user_name: String!,
  ) {
    signup(
      email: $email
      password: $password
      user_name: $user_name
    ) {
      token
    }
  }
`;

const loginQuery = gql`
  mutation LoginMutation(
    $email: String!,
    $password: String!,
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

const getUserQuery = gql`
  query getUserQuery {
    userInfo {
      user_name
      first_name
      last_name
      rating
      balance
      user_cars {
        make
        model
        color
        default_car
        plate
        size
        state
      }
      locations {
        id
        lat
        lng
        street1
        street2
        city
        state
        zip
      }
    }
  }
`;

const mutationUser = gql`
  mutation(
    $user_name: String,
    $first_name: String,
    $last_name: String,
    $current_lng: String,
    $current_lat: String
  ) {
    editUser(
      user_name: $user_name
      first_name: $first_name
      last_name: $last_name
      current_lat: $current_lat
      current_lng: $current_lng
    ){
      user_name
      first_name
      last_name
      current_lng
      current_lat
    }
  }
`;

const mutationUserCurrentLocation = gql`
  mutation(
    $current_lng: String,
    $current_lat: String
  ) {
    editUser(
      current_lat: $current_lat
      current_lng: $current_lng
    ){
      current_lng
      current_lat
    }
  }
`;

const editUserBalance = gql`
  mutation(
    $value: Int
    $listerId: ID
  ) {
    updateBalance(
      value: $value
      listerId: $listerId
    ){
      balance
    }
  }
`;


export { signupQuery, loginQuery, getUserQuery, mutationUser, mutationUserCurrentLocation, editUserBalance };