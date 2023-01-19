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
    selectedChat: Block;
}

export class ChatFeed extends Block {
    static componentName = 'ChatFeed';

    constructor({...props}: ChatFeedProps) {
        super({...props});
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
                            {{{ButtonSVG svg=svg
                                         buttonSvgClass="button-svg_round"
                                         svgClass="button-svg__svg-elem_tree-dots"
                                         svgName="tree-dots"
                             }}}   
                        </div>
                        <div class="chat-feed__preview">
                            {{{MessageFeed ref="message_feed"
                            
                            }}}
                        </div>
                        <div class="chat-feed__footer">
                            {{{ButtonSVG svg=svg
                                         buttonSvgClass="button-svg_round"
                                         svgClass="button-svg__svg-elem_clip"
                                         svgName="clip"
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
