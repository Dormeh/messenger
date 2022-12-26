import Block from "core/Block";

import messages from 'data/chats.json';
import svg from '../../asserts/images/icons_sprite.svg';
import photo from '../../asserts/images/avatar.png';

export class Chat_page extends Block {
    constructor() {
        super();

        // this.setProps({
        //     messages: messages,
        //     photo,
        //     svg,
        // })


    }

    render() {
        // language=hbs
        return `
            {{#Layout name="Chat" addPageClass="page_chat-theme"}}
                {{{Chat_layout}}}
            {{/Layout}}
        `;
    }
}
