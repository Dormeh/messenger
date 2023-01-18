import Block from "core/Block";

import './chat-layout.scss';

import chats from 'data/chats.json';
import svg from '../../asserts/images/icons_sprite.svg';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import avatar from 'images/avatar.png'
import {Store} from "core/Store";
import { logout } from '../../services/auth';


export class Chat_layout extends Block {
    static componentName = 'Chat_layout';

    constructor() {
        super();
        const store = Store.instance();

        chats.forEach((elem: {
            avatarUrl?: string
        }) => {
            elem['avatarUrl'] = elem['avatarUrl'] ? avatar : ''
        })

        this.loadMessages(chats);

        this.setProps({
            svg,
            onClick: (event: MouseEvent): any => this.onClick(event),
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),
            onLogout: () => store.dispatch(logout),
        })

    }

    onSubmit(event: MouseEvent): void {
        console.log('Submit')
        const messageInput = this.refs.chat_feed.refs.messageInput
        const inputElem = messageInput.element?.children?.[1].children[0] as HTMLInputElement
        const rules = [{
            type: ValidateRuleType['message'],
            value: inputElem.value as string
        }]

        const errorMessage = validateForm(rules)
        messageInput.refs.error.setProps({errorName: errorMessage['message']})
        console.log({
            message: inputElem.value
        })
        if (inputElem.value) {

            const newMessage = {
                "text": inputElem.value,
            }
            const oldMessages = this.refs.chat_feed.refs.message_feed.props.messages || [];
            oldMessages.push(newMessage);
            this.refs.chat_feed.refs.message_feed.setProps({
                messages: oldMessages
            })
            inputElem.value = '';
            inputElem.focus();
            const feed = this.refs.chat_feed.element?.querySelector('.chat-feed__preview')
            if (feed) {
                const feedScroll = feed.scrollHeight;
                feed.scroll(0, feedScroll);
            }
        }
    }

    onClick(event: MouseEvent) {

        const cardList: Block[] = [];
        Object.keys(this.refs).forEach(key => {
            if (key.includes('card')) cardList.push(this.refs[key])
        })
        cardList.forEach(card => card.element?.classList.remove('card_active'))

        const card: HTMLElement = event.target.closest('.card');
        const cardRef = cardList.find(elem => elem.element === card);
        card.classList.add('card_active');

        this.refs.chat_feed.setProps({
            selectedChat: cardRef
        })
        this.refs.chat_feed.refs.message_feed.setProps({

            messages: cardRef.props.messages || []
        })

    }

    loadMessages = async (chats = []) => {
        for (const chat of chats) {
            chat.messages = await import('data/messages.json')// parcel не импортирует данные по переменным в дальнейшем метод будет получать историю переписки
        }
        this.setProps({
            chats
        })
    }


    render() {
        // language=hbs
        return `
            <div class="chat-layout">
                <div class="chat-layout__list-header">
                    <nav class="chat-layout__navbar">
<!--                        <a class="chat-layout__link" href="/auth">Сменить аккаунт</a>-->
                        {{{
                            Button
                                buttonTitle="Сменить аккаунт"
                                buttonClass="button_simple"
                                onClick=onLogout
                        }}}
                        <a class="chat-layout__link" href="/profile">
                            <span>Профиль</span>
                            <svg class="chat-layout__nav-icon">
                                <use href="{{svg}}#arrow"></use>
                            </svg>
                        </a>
                    </nav>
                    <div class="chat-layout__search-bar">
                        {{{Input ref="searchInput"
                                 name=search
                                 svg=svg
                                 placeholder="Поиск"
                                 type="text"
                                 inputAddClass="chat-layout__seach-input"
                                 searchInput="true"
                                 eventFocusOff=true
                                 eventBlurOff=true
                        }}}
                    </div>
                </div>
                <div class="chat-layout__list">
                    <div class="chat-layout__card-splitter"></div>
                    {{#each chats}}
                        {{{Card ref=ref
                                messages=messages
                                photo=avatarUrl
                                userName=userName
                                cardTime=time
                                cardMessCount=unreadMes
                                onClick=../onClick
                                svg=../svg
                        }}}
                        <div class="chat-layout__card-splitter"></div>
                    {{/each}}

                </div>
                {{{ChatFeed ref="chat_feed"
                            svg=svg
                            onSubmit=onSubmit
                }}}
            </div>
        `;
    }
}
