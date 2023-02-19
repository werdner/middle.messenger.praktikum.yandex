import {SearchUserRequest, UpdateProfileRequest, UserResponse} from "./types";
import {api} from "../../../core/HTTP";

const user = {
    updateProfile: (body: UpdateProfileRequest): Promise<string> => {
        return api.put('/user/profile', body);
    },
    updateAvatar: (body: FormData): Promise<UserResponse> => {
        return api.put('/user/profile/avatar', body);
    },
    searchUser: (body: SearchUserRequest): Promise<UserResponse[]> => {
        return api.post('/user/search', body);
    },
};

export {user};
