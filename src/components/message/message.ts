import Block from 'core/Block';

import './message.scss';

import {Store} from '../../core'

interface MessageProps {
    message: {};
    onClick: () => void;
}
const store = Store.instance();

export class Message extends Block {
    static componentName = 'Message';
        constructor({message, onClick}: MessageProps) {
        super({message, events: {click: {fn: onClick, options: false}}});
        const userId = store.getState().user.id;
        if (message && userId === message.user_id) {
            this.setProps({
                messageSelf: true
            })
        }

    }

    protected render(): string {
        // language=hbs

        return `
                <div class="message {{#unless messageSelf}}message_other-user{{/unless}}">
                    <p class="message__text">
                        {{message.content}}
                    </p>
                </div>
        `;
    }
}
