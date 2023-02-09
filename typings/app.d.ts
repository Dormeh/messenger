import {Store} from "../src/core";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];
  interface ImportMeta {
    url: string;
  }
  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    isLoading: boolean;
    FormError: string | null;
    user: User | null;
    chats: Array<[Record<any, any>]> | null;
    selectedChatId: number | null;
    chatError: string | null;
    activeChatMessages: Record<string, any>[] | []
    chatsLoader: number | null;
    test: Record<string, string> | null;
  };
}


export {}
