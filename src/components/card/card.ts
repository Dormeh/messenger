import Block from 'core/Block';
import template from "*.hbs";


interface CardProps {
    userName: string;
    userMessage: string;
    cardTime: string;
    cardMessCount:string;
    photo: any;
    onClick: () => void;
}

export class Card extends Block {
    constructor({userName, userMessage, cardTime, cardMessCount, photo, onClick}: CardProps) {
        super({userName, userMessage, cardTime, cardMessCount, photo, events: {click: {fn: onClick, options: false}}});
    }

    protected render(): string {
        // language=hbs

        return `
                <div class="card">
                    <div class="card__avatar">
                        {{{Avatar svg=svg photo=photo avatarClass="card__avatar-container" avatarName="avatar"}}}
                    </div>
                    <div class="card__preview">
                        <p class="card__user-name">{{userName}}</p>
                        <p class="card__message">{{userMessage}}</p>
                    </div>
                    <div class="card__info">
                        <p class="card__time">{{cardTime}}</p>
                        <p class="card__unr-message-count">{{cardMessCount}}</p>
                    </div>
                </div>
        `;
    }
}
