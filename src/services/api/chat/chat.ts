import { api } from '../../../core/HTTP';
import {
    AddUserRequest,
    ChatIdResponse,
    CreateChatsRequest, DeleteChatRequest,
    DeleteChatResponse, DeleteUserRequest, GetChatsRequest,
    GetChatsResponse,
    GetChatTokenResponse,
    GetChatUserRequest, GetUserResponse,
} from './types';

const chat = {
    getChats: (body?: GetChatsRequest): Promise<GetChatsResponse[]> => {
        return api.get('/chats', body);
    },
    getChatUsers: (chatId: number, body?: GetChatUserRequest): Promise<GetUserResponse[]> => {
        return api.get(`/chats/${chatId}/users`, body);
    },
    createChat: (body?: CreateChatsRequest): Promise<ChatIdResponse> => {
        return api.post('/chats', body);
    },
    deleteChat: (body?: DeleteChatRequest): Promise<DeleteChatResponse> => {
        return api.delete('/chats', body);
    },
    getToken: (chatId?: number): Promise<GetChatTokenResponse> => {
        return api.post(`/chats/token/${chatId}`);
    },
    addUser: (body?: AddUserRequest): Promise<string> => {
        return api.put('/chats/users', body);
    },
    deleteUser: (body?: DeleteUserRequest): Promise<string> => {
        return api.delete('/chats/users', body);
    },
};

export { chat };
