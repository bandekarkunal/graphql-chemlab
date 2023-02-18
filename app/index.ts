import { ApolloServer } from "apollo-server-express";
import Resolvers from "./Resolvers";
import express from "express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import Schema from "./Schema";
import { sequelize } from "./Engine/Loaders/database";

async function startApolloServer(schema: any, resolvers: any) {
    const app = express();
    const httpServer = http.createServer(app);


    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    }) as any;


    await server.start(); //start the GraphQL server.

    server.applyMiddleware({ app });

    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve) //run the server on port 4000
    );
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
}


sequelize.authenticate()
    .then(async () => {
        console.log("Database Connected");
    }).catch((err) => {
        console.log(err);
        console.log("An Error Occured: ", String(err));
    })



//in the end, run the server and pass in our Schema and Resolver
startApolloServer(Schema, Resolvers);
