const axios = require('axios')

const postResolver = {
  Query: {
    posts: async () => {
      try {
        let posts = await axios.get('http://localhost:3000/posts')
        return posts.data.data
      } catch (error) {
        console.log(error)
      }
    },
    post: async (_, {_id}) => {
      try {
        let post = await axios.get('http://localhost:3000/posts/'+ _id)
        return post.data.data
      } catch (error) {
        console.log(error)
      }
    },
    selectedPosts: async (_, {userid}) => {
      try {
        let posts = await axios.get('http://localhost:3000/posts/byuser/'+ userid)
        return posts.data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}

module.exports = postResolver
