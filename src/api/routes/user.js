import {Router} from 'express';
import {getUserV1, postUserV1, updateUserV1} from '../controllers/v1/user.js'

const appUser = Router();

appUser.get('/', getUserV1);

appUser.post('/', postUserV1);

export default appUser;