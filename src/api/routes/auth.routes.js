import {Router} from 'express';
import {postUserV1} from '../controllers/v1/user.js';
import {} from '../controllers/v1/auth.controller.js';

const appUser = Router();

appUser.post('/register', postUserV1);

appUser.post('/login', postUserV1);

export default appUser;