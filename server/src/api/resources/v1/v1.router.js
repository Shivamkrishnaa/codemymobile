import express from 'express';
import v1Controller from './v1.controller';

export const v1Router = express.Router();
v1Router.route('/user').get( v1Controller.userList);
v1Router.route('/user/:userId').get( v1Controller.userFriendsList);
v1Router.route('/user/:userId/:friendId').get( v1Controller.mutualFriendList);

 