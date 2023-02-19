type Handler = (...args: unknown[]) => void;

export class EventBus {
    private readonly listeners?: Record<string, Handler[]>;
    static _instance: EventBus


    constructor() {
        if (EventBus._instance) {
            return EventBus._instance
        }
        this.listeners = {};

        EventBus._instance = this
    }

    on(event: string, callback: Handler) {
        if (!this.listeners) return

        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    }

    off(event: string, callback: Handler) {
        if (!this.listeners) return

        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter(
            listener => listener !== callback,
        );
    }

    emit(event: string, ...args: unknown[]) {
        if (!this.listeners) return

        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
