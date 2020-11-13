
import { json } from 'sequelize';
import { db } from '../../../models';

export default {
    async userList(req, res, next) {
        var { limit, page } = req.query, pages = 0, offset = 0;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;
        console.log(limit, isNaN(limit), page);
        if (isNaN(page) || isNaN(limit)) return next(new RequestError('Invalid params', 400))
        db.User.count({ attributes: ['id'] })
            .then(count => {
                count = count;
                pages = Math.ceil(count / limit);
                offset = limit * (page - 1);
                return db.User.findAll({
                    limit: limit,
                    offset: offset,
                    attributes: ['id', 'firstName', 'lastName', 'avatar']
                }).then(r => [r])
            })
            .then(([r]) => {
                res.status(200).json({ success: 1, data: r, pages: pages, page: page })
            })
            .catch(e => {
                console.log(e);
                next(e)
            })

    },
    async userFriendsList(req, res, next) {
        var { limit, page } = req.query, pages = 0, offset = 0;
        var { userId } = req.params;
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;
        userId = userId ? parseInt(userId) : null;
        console.log(limit, isNaN(limit));
        if (isNaN(userId)) return next(new RequestError('Invalid params', 400))
        db.UserFriend.count({
            where: { userId: userId },
            include: [{
                model: db.User,
                attributes: [],
                required: true
            }]
        })
            .then(count => {
                console.log(count);
                count = count;
                pages = Math.ceil(count / limit);
                offset = limit * (page - 1);
                return db.UserFriend.findAll({
                    limit: limit,
                    offset: offset,
                    raw: true,
                    where: { userId: userId },
                    attributes: [
                        'id',
                        [db.sequelize.literal(`User.firstName`), 'firstName'],
                        [db.sequelize.literal(`User.lastName`), 'lastName'],
                        [db.sequelize.literal(`User.avatar`), 'avatar']
                    ],
                    include: [{
                        model: db.User,
                        attributes: [],
                        required: true
                    }]
                }).then(r => [r])
            })
            .then(([r]) => {
                res.status(200).json({ success: 1, data: r, pages: pages, page: page })
            })
            .catch(e => {
                console.log(e);
                next(e)
            })
    },
    async mutualFriendList(req, res, next) {
        var { userId, friendId } = req.params;
        userId = userId ? parseInt(userId) : null;
        friendId = friendId ? parseInt(friendId) : null;
        if (isNaN(userId)) return next(new RequestError('Invalid params', 400));
        db.UserFriend.findAll({
            attributes: ['userId'],
            where: {
                friendId: friendId
           }
        }).then(async s => {
                s = s.map(a => a.userId )
                return db.UserFriend.findAll({
                    raw: true,
                    where: { userId: userId, friendId: s },
                    attributes: [
                        'id',
                        [db.sequelize.literal(`User.firstName`), 'firstName'],
                        [db.sequelize.literal(`User.lastName`), 'lastName'],
                        [db.sequelize.literal(`User.avatar`), 'avatar']
                    ],
                     include: [{
                        model: db.User,
                        attributes: [],
                        required: true
                    }],
                }).then(r => [r])
            })
            .then(([r]) => {
                res.status(200).json({ success: 1, data: r })
            })
            .catch(e => {
                console.log(e);
                next(e)
            })
    }
}