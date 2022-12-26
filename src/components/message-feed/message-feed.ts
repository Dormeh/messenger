import Block from 'core/Block';

import './message-feed.scss';

interface MessageFeedProps {
    messages:[]
}
export class MessageFeed extends Block {
    constructor({messages}:MessageFeedProps) {
        super({messages});

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
