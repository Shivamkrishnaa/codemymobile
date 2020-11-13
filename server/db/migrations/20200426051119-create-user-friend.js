'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('UserFriends', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			friendId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Users',
					key: 'id'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			deletedAt: {
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('UserFriends');
	}
};