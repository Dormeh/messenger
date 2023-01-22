import Block from "core/Block";

import './chat-layout.scss';

import chats from 'data/chats.json';
import chatAddForm from 'data/chatAddForm.json';
import svg from '../../asserts/images/icons_sprite.svg';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import avatar from 'images/avatar.png'
import {Store} from "core/Store";
import {login, logout} from '../../services/auth';
import {chatsCreate, chatsGet} from '../../services/chats';
import type {SendData} from "../form"
import {socketInit} from "../../services/soket";

export class Chat_layout extends Block {
    static componentName = 'Chat_layout';
    private modalButton: HTMLButtonElement | undefined;
    private modalError: Block | undefined;
    private formElem: HTMLFormElement | undefined;

    constructor() {
        super();
        const store = Store.instance();

        chats.forEach((elem: {
            avatarUrl?: string
        }) => {
            elem['avatarUrl'] = elem['avatarUrl'] ? avatar : ''
        })

        // this.loadMessages(chats);

        this.setProps({
            store: Store.instance(),
            svg,
            form: chatAddForm,
            socket: socketInit,
            onClick: (event: MouseEvent): any => this.onClick(event),
            onSubmitMessage: (event: MouseEvent): any => this.onSubmitMessage(event),
            onSubmitChat: (event: MouseEvent): any => this.onSubmitChat(event),
            getChats: (): any => this.getChats(),
            modalOpen: (): any => this.modalOpen(),
            modal: () => this.refs.modal,

        })
        // console.log('createChatForm', this.props.createChatForm)

        this.getChats()

    }

    modalOpen(event: MouseEvent) {
        this.refs.modal.setProps({
            form: chatAddForm,
            onSubmit: (event: MouseEvent): any => this.onSubmitChat(event)
        })
        console.log('refs.modal', this.refs.modal)
        this.refs.modal.modalOpen()
    }


    async onSubmitChat({data, form}: SendData) {
        await this.props.store.dispatch(chatsCreate, data);
        // await this.getChats(); //todo завязал на обновление store
    }

    onSubmitMessage(event: MouseEvent): void { //отправка сообщения
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
        console.log(this.props.store.getState().socket)
        this.props.store.getState().socket.send(JSON.stringify({
            content: inputElem.value,
            type: 'message',

        }));
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

    async socketConnect(chatId: string) {

    }

    async onClick(event: MouseEvent) {

        const cardList: Block[] = [];

        Object.keys(this.refs).forEach(key => {
            if (key.includes('card')) cardList.push(this.refs[key])
        })

        // console.log('cardList', cardList)
        cardList.forEach(card => card.element?.classList.remove('card_active'))

        const card: HTMLElement = event.target.closest('.card');
        const cardRef = cardList.find(elem => elem.element === card);
        card.classList.add('card_active');
        // console.log(this)
        this.refs.chat_feed.setProps({
            selectedChat: cardRef
        })
        const chatId = cardRef.props.chatId;
        const userId = this.props.store.getState().user.id;
        await this.props.socket(userId, chatId)
        console.log('socket', this.props.store.getState().socket)

        this.refs.chat_feed.refs.message_feed.setProps({

            messages: cardRef.props.messages || []
        })

    }

    async getChats() {
        await this.props.store.dispatch(chatsGet).then();
        // console.log(this.props.store.getState().chats)
        this.chats = this.props.store.getState().chats;
        this.loadMessages(this.chats)
    }


    loadMessages = async (chats = []) => {
        // console.log(2222222)
        console.log('chats', chats)
        for (let i = 0; i < chats.length; i++) {
            chats[i].ref = 'card_' + (i + 1);
        }
        // for (const chat of chats) {
        //     chat.messages = await import('data/messages.json')// parcel не импортирует данные по переменным в дальнейшем метод будет получать историю переписки
        // }
        await this.setProps({
            chats: chats.reverse()
        })
    }

    componentDidMount() {
        this.props.store.on('changed', (prevState, nextState) => { //todo подписка на обновление store
            const chats = nextState.chats
            console.log('newChats', chats)
            // if (this.props.store.getState().socket) {
            //     this.props.store.getState().socket.send(JSON.stringify({
            //         content: 'TEST',
            //         type: 'message',
            //
            //     }));
            // }
            // this.loadMessages(chats).then()
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
