import Block from "core/Block";

import messages from 'data/chats.json';
import svg from '../../asserts/images/icons_sprite.svg';
import photo from '../../asserts/images/avatar.png';

export class Chat_page extends Block {
    constructor() {
        super();

        // this.setProps({
        //     messages: messages,
        //     photo,
        //     svg,
        // })


    }

    render() {
        // language=hbs
        return `
            {{#Layout name="Chat" addPageClass="page_chat-theme"}}
                {{{Chat_layout}}}
            {{/Layout}}
        `;
    }
}
// /*
// <div class="chat-layout">
// <div class="chat-layout__list-header">
// <nav class="chat-layout__navbar">
// <a class="chat-layout__link" href="index.html">Сменить аккаунт</a>
// <a class="chat-layout__link" href="profile-page.html">
//     <span>Профиль</span>
//     <svg class="chat-layout__nav-icon">
// <use href="{{svg}}#arrow"></use>
//     </svg>
//     </a>
//     </nav>
//     <div class="chat-layout__search-bar">
//     {{{Input ref=searchInput
//     name=search
//     svg=svg
//     placeholder="Поиск"
//     type="text"
//     inputAddClass="chat-layout__seach-input"
//     searchInput="true"
// }}}
// </div>
// </div>
// <div class="chat-layout__list">
// <div class="chat-layout__card-splitter"></div>
// {{#each messages.chats}}
// {{{Card photo=../photo
//     userName=this.userName
//     userMessage=this.message
//     cardTime=this.time
//     cardMessCount=this.unreadMes
// }}}
// <div class="chat-layout__card-splitter"></div>
// {{/each}}
//
// </div>
// <p class="chat-layout__feed">Выберите чат чтобы отправить сообщение</p>
//
// </div>
// */
