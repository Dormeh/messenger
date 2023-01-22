import Block from "core/Block";

import './chat-layout.scss';

import chats from 'data/chats.json';
import chatAddForm from 'data/chatAddForm.json';
import svg from '../../asserts/images/icons_sprite.svg';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import {Store} from "core/Store";
import {chatsCreate, chatsGet} from '../../services/chats';
import type {SendData} from "../form"
import {connectToChatService, sendMessageService} from "../../services/soket";

export class Chat_layout extends Block {
    static componentName = 'Chat_layout';

    constructor() {
        super();
        const store = Store.instance();

        this.setProps({
            store: Store.instance(),
            svg,
            form: chatAddForm,
            onClick: (event: MouseEvent): any => this.onClick(event),
            onSubmitMessage: (event: MouseEvent): any => this.onSubmitMessage(event),
            onSubmitChat: (event: MouseEvent): any => this.onSubmitChat(event),
            getChats: (): any => this.getChats(),
            modalOpen: (): any => this.modalOpen(),
            modal: () => this.refs.modal,

        })

        this.getChats()

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
        // await this.getChats(); //todo завязал на обновление store
    }

    async onSubmitMessage(event: MouseEvent): void { //отправка сообщения
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

            await sendMessageService({message: inputElem.value})
            inputElem.value = '';
            inputElem.focus();
        }
    }

    async socketConnect(chatId: string) {

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

    async getChats() {
        await this.props.store.dispatch(chatsGet).then();

        this.chats = this.props.store.getState().chats;
        this.loadMessages(this.chats)
    }


    loadMessages = async (chats = []) => {

        for (let i = 0; i < chats.length; i++) {
            chats[i].ref = 'card_' + (i + 1);
        }

        await this.setProps({
            chats: chats.reverse()
        })
    }

    componentDidMount() {
        this.props.store.on('changed', (prevState, nextState) => { //todo подписка на обновление store
            const chats = nextState.chats

            if (this.refs.chat_feed.props.selectedChat) {
                this.refs.chat_feed.refs.message_feed.setProps({

                    messages: this.props.store.getState().activeChatMessages
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
                            <svg class="chat-layout__nav-icon">
                                <use href="{{svg}}#arrow"></use>
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
                                messages=messages
                                photo=avatarUrl
                                userName=title
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
