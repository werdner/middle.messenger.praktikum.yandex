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

export type SignInRequest = {
    login: string;
    password: string;
};

export type SingUpRequest = {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    password: string;
    confirm_password?: string;
    phone: string;
};
