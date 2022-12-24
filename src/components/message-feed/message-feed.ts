import Block from 'core/Block';

import './message-feed.scss';
import messages from 'data/messages.json'


export class MessageFeed extends Block {
    constructor({svg}) {
        super({svg});
        this.setProps({
            messages,
        })
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="message-feed">
                <div class="container">
                    {{#each messages}}
                        {{{Message message=this}}}
                    {{/each}}
                </div>
            </div>
        `;
    }
}
