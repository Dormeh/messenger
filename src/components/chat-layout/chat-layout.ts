import Block from "core/Block";

import './chat-layout.scss';
import chatAddForm from 'data/chatAddForm.json';
import svg from '../../asserts/images/icons_sprite.svg';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import {Store} from "core/Store";
import {chatsCreate, chatsGet} from '../../services/chats';
import type {SendData} from "../form"
import {connectToChatService, sendMessageService} from "../../services/soсket";
import {timeTransform, cloneDeep} from "../../asserts/utils";

export class Chat_layout extends Block {
    static componentName = 'Chat_layout';

    constructor() {
        super();

        this.setProps({
            store: Store.instance(),
            svg,
            form: chatAddForm,
            onClick: (event: MouseEvent): any => this.onClick(event),
            onSubmitMessage: (event: MouseEvent): any => this.onSubmitMessage(event),
            onSubmitChat: (event: MouseEvent): any => this.onSubmitChat(event),
            // loadChats: (): any => this.loadChats(),
            modalOpen: (): any => this.modalOpen(),
            modal: () => this.refs.modal,

        })

        // setInterval(() => this.loadChats().then(), 5000)
        this.loadChats().then();

    }

    modalOpen(event: MouseEvent) {
        this.refs.modal.setProps({
            form: chatAddForm,
            onSubmit: (event: MouseEvent): any => this.onSubmitChat(event)
        })
        this.refs.modal.modalOpen()
    }


    async onSubmitChat({data, form}: SendData) {
        await this.props.store.dispatch(chatsCreate, data);
    }

    async onSubmitMessage(event: MouseEvent): void { //отправка сообщения
        event.preventDefault();

        console.log('Submit')
        const messageInput = this.refs.chat_feed.refs.messageInput
        const inputElem = messageInput.element?.children?.[1].children[0] as HTMLInputElement
        const rules = [{
            type: ValidateRuleType['message'],
            value: inputElem.value as string
        }]

        const errorMessage = validateForm(rules)
        messageInput.refs.error.setProps({errorName: errorMessage['message']})
        setTimeout(() => messageInput.refs.error.setProps({errorName: ''}), 3000)
        console.log({
            message: inputElem.value
        })

        if (inputElem.value) {

            await sendMessageService({message: inputElem.value})
            inputElem.value = '';
            inputElem.focus();
        }
    }


    async onClick(event: MouseEvent) {

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
        await this.props.store.dispatch({selectedChatId: cardRef.props.chatId})
        await connectToChatService();

    }

    async loadChats() {
        await this.props.store.dispatch(chatsGet);

        const chats = this.props.store.getState().chats;
        this.chatsMapProps(chats)
    }


    chatsMapProps = (chats: Record<string, any>[] | [] = []) => {

        for (let i = 0; i < chats.length; i++) {
            chats[i].ref = 'card_' + (i + 1);
            let lastMessage = chats[i].last_message
            if (lastMessage?.content) {
                lastMessage.content = lastMessage.content.length > 30
                    ? lastMessage.content.slice(0, 30) + '...'
                    : lastMessage.content;

                lastMessage.time = timeTransform(lastMessage.time)

            }

        }

        this.setProps({
            chats: chats.reverse()
        })
    }

    componentDidMount() {
        this.props.store.on('changed', (prevState, nextState) => { //todo подписка на обновление store
            const chats = nextState.chats

            if (this.refs.chat_feed.props.selectedChat) {
                let messages = cloneDeep(this.props.store.getState().activeChatMessages)
                    .map(message => {
                        message.time = timeTransform(message.time)
                        return message
                    })
                this.refs.chat_feed.refs.message_feed.setProps({
                    messages
                })

                setTimeout(() => this.feedScroll(), 0)
            }
        })

    }

    feedScroll() {
        const feed = this.refs.chat_feed.element?.querySelector('.chat-feed__preview') // прокрутка страницы
        if (feed) {
            const feedScroll = feed.scrollHeight;
            feed.scroll(0, feedScroll);
        }
    }

    render() {
        // language=hbs
        return `
            <div class="chat-layout">
                <div class="chat-layout__list-header">
                    <nav class="chat-layout__navbar">
                        {{{
                        Button
                                buttonTitle="Добавить чат"
                                buttonClass="button_simple"
                                onClick=modalOpen
                        }}}
                        <a class="chat-layout__link" href="/profile">
                            <span>Профиль</span>
                            <svg class="chat-layout__nav-icon" fill="none">
                                <path d="M1 9L5 5L1 1" stroke="currentColor"/>
                            </svg>

                        </a>
                    </nav>
                    {{{Modal
                            ref="modal"
                            svg=svg
                            form=form
                            onSubmit=onSubmitChat
                            errorAddClass="input_error modal__error"
                    }}}
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
                                lastMessage=last_message
                                photo=avatarUrl
                                chatName=title
                                cardTime=time
                                cardMessCount=unread_count
                                onClick=../onClick
                                chatId=id
                                svg=../svg
                        }}}
                        <div class="chat-layout__card-splitter"></div>
                    {{/each}}

                </div>
                {{{ChatFeed ref="chat_feed"
                            svg=svg
                            onSubmit=onSubmitMessage
                            modal=modal
                            modalForm=modalForm
                }}}
            </div>
        `;
    }
}
