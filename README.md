# Hack the North

Hello Hack the North Team! This submission is written with Apollo GraphQL server with it's default HTTP server. I used SQLite with Prisma for database
interactivity. 

## Navigating this Codebase:
- src/context.ts is just boilerplate for Prisma
- src/index.ts has the GraphQL type, mutator, and query definitions
- src/types.ts has the input types for mutators
- src/resolvers.ts has the mutator and query resolvers
- prisma/schema.prisma has my database table definitions


## Quickstart: 

1. Clone the repository
2. Create a .env file and add the following: DATABASE_URL="file:./dev.db" (for the SQLite database)
3. Run npm install
4. Run the server with ```npm start``` to get up and running!

## Explore: 

https://studio.apollographql.com/graph/htn-graph/home?variant=current


