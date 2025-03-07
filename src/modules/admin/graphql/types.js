import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";


export const alluserType= new GraphQLList(new GraphQLObjectType({
    name: "users",
    fields: {
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        email: { type: GraphQLString },
        DOB: { type: GraphQLString },
         mobileNumber: { type: GraphQLString }
    }
}));


export const allcompanyType= new GraphQLList(new GraphQLObjectType({
    name: "company",
    fields: {
        _id: { type: GraphQLID },
        companyName: { type: GraphQLString },
        description: { type: GraphQLString },
        companyEmail: { type: GraphQLString },
        numberOfEmployees: { type: GraphQLString },
        address: { type: GraphQLString },
    }
}));