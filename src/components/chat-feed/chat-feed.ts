import Block from 'core/Block';

import './chat-feed.scss';
import userAddForm from '../../data/userAddForm.json';
import userDelForm from '../../data/userDelForm.json';
import chatDelForm from '../../data/modalFormInput.json';
import popupSvgConfigTop from '../../data/popupConfigTop.json';
import popupSvgConfigBottom from '../../data/popupSvgConfigBottom.json';
import formAvatar from '../../data/avatarForm.json';
import { chatsDelete, userAdd, userDel } from '../../services/chats';
import { Store } from '../../core';
import {userSearch} from '../../services/user';
import {chatAvatarChg} from '../../services/chats'
import type { SendData } from '../form';
import PopupProps from '../popup';

interface ChatFeedProps {
    onSubmit: any;
    onFocus: any;
    onBlur: any;
    onInput: any;
    onChange: any;
    loginValue: string;
    profileMainPage?: boolean;
    modalForm: {};
    modal: () => Block;
    svg: string;
    store: Store<AppState>;
    selectedChat: Block | null;
}

export class ChatFeed extends Block {
    static componentName = 'ChatFeed';
    private popupRefs: { [p: string]: Block } | undefined;

    constructor({ ...props }: ChatFeedProps) {
        super({ ...props });
        this.setProps({
            store: Store.instance(),
            popupOpenTop: (event: MouseEvent): any => this.refs.buttonSvgTop.refs.popup.popupOpen(event),
            popupOpenBottom: (event: MouseEvent): any => this.refs.buttonSvgBottom.refs.popup.popupOpen(event),
            modalOpen: (event: MouseEvent): any => this.modalOpen(event),
            popupSvgConfigTop: popupSvgConfigTop,
            popupSvgConfigBottom: popupSvgConfigBottom,
        });
    }

    async initUserSearch(data: Record<string, string>) {
        const response = await userSearch(data);
        return response instanceof Array && response[0] && response[0].id;
    }

    async onSubmitModal({ data, form, file }: SendData) {
        const chatId = this.props.store.getState().selectedChatId;

        let user;

        if (form && !['remove-chat', 'avatar'].includes(<string>form.type)) {
            user = await this.initUserSearch(data);
            if (!user) return 'Пользователь не найден';
        }
        switch (form?.type) {
            case 'remove-chat':
                await this.props.store.dispatch(chatsDelete, { chatId });

                break;

            case 'add-user':
                await this.props.store.dispatch(userAdd, {
                    chatId,
                    users: [user],
                });
                break;

            case 'remove-user':
                await this.props.store.dispatch(userDel, {
                    chatId,
                    users: [user],
                });

                break;
            case 'avatar':
                if (file) {
                    const formData = new FormData();
                    formData.append('chatId', chatId);
                    formData.append('avatar', file);

                    if (process.env.DEBUG) console.log('ОТПРАВКА ФАЙЛА');
                    await this.props.store.dispatch(chatAvatarChg, formData);

                }
        }
        const error = this.props.store.getState().FormError

        if (error) return error;

        switch (form?.type) {
            case 'avatar':
                const photo = this.props.store.getState().chats
                    .find(chat => chat.id === this.props.store.getState().selectedChatId)
                    .avatar
                if (photo) this.refs.avatar.setProps({photo})
                break;
            case 'remove-chat':
            this.setProps({selectedChat: null,});
        }

        this.props.modal().modalClose();
    }

    modalOpen(event: MouseEvent) {
        if (!event.target || !event.target.closest('.button-svg, .avatar')) return;
        this.elemInit();
        let form;
        let avatar = false;
        if (!this.popupRefs) return;

        switch (event.target.closest('.button-svg, .button, .avatar')) {
            case this.popupRefs.button1.element:
                form = userAddForm;

                break;
            case this.popupRefs.button2.element:
                form = userDelForm;

                break;
            case this.popupRefs.buttonDel.element:
                form = chatDelForm;

                break;
            case this.refs.avatar.element:
                form= formAvatar;
                avatar = true;

                break;
        }

        if (form) {
            this.props.modal().setProps({
                form: form,
                onSubmit: ({ data, form, file }: SendData) => this.onSubmitModal({ data, form, file }),
                file: avatar,
                modalClass: avatar ? "modal_avatar" : ""
            });

            this.props.modal().modalOpen();
        }
    }
    elemInit() {
        this.popupRefs = this.refs.buttonSvgTop && this.refs.buttonSvgTop.refs.popup.refs;
    }

    protected render(): string {
        const { selectedChat } = this.props;

        const photo = selectedChat && selectedChat.props.photo ? selectedChat.props.photo : '';
        const name = selectedChat ? selectedChat.props.chatName : '';

        // language=hbs
        return `
            <div class="chat-feed">

                <div class="container">
                    {{#if selectedChat}}
                        <div class="chat-feed__header">
                            <div class="chat-feed__content-box">
                                {{{Avatar avatarClass="chat-feed_header-avatr chat-feed__avatar-container chat-feed__avatar-container_chng"
                                          photo="${photo}"
                                          svg=svg
                                          avatarSvgClass="avatar__svg_mini"
                                          onClick=modalOpen
                                          ref="avatar"
                                   }}}
                                <p class="chat-feed__user-name">${name}</p>
                            </div>
                            {{{ButtonSVG 
                                         ref="buttonSvgTop"
                                         svg=svg
                                         buttonSvgClass="button-svg_round"
                                         svgClass="button-svg__svg-elem_tree-dots"
                                         svgName="tree-dots"
                                         onClick=popupOpenTop
                                         popupClass='popup_top'
                                         popupAdd=true
                                         popupModalOpen=modalOpen
                                         submitButton="Удалить чат"
                                         popupSvgConfig=popupSvgConfigTop
                             }}}   
                        </div>
                        <div class="chat-feed__preview">
                            {{{MessageFeed ref="message_feed"
                            
                            }}}
                        </div>
                        <div class="chat-feed__footer">
                            {{{ButtonSVG 
                                         ref="buttonSvgBottom"
                                         svg=svg
                                         buttonSvgClass="button-svg_round"
                                         svgClass="button-svg__svg-elem_clip"
                                         onClick=popupOpenBottom
                                         svgName="clip"
                                         popupClass='popup_bottom'
                                         popupAdd=true
                                         popupSvgConfig=popupSvgConfigBottom


                             }}}
                             <form class="chat-feed__message-form">
                                    {{{Input ref="messageInput"
                                             inputAddClass="chat-feed__message-input"
                                             placeholder="Сообщение"
                                             name="message"
                                             messageInput=true
                                             eventBlurOff=true
                                             errorAddClass="input_message-error"
                                    }}}
                                    {{{ButtonSVG svg=svg
                                                  buttonSvgClass="button-svg_round button-svg_primary"
                                                  svgClass="button-svg__svg-elem_arrow-back"
                                                  onClick=onSubmit
                                                  svgName="arrow-back"
                                      }}}
                             
                            </form>

                        </div>
                    {{else}}
                        <p class="chat-feed__default-text">Выберете чат</p>
                    {{/if}}

                </div>

            </div>
        `;
    }
}
