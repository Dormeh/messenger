import Block from "core/Block";

import './chat-layout.scss';

import chats from 'data/chats.json';
import modalForm from 'data/modalFormInput.json';
import svg from '../../asserts/images/icons_sprite.svg';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import avatar from 'images/avatar.png'
import {Store} from "core/Store";
import {login, logout} from '../../services/auth';
import {chatsCreate, chatsGet} from '../../services/chats';


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
            modalForm,
            svg,
            onClick: (event: MouseEvent): any => this.onClick(event),
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),
            onSubmitChat: (event: MouseEvent): any => this.onSubmitChat(event),
            getChats: (): any => this.getChats(),
            onLogout: () => store.dispatch(logout),
            modalOpen: (event: MouseEvent): any => this.modalOpen(event),
            events: {
                input: {
                    fn: this.onChange.bind(this),
                    options: false
                }
            }

        })

        this.getChats()


    }

    async onSubmitChat(event: MouseEvent) {
        event.preventDefault();
        await this.props.store.dispatch(chatsCreate, {title: this.modalInputValue}).then();
        this.refs.modal.props.modalClose()
        await this.getChats();

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
        // const cardList2: Block[] = [];

        Object.keys(this.refs).forEach(key => {
            if (key.includes('card')) cardList.push(this.refs[key])
        })
        // Object.keys(this.children).forEach(key => {
        //     // console.log(this.children[key])
        //     // if (this.children[key] ) cardList2.push(this.children[key])
        // })
        console.log('cardList', cardList)
        cardList.forEach(card => card.element?.classList.remove('card_active'))

        const card: HTMLElement = event.target.closest('.card');
        const cardRef = cardList.find(elem => elem.element === card);
        card.classList.add('card_active');
        console.log(this)
        this.refs.chat_feed.setProps({
            selectedChat: cardRef
        })
        this.refs.chat_feed.refs.message_feed.setProps({

            messages: cardRef.props.messages || []
        })
        console.log(this.refs.chat_feed.refs.message_feed)

    }

    async getChats() {
        await this.props.store.dispatch(chatsGet,).then();
        console.log(this.props.store.getState().chats)
        this.chats = this.props.store.getState().chats;
        this.loadMessages(this.chats)
    }

    onChange(event: Event) {
        const input = event.target as HTMLInputElement
        if (!input.name || input.name !== 'chat-name') return;
        const inputValue = this.formElem['chat-name'].value
        console.log(inputValue)
        if (inputValue) {
            this.modalButton.disabled = false;
            this.modalInputValue = inputValue;
        }
    }

    modalOpen(event: Event): void {
        const element = event.target as HTMLElement;
        // if (!element.classList.contains('avatar')) return;
        console.log('модальное окно')

        const modal = document.getElementById('modal');

        if (!modal) {
            console.log('выход из модального')
            return;
        }
        modal.style.display = 'block';
        document.body.overflow = 'hidden';
        console.log(this.refs.modal.refs.modalForm.refs.button)
        this.modalButton.disabled = true;


    }

    loadMessages = async (chats = []) => {
        console.log(2222222)
        console.log('chats', chats)
        for (let i = 0; i < chats.length; i++) {
            chats[i].ref = 'card_' + (i + 1);
        }
        for (const chat of chats) {
            chat.messages = await import('data/messages.json')// parcel не импортирует данные по переменным в дальнейшем метод будет получать историю переписки
        }
        this.setProps({
            chats: chats.reverse()
        })
    }

    componentDidMount() {
        this.modalError = this.refs.modal.refs.modalForm.refs.error;
        this.modalButton = this.refs.modal.refs.modalForm.refs.button.element as HTMLButtonElement;
        this.formElem = this.refs.modal.refs.modalForm.element?.children[1] as HTMLFormElement;
        // document.getElementById('input').addEventListener('change', () => this.onClick.bind(this))

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
                            form=modalForm
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
