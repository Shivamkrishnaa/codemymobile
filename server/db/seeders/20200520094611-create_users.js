'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Users', [{
			firstName: 'Bruce',
			lastName: 'Wayne',
			avatar: 'Batman',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			firstName: 'Clark',
			lastName: 'Kent',
			avatar: 'Superman',
			createdAt: new Date(),
			updatedAt: new Date()
		}, {
			firstName: 'Princess',
			lastName: 'Diana',
			avatar: 'WonderWomen',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'Dr',
			lastName: 'Strange',
			avatar: 'Doc',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'Peter',
			lastName: 'Parker',
			avatar: 'SpiderMan',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'Iron',
			lastName: 'Start',
			avatar: 'Iron Man',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'Dwayne',
			lastName: 'John',
			avatar: 'Shazam',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'Harry',
			lastName: 'Potter',
			avatar: 'Magicain',
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			firstName: 'Tony',
			lastName: 'Stark',
			avatar: 'GoldMan',
			createdAt: new Date(),
			updatedAt: new Date()
		}
			, {
			firstName: 'Dr',
			lastName: 'Hulk',
			avatar: 'Hulk',
			createdAt: new Date(),
			updatedAt: new Date()
		}], {});
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Users', { name: ['Bruce', 'Clark', 'Princess'] }, {});
	}
};
