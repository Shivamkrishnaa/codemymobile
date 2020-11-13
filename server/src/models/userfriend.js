export default (sequelize, DataTypes) => {
    const UserFriend = sequelize.define('UserFriend', {
        userId: DataTypes.INTEGER,
        friendId: DataTypes.INTEGER
    }, {
            timestamps: true,
            paranoid: true,
    });
    UserFriend.associate = function (models) {
        models.UserFriend.belongsTo(models.User, { foreignKey: 'friendId' });
    };
    return UserFriend;
};