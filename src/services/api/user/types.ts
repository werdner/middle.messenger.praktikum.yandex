export type UpdateProfileRequest = {
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
};

export type SearchUserRequest = {
    login: string;
};

export type UserResponse = {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
};

export type UserIdResponse = {
    id: string;
};

export type UpdatePasswordRequest = {
    oldPassword: string;
    newPassword: string;
};
