import Block from "core/Block";

export class Chat_page extends Block {
    static componentName = 'ChatPage';
    constructor() {
        super();

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
