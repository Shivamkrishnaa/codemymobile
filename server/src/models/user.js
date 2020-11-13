
export default (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        avatar: DataTypes.STRING
    }, {
            timestamps: true,
            paranoid: true,
        });
    User.associate = function (models) {
        models.User.hasMany(models.UserFriend, {foreignKey: 'friendId'});/* 
        // models.User.belongsTo(models.UserFriend, {foreignKey: 'friendId'}); */
    };
    return User;
};