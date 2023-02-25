export interface GetChatsResponse {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: LastMessage;
}

export interface LastMessage {
    user: User;
    time: string;
    content: string;
}

export interface User {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
}

export type ChatIdResponse = {
    id: string;
};

export interface DeleteChatResponse {
    userId: number;
    result: Result;
}

export interface Result {
    id: number;
    title: string;
    avatar: string;
}

export interface GetChatTokenResponse {
    token: string;
}

export type AddUserRequest = {
    users: number[];
    chatId: number;
};

export type CreateChatsRequest = {
    title: string;
};

export type DeleteChatRequest = {
    chatId: number;
};

export type DeleteUserRequest = {
    users: number[];
    chatId: number;
};

export type GetChatUserRequest = {
    offset: number;
    limit: number;
    name: string;
    email: string;
};

export type GetChatsRequest = {
    offset?: number;
    limit?: number;
    title?: string;
};

export type GetUserResponse = {
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

