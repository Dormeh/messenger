import Block from 'core/Block';

import './message.scss';

import {Store} from '../../core'

interface MessageProps {
    message: Record<string, any>;
    onClick: () => void;
}
const store = Store.instance();

export class Message extends Block {
    static componentName = 'Message';
        constructor({message, onClick}: MessageProps) {
        super({message, events: {click: {fn: onClick, options: false}}});
            if (store.getState().user) {
                const userId = store.getState().user.id;
                if (message && userId === message.user_id) {
                    this.setProps({
                        messageSelf: true
                    })
                }
            }

    }

    protected render(): string {
        // language=hbs

        return `
                <div class="message {{#unless messageSelf}}message_other-user{{/unless}}">
                    <p class="message__text">
                        {{message.content}}
                    </p>
                    <p class="message__time">{{message.time}}</p>
                </div>
        `;
    }
}
