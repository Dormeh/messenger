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
}

export class ChatFeed extends Block {

    constructor({onSubmit, onFocus, onBlur, onInput, onChange, loginValue, profileMainPage}: ChatFeedProps) {
        super({onSubmit, onFocus, onBlur, onInput, onChange, loginValue, profileMainPage});
    }

    protected render(): string {

        // language=hbs
        return `
            <div class="chat-feed">
                <div class="container">
                    <div class="chat-feed__header">
                        <div class="chat-feed__content-box">
                        {{{Avatar avatarClass="chat-feed_header-avatr"}}}
                            <p class="chat-feed__user-name">UserName</p>
                        </div>
                        <button class="chat-feed__button">...</button>
                    </div>
                    <div class="chat-feed__preview">
                        {{{MessageFeed}}}
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
