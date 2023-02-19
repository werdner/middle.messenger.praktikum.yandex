import {api} from '../../../core/HTTP';

import {UserResponse, UserIdResponse, SignInRequest, SingUpRequest} from './types';

const auth = {
    signin: (body: SignInRequest): Promise<string> => {
        return api.post('/auth/signin', body);
    },
    signup: (body: SingUpRequest): Promise<UserIdResponse> => {
        return api.post('/auth/signup', body);
    },
    logout: (): Promise<void> => {
        return api.post('/auth/logout');
    },
    user: (): Promise<UserResponse> => {
        return api.get('/auth/user');
    },
};

export {auth};
