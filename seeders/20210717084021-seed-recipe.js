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
     return queryInterface.bulkInsert('Recipes', [
       { recipe_title: 'ハンバーグ',  recipe_url: 'https://recipe.rakuten.co.jp/recipe/1180006148/', recipe_cost: '220', created_at: now, updated_at: now,recipe_time:'40',recipe_description:'ささみときゅうりの冷やし中華っぽい酢の物が食べたかったので。',recipe_materials:'肉,みりん,ゴボウ',recipe_category:'2',user_id:'00a8b048-f1a2-423c-9f93-eb25f40e37d9'},
       { recipe_title: '肉じゃが',  recipe_url: 'https://recipe.rakuten.co.jp/recipe/1180006147/', recipe_cost: '1200', created_at: now, updated_at: now,recipe_time:'33',recipe_description:'豚バラ肉とズッキーニで簡単に作れるおかずです。材料4つで簡単に作れます♪',recipe_materials:'肉,みりん,醤油,貝,砂糖',recipe_category:'2',user_id:'00a8b048-f1a2-423c-9f93-eb25f40e37d9'},
       { recipe_title: 'ビフテキ',  recipe_url: 'https://recipe.rakuten.co.jp/recipe/1180006142/', recipe_cost: '900', created_at: now, updated_at: now,recipe_time:'90',recipe_description:'ささっと簡単、豚バラ肉と夏野菜の味噌味の炒めものです。　ご飯のおかずに、おつまみにお箸が進みます。',recipe_materials:'醤油,貝,砂糖,魚,タコ,イカ,チョコレート',recipe_category:'3',user_id:'210f728d-aeea-4f06-9abb-d3e740f6c29d'},
       { recipe_title: '四郎ラーメン',  recipe_url: 'https://recipe.rakuten.co.jp/recipe/1180006144/', recipe_cost: '200', created_at: now, updated_at: now,recipe_time:'10',recipe_description:'豚バラ肉とズッキーニで簡単に作れるおかずです。材料4つで簡単に作れます♪',recipe_materials:'魚,タコ,イカ,チョコレート,人参,トマト,バナナ',recipe_category:'3',user_id:'00a8b048-f1a2-423c-9f93-eb25f40e37d9'},
       { recipe_title: '唐揚げ',  recipe_url: 'https://recipe.rakuten.co.jp/recipe/1180006145/', recipe_cost: '800', created_at: now, updated_at: now,recipe_time:'30',recipe_description:'ささっと簡単、豚バラ肉と夏野菜の味噌味の炒めものです。　ご飯のおかずに、おつまみにお箸が進みます。',recipe_materials:'イチゴ,ブドウ,みかん,リンゴ',recipe_category:'6',user_id:'00a8b048-f1a2-423c-9f93-eb25f40e37d9'},
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
