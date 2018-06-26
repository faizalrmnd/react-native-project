import ApolloClient from "apollo-boost"

const client = new ApolloClient({
  uri: "http://35.240.143.97/graphql"
})

export default client