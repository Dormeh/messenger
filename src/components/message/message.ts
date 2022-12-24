import Block from 'core/Block';

import './message.scss';

interface MessageProps {
    message: {};
    onClick: () => void;
}

export class Message extends Block {
    constructor({message, onClick}: MessageProps) {
        super({message, events: {click: {fn: onClick, options: false}}});
        // this.setProps({
        //
        // })
    }

    protected render(): string {
        // language=hbs

        return `
                <div class="message {{#if message.user}}message_other-user{{/if}}">
                    <p class="message__text">
                        {{message.text}}
                    </p>
                </div>
        `;
    }
}
