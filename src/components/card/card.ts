import Block from 'core/Block';

import './card.scss';


interface CardProps {
    userName: string;
    userMessage: string;
    cardTime: string;
    cardMessCount: string;
    photo: string;
    onClick: () => void;
    messages: []
    svg: string;
}

export class Card extends Block {
    static componentName = 'Card';

    constructor({userName, userMessage, messages, cardTime, cardMessCount, photo, svg, onClick}: CardProps) {
        super({
            userName,
            userMessage,
            messages,
            cardTime,
            cardMessCount,
            svg,
            photo,
            events: {click: {fn: onClick, options: false}}
        });
    }

    protected render(): string {
        const lastMessage = this.props.messages ? this.props.messages[this.props.messages.length - 1].text.slice(0, 29) + '...' : ''
        // language=hbs

        return `
                <div class="card">
                    <div class="card__avatar">
                        {{{Avatar svg=svg photo=photo svg=svg avatarClass="card__avatar-container" avatarSvgClass="avatar__svg_midi" avatarName="avatar"}}}
                    </div>
                    <div class="card__preview">
                        <p class="card__user-name">{{userName}}</p>
                        <p class="card__message">${lastMessage}</p>
                    </div>
                    <div class="card__info">
                        <p class="card__time">{{cardTime}}</p>
                        <p class="card__unr-message-count">{{cardMessCount}}</p>
                    </div>
                </div>
        `;
    }
}
