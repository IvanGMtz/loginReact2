import {Router} from 'express';
import {postUserV1} from '../controllers/v1/user.js';
import {login, register} from '../controllers/v1/auth.controller.js';

const appUser = Router();

appUser.post('/register', register);

appUser.post('/login', login);

export default appUser;