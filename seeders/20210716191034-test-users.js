'use strict';
const { uuid } = require('uuidv4');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const now = new Date();

     return queryInterface.bulkInsert('Users', [
       {id:uuid(), name: '太郎',  email: 'taro@example.com', password: 'taro-password', created_at: now, updated_at: now},
       {id:uuid(), name: '次郎',  email: 'jiro@example.com', password: 'jiro-password', created_at: now, updated_at: now},
       {id:uuid(), name: '三郎',  email: 'saburo@example.com', password: 'saburo-password', created_at: now, updated_at: now},
       {id:uuid(), name: '四郎',  email: 'shiro@example.com', password: 'shiro-password', created_at: now, updated_at: now},
       {id:uuid(), name: '五郎',  email: 'goro@example.com', password: 'goro-password', created_at: now, updated_at: now},
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
