import Block from 'core/Block';

import './chat-feed.scss';

interface ChatFeedProps {
    onSubmit: any;
    onFocus: any;
    onBlur: any;
    onInput: any;
    onChange: any;
    loginValue: string;
    profileMainPage?: boolean;
    svg: string;
}

export class ChatFeed extends Block {

    constructor({onSubmit, onFocus, onBlur, onInput, onChange, loginValue, profileMainPage, svg}: ChatFeedProps) {
        super({onSubmit, onFocus, onBlur, onInput, onChange, loginValue, profileMainPage, svg});
    }

    protected render(): string {

        // language=hbs
        return `
            <div class="chat-feed">
                <div class="container">
                    <div class="chat-feed__header">
                        <div class="chat-feed__content-box">
                        {{{Avatar avatarClass="chat-feed_header-avatr" svg=svg avatarMini=true}}}
                            <p class="chat-feed__user-name">UserName</p>
                        </div>
                        <button class="chat-feed__button">...</button>
                    </div>
                    <div class="chat-feed__preview">
                        {{{MessageFeed svg=svg}}}
                    </div>
                    <div class="chat-feed__footer">
                        <button class="chat-feed__button">...</button>
                        {{{Input inputAddClass="chat-feed__message-input"
                                 placeholder="Сообщение"
                        }}}
                        <button class="chat-feed__button">...</button>

                    </div>
                </div>

            </div>
        `
    }
}
