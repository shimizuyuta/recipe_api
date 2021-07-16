'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('recipes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipe_title: {
        type: Sequelize.STRING
      },
      recipe_url: {
        type: Sequelize.STRING
      },
      recipe_cost: {
        type: Sequelize.INTEGER
      },
      recipe_time: {
        type: Sequelize.DATE
      },
      recipe_description: {
        type: Sequelize.TEXT
      },
      recipe_materials: {
        type: Sequelize.TEXT
      },
      recipe_category: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id'}, // 外部キー
        onUpdate: 'cascade',  // （任意）連動して自動更新する場合
        onDelete: 'cascade'   // （任意）連動して自動削除する場合
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('recipes');
  }
};