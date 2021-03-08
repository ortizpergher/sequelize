module.exports = {
  up: async queryInterface => {
    queryInterface.createSchema('post');
  },

  down: async queryInterface => {
    queryInterface.dropSchema('post');
  },
};
