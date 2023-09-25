import {Router} from 'express';
import {postUserV1} from '../controllers/v1/user.js';
import {login, register, logout} from '../controllers/v1/auth.controller.js';

const appUser = Router();

appUser.post('/register', register);

appUser.post('/login', login);

appUser.post('/logout', logout);

export default appUser;