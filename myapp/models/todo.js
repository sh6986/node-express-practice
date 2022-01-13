const Sequelize = require('sequelize');

module.exports = class Todo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            check_yn: {
                type: Sequelize.STRING(1),
                allowNull: false
            },
            del_yn: {
                type: Sequelize.STRING(1),
                allowNull: false
            },
            reg_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            udt_date: {
                type: Sequelize.DATE,
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'Todo',
            tableName: 'todo',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Todo.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'});
    }
};