const graphql = require('graphql')
const GraphQLDate = require('graphql-date')

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql

const StudentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    _id: { type: GraphQLString },
    image: { type: GraphQLString },
    firstName: { type: GraphQLString },
    middleName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    suffixName: { type: GraphQLString },
    gender: { type: GraphQLString },
    birthDate: { type: GraphQLDate },
    contactNumber: { type: GraphQLString },
    email: { type: GraphQLString },

  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    student: {
      type: StudentType,
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {

      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})