const { User, Book } = require('./models'); // Import your Mongoose models

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      // Check authentication and retrieve user data
      if (!context.user) {
        throw new Error('Authentication required');
      }
      
      const user = await User.findById(context.user._id).populate('savedBooks');
      return user;
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      // Implement login logic and return an Auth object
    },
    addUser: async (_, { username, email, password }) => {
      // Implement user registration logic and return an Auth object
    },
    saveBook: async (_, args, context) => {
      // Check authentication and add book to user's savedBooks
      if (!context.user) {
        throw new Error('Authentication required');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $addToSet: { savedBooks: args } },
        { new: true }
      ).populate('savedBooks');
      
      return updatedUser;
    },
    removeBook: async (_, { bookId }, context) => {
      // Check authentication and remove book from user's savedBooks
      if (!context.user) {
        throw new Error('Authentication required');
      }

      const updatedUser = await User.findByIdAndUpdate(
        context.user._id,
        { $pull: { savedBooks: { bookId } } },
        { new: true }
      ).populate('savedBooks');
      
      return updatedUser;
    },
  },
};

module.exports = resolvers;
