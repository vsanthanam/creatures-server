import { Resolvers } from './generated/graphql';

export const resolvers: Resolvers = {
    Query: {
        berry: (parent, { id }, context, info) => {
            return {
                name: "Leppa Berry",
                id: id
            }
        }
    },
}