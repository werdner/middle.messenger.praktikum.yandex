export type Message = {
    id: number;
    user_id: number;
    chat_id: number;
    type: string;
    time: string;
    content: string;
    is_read: boolean;
    file: null;
};

export interface IWebSocketChat {
    connect: (args: IConnectFunction) => Promise<IWebSocketChat>;
    sendMessage: (message: string) => void;
    getMessages: () => void;
}

export interface IConnectFunction {
    chatId: number;
    messages: (msg: Message[] | Message) => void;
    opened: () => void;
    closed?: () => void;
    failed?: () => void;
}
