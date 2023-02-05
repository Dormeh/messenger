import Block from 'core/Block';

import './card.scss';


interface CardProps {
    chatName: string;
    userMessage: string;
    cardTime: string;
    cardMessCount: string;
    photo: string;
    onClick: () => void;
    lastMessage: object | null;
    svg: string;
}

export class Card extends Block {
    static componentName = 'Card';

    constructor({lastMessage,onClick, ...props}: CardProps) {
        super({lastMessage, events: {click: {fn: onClick, options: false}}, ...props});

    }

    protected render(): string {

        // language=hbs

        return `
                <div class="card">
                    <div class="card__avatar">
                        {{{Avatar 
                                svg=svg 
                                photo=photo 
                                svg=svg 
                                avatarClass="card__avatar-container" 
                                avatarSvgClass="avatar__svg_midi" 
                                avatarName="avatar"
                        }}}
                    </div>
                    <div class="card__preview">
                        <p class="card__user-name">{{chatName}}</p>
                        <p class="card__message">{{lastMessage.content}}</p>
                    </div>
                    <div class="card__info">
                        <p class="card__time">{{lastMessage.time}}</p>
                        {{#if cardMessCount}}
                        <p class="card__unr-message-count">{{cardMessCount}}</p>
                        {{/if}}
                    </div>
                </div>
        `;
    }
}
