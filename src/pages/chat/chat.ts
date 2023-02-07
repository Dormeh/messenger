import Block from "core/Block";
import {Store} from "../../core";
import {chatsLoadClearInterval, chatsLoadService} from '../../services/chats'

const store = Store.instance()

export class Chat_page extends Block {
    static componentName = 'ChatPage';

    constructor() {
        super();
        store.dispatch(chatsLoadService)

    }

    componentServiceDestroy() {
        store.dispatch(chatsLoadClearInterval)
    }


    render() {
        // language=hbs
        return `
            {{#Layout name="Chat" addPageClass="page_chat-theme"}}
                {{{Chat_layout ref='chatLayout'}}}
            {{/Layout}}
        `;
    }
}
