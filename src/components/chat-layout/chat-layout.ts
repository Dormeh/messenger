import Block from "core/Block";

import chats from 'data/chats.json';
import svg from '../../asserts/images/icons_sprite.svg';
import photo from '../../asserts/images/avatar.png';

export class Chat_layout extends Block {
    constructor() {
        super();

        this.setProps({
            chats,
            photo,
            svg,
            onClick: (event: MouseEvent): any => this.onClick(event),
        })

    }

    onClick(event: MouseEvent) {
        const cardList: HTMLElement[] = [];
        Object.keys(this.refs).forEach(key => {
            if (key.includes('card')) cardList.push(this.refs[key].element)
        })
        cardList.forEach(card => card.classList.remove('card_active'))
        const card: HTMLElement = event.target.closest('.card');
        card.classList.add('card_active');
    }

    render() {
        // language=hbs
        return `
            <div class="chat-layout">
                <div class="chat-layout__list-header">
                    <nav class="chat-layout__navbar">
                        <a class="chat-layout__link" href="index.html">Сменить аккаунт</a>
                        <a class="chat-layout__link" href="profile-page.html">
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
                        }}}
                    </div>
                </div>
                <div class="chat-layout__list">
                    <div class="chat-layout__card-splitter"></div>
                    {{#each chats}}
                        {{{Card ref=ref
                                photo=../photo
                                userName=this.userName
                                userMessage=this.message
                                cardTime=this.time
                                cardMessCount=this.unreadMes
                                onClick=../onClick
                        }}}
                        <div class="chat-layout__card-splitter"></div>
                    {{/each}}

                </div>
                {{{ChatFeed ref=chat_feed}}}
            </div>
        `;
    }
}
