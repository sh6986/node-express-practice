const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            user_id: {
                type: Sequelize.STRING(50),
                allowNull: false    // not null
            },
            user_nm: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            user_pwd: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            del_yn: {
                type: Sequelize.STRING(1),
                allowNull: false
            },
            reg_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            udt_date: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'User',
            tableName: 'user',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.User.hasMany(db.Todo, {foreignKey: 'user_id', sourceKey: 'id'});
    }
};