import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { adminQuery } from "./graphql/fields.js"

export const schema= new GraphQLSchema({
    query: new GraphQLObjectType({
        name:"query",
        fields:{
            alluser:{
...adminQuery.allusers
            },
            allcompany:{
                ...adminQuery.allcompany
            }
            // allcompany:{

            // }

        }
    })
})
