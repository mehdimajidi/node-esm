import express from "express";
import { ApolloServer, gql } from "apollo-server-express";

const authors = [
  {
    id: 1,
    author: "Marijn Haverbeke",
  },
  {
    id: 2,
    author: "Nicolás Bevacqua",
  },
  {
    id: 3,
    author: "Nicholas C. Zakas",
  },
];

const booksData = [
  {
    id: 1,
    title: "Eloquent JavaScript, Third Edition",
    subtitle: "A Modern Introduction to Programming",
    authorId: 1,
  },
  {
    id: 2,
    title: "Practical Modern JavaScript",
    subtitle: "Dive into ES6 and the Future of JavaScript",
    authorId: 1,
  },
  {
    id: 3,
    title: "Understanding ECMAScript 6",
    subtitle: "The Definitive Guide for JavaScript Developers",
    authorId: 2,
  },
  {
    id: 4,
    title: "Speaking JavaScript",
    subtitle: "An In-Depth Guide for Programmers",
    authorId: 3,
  },
];

const typeDefs = gql`
  type Book {
    id: Int
    title: String
    subtitle: String
    author: Author
  }

  type Author {
    id: Int
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => {
      return booksData;
    },
  },
  Mutation: {
    addBook: (_, args) => {
      const value = {
        id: 5,
        ...args.input,
      };
      booksData.push(value);
      return value;
    },
  },
  Book: {
    author: (root) => {
      return authors.find((a) => a.id === root.authorId);
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
