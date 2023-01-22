import Block from 'core/Block';

import './chat-feed.scss';
import userAddForm from "../../data/userAddForm.json";
import userDelForm from "../../data/userDelForm.json";
import chatDelForm from "../../data/modalFormInput.json";
import popupSvgConfigTop from "../../data/popupConfigTop.json";
import popupSvgConfigBottom from "../../data/popupSvgConfigBottom.json";
import {chatsDelete, userAdd, userDel} from "../../services/chats";
import {Store} from "../../core";
import {userSearch} from '../../services/user'
import type {SendData} from "../form"

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
    store: Store<AppState>
    selectedChat: Block;
}

export class ChatFeed extends Block {
    static componentName = 'ChatFeed';

    constructor({...props}: ChatFeedProps) {
        super({...props});
        this.setProps({
            store: Store.instance(),
            popupOpenTop: (event: MouseEvent): any => this.refs.buttonSvgTop.refs.popup.popupOpen(event),
            popupOpenBottom: (event: MouseEvent): any => this.refs.buttonSvgBottom.refs.popup.popupOpen(event),
            modalOpen: (event: MouseEvent): any => this.modalOpen(event),
            popupSvgConfigTop: popupSvgConfigTop,
            popupSvgConfigBottom: popupSvgConfigBottom

        })

    }

    async initUserSearch(data: Record<string, string>) {
        const response = await userSearch(data);
        return response instanceof Array && response[0] && response[0].id;
    }

    async onSubmitModal({data, form}: SendData) {
        const chatId = this.props.selectedChat.props.chatId;

        let user;
        if (form.title !== "Удалить чат ?") {
            user = await this.initUserSearch(data)
            if (!user) return 'Пользователь не найден'
        }
        switch (form.title) {
            case "Удалить чат ?" :
                await this.props.store.dispatch(chatsDelete, {chatId: this.props.selectedChat.props.chatId})
                break

            case "Добавить пользователя" :
                await this.props.store.dispatch(userAdd, {
                    chatId,
                    users: [user]
                })
                break;

            case "Удалить пользователя" :
                await this.props.store.dispatch(userDel, {
                    chatId,
                    users: [user]
                })

                break;
        }

        this.props.modal().modalClose(); // todo временная заглушка
    }

    modalOpen(event: MouseEvent) {
        if (!event.target.closest('.button-svg')) return;
        let form;
        if (this.refs.buttonSvgTop.refs.popup.refs.button1.element === event.target.closest('.button-svg')) {
            form = userAddForm;
        }
        if (this.refs.buttonSvgTop.refs.popup.refs.button2.element === event.target.closest('.button-svg')) {
            form = userDelForm;

        }
        if (this.refs.buttonSvgTop.refs.popup.refs.buttonDel.element === event.target.closest('.button')) {
            form = chatDelForm;
        }
        if (form) {
            this.props.modal().setProps({
                form: form,
                onSubmit: ({data, form}: SendData) => this.onSubmitModal({data, form})
            })

            this.props.modal().modalOpen()
        }
    }


    protected render(): string {
        const {selectedChat} = this.props;

        const photo = selectedChat && selectedChat.props.photo ? selectedChat.props.photo : '';
        const name = selectedChat ? selectedChat.props.userName : '';

        // language=hbs
        return `
            <div class="chat-feed">

                <div class="container">
                    {{#if selectedChat}}
                        <div class="chat-feed__header">
                            <div class="chat-feed__content-box">
                                {{{Avatar avatarClass="chat-feed_header-avatr"
                                          photo="${photo}"
                                          svg=svg
                                          avatarSvgClass="avatar__svg_mini"
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

                        </div>
                    {{else}}
                        <p class="chat-feed__default-text">Выберете чат</p>
                    {{/if}}

                </div>

            </div>
        `
    }
}
