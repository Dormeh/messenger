import Block from 'core/Block';

import './chat-list.scss';

interface ChatListProps {
    chats: Record<string, any>[] | [];
    onClick: () => void;
    svg: string;
}

export class ChatList extends Block {
    static componentName = 'ChatList';

    constructor({ onClick, ...props }: ChatListProps) {
        super({ events: { click: { fn: onClick, options: false } }, ...props });
    }

    protected render(): string {
        // language=hbs

        return `
            <div class="chat-list">
                <div class="chat-list__card-splitter"></div>
                {{#each chats}}
                    {{{Card ref=ref
                            lastMessage=last_message
                            photo=avatarUrl
                            chatName=title
                            cardTime=time
                            cardMessCount=unread_count
                            onClick=../onClick
                            chatId=id
                            svg=../svg
                    }}}
                    <div class="chat-list__card-splitter"></div>
                {{/each}}

            </div>
        `;
    }
}
