import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  allUserResolver,
  skillFrequencyResolver,
  skillsResolver,
  userCreateInputResolver,
  userResolver,
} from "./resolvers.js";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    uid: Int
    name: String!
    company: String
    email: String!
    phone: String!
    skills: [Skill]
  }
  type Skill {
    uid: Int
    skill: String
    rating: Int
    user_uid: Int
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.
  type Query {
    user(uid : Int!): User
    allUsers: [User]
    skillFrequency: [Skill!]!
    skills: [Skill!]
    updateUser(uid : Int!): User
  }
  type Mutation {
    addUser(data: UserCreateInput): User
  }
  input UserCreateInput {
    name: String
    phone: String
    company: String
    email: String!
    skills: [SkillCreateInput]
  }
  input SkillCreateInput {
    skill: String
    rating: Int
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    user: (parent, args, contextValue) =>
      userResolver(parent, args, contextValue),
    skillFrequency: (parent, args, contextValue) =>
      skillFrequencyResolver(parent, args, contextValue),
    skills: (parent, args, contextValue) =>
      skillsResolver(parent, args, contextValue),
    allUsers: (parent, args, contextValue) =>
      allUserResolver(parent, args, contextValue),
  },
  Mutation: {
    addUser: (parent, args, contextValue) =>
      userCreateInputResolver(parent, args, contextValue),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
