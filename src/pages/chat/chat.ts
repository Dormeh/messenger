import Block from "core/Block";

export class Chat_page extends Block {
    constructor() {
        super();
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
