const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    contacts: [Contact]
    anniversaries: [Event]
    birthdays: [Event]
    important: [Event]
    reminders: [Event]
  }
  type Event {
  _id: ID
  firstName: String
  lastName: String
  date: String 
  }
  type Contact {
    _id: ID
    firstName: String
    lastName: String
    relationship: String
    email: String
    phone: String
    address: String
    birthday: String
    occupation: String
    company: String
    partner: Boolean
    partnerName: String
    anniversary: String
    children: Boolean
    childName: String
    childBirthday: String
    pets: Boolean
    petName: String
    interestsHobbies: String
    importantDates: String
    giftIdeas: String
    metAt: String
    notes: [Notes]
    reminders: [Reminder]
  }
  type Notes {
    _id: ID
    notes: String
    createdAt: String
  }
  type Reminder {
    _id: ID
    name: String
    date: String
    time: Int
  }
  input ContactInput {
    firstName: String
    lastName: String
    relationship: String
    email: String
    phone: String
    address: String
    birthday: String
    occupation: String
    company: String
    partner: Boolean
    partnerName: String
    anniversary: String
    children: Boolean
    childName: String
    childBirthday: String
    pets: Boolean
    petName: String
    interestsHobbies: String
    importantDates: String
    giftIdeas: String
    metAt: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(userId: ID!): User
    contacts(userID: ID!): User 
    contact(id: ID!): Contact
    birthdays(id: ID!): User 
    anniversaries(id:ID!): User 
    importantDates(id:ID!): User
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    createContact( userId: ID!, input: ContactInput!): User
    deleteContact(id: ID!): Contact
    editContact(id: ID!, input: ContactInput!): Contact
  }
`

module.exports = typeDefs;
// relationship: String
// occupation: String
// phone: Int
// birthday: Int
