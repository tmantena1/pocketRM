import gql from 'graphql-tag';


export const GET_ME = gql`
{
    me {
    _id
      firstName
      lastName
      email
    contacts {
        _id
        firstName
        lastName
        relationship
        email
        phone
        address
        birthday
        occupation
        company
        partner
        partnerName
        children
        childName
        childBirthday
        pets
        petName
        interestsHobbies
        importantDates
        giftIdeas
        metAt
        notes
        reminders
      }
    }
  }
`;
