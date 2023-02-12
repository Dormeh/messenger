import Block from 'core/Block';

import './chat-layout.scss';
import chatAddForm from 'data/chatAddForm.json';
import svg from '../../asserts/images/icons_sprite.svg';
import { validateForm, ValidateRuleType } from '../../asserts/utils/validateForm';
import { Store } from 'core/Store';
import { chatsCreate, chatsGet } from '../../services/chats';
import type { SendData } from '../form';
import { connectToChatService, sendMessageService } from '../../services/soсket';
import { timeTransform, cloneDeep, isEqual } from '../../asserts/utils';

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
            modalOpen: (): any => this.modalOpen(),
            modal: () => this.refs.modal,
        });

        this.loadChats().then();
    }

    modalOpen(event: MouseEvent) {
        this.refs.modal.setProps({
            form: chatAddForm,
            onSubmit: (event: MouseEvent): any => this.onSubmitChat(event),
        });
        this.refs.modal.modalOpen();
    }

    async onSubmitChat({ data, form }: SendData) {
        await this.props.store.dispatch(chatsCreate, data);
        this.refs.modal.modalClose();
    }

    async onSubmitMessage(event: MouseEvent): Promise<void> {
        event.preventDefault();
        if (process.env.DEBUG) console.log('Submit');

        const messageInput = this.refs.chat_feed.refs.messageInput;
        const inputElem = messageInput.element?.children?.[1].children[0] as HTMLInputElement;
        const rules = [
            {
                type: ValidateRuleType['message'],
                value: inputElem.value as string,
            },
        ];

        const errorMessage = validateForm(rules);
        messageInput.refs.error.setProps({ errorName: errorMessage['message'] });
        setTimeout(() => messageInput.refs.error.setProps({ errorName: '' }), 3000);
        if (process.env.DEBUG) console.log({ message: inputElem.value });

        if (inputElem.value) {
            await sendMessageService({ message: inputElem.value });
            inputElem.value = '';
            inputElem.focus();
        }
    }

    activeCardSelect(selectedChat: Block | null): Block | undefined {
        const chatList = this.refs.chat_list;

        if (!selectedChat) return;
        Object.keys(chatList.refs).forEach((key) => {
            if (key.includes('card')) chatList.refs[key].element?.classList.remove('card_active');
        });
        const chatRef = Object.values(chatList.refs).find((ref) => ref.props.chatId === selectedChat);
        if (chatRef) {
            chatRef.element?.classList.add('card_active');
        }
        return chatRef;
    }

    async onClick(event: MouseEvent) {
        const chatList = this.refs.chat_list;
        const card: HTMLElement = event.target?.closest('.card');
        const cardRef = Object.values(chatList.refs).find((ref) => ref.element === card);
        if (cardRef) {
            await this.props.store.dispatch({ selectedChatId: cardRef.props.chatId });
        }
    }

    async loadChats() {
        await this.props.store.dispatch(chatsGet);

        const chats = this.props.store.getState().chats;
        this.chatsMapProps(cloneDeep(chats));
    }

    chatsMapProps = (chats: Record<string, any>[] | [] = []) => {
        for (let i = 0; i < chats.length; i++) {
            chats[i].ref = 'card_' + (i + 1);
            const lastMessage = chats[i].last_message;
            if (lastMessage?.content) {
                lastMessage.content =
                    lastMessage.content.length > 30 ? lastMessage.content.slice(0, 30) + '...' : lastMessage.content;

                lastMessage.time = timeTransform(lastMessage.time);
            }
        }

        this.chatsShow(chats).then();
    };

    async chatsShow(chats: Record<string, any>[]) {
        this.refs.chat_list.setProps({
            chats: chats.reverse(),
        });
        const selectedChat = this.props.store.getState().selectedChatId;

        const activeCard = this.activeCardSelect(selectedChat);
        const selectedCardId = this.refs.chat_feed.props.selectedChat?.props.chatId;
        if (process.env.DEBUG) console.log('selectedCardId', selectedCardId);

        if (selectedChat && selectedChat !== selectedCardId) {
            this.refs.chat_feed.setProps({
                selectedChat: activeCard,
            });
            await connectToChatService();
        }
    }

    componentDidMount() {
        this.props.store.on('changed', this.storeCallback);
    }
    storeCallback = (prevState, nextState) => {
        if (nextState.chats && !isEqual(prevState.chats, nextState.chats)) {
            if (process.env.DEBUG) console.log('чаты поменялись');
            const chats = nextState.chats;
            this.chatsMapProps(cloneDeep(chats));
        }
        if (nextState.selectedChatId && prevState.selectedChatId !== nextState.selectedChatId) {
            if (process.env.DEBUG) console.log('выделить чат');
            this.chatsMapProps(cloneDeep(prevState.chats));
        }
        const chatFeedSelChat = this.refs.chat_feed.props.selectedChat;

        if (chatFeedSelChat && nextState.activeChatMessages && nextState.activeChatMessages.length) {
            if (process.env.DEBUG) console.log('сообщения поменялись');

            const messages = cloneDeep(this.props.store.getState().activeChatMessages).map((message) => {
                message.time = timeTransform(message.time);
                return message;
            });
            this.refs.chat_feed.refs.message_feed.setProps({
                messages,
            });
            this.props.store.dispatch(chatsGet);
            setTimeout(() => this.feedScroll(), 0);
        }
    };

    feedScroll() {
        const feed = this.refs.chat_feed.element?.querySelector('.chat-feed__preview');
        if (feed) {
            const feedScroll = feed.scrollHeight;
            feed.scroll(0, feedScroll);
        }
    }
    destroy() {
        super.destroy();
        this.props.store.off('changed', this.storeCallback);
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
                {{{ChatList ref="chat_list"
                            chats=chats
                            onClick=onClick
                            svg=svg
                }}}
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
