import Block from 'core/Block';

import '../../components/profile/profile.scss';
import {userDataToForm} from '../../asserts/utils'
import form from 'data/profile.json';
import formPassword from 'data/password.json';
import formAvatar from 'data/avatarForm.json';
import {Store} from "core/Store";
import {passwordChg, userChg, avatarChg} from '../../services/user'
import svg from 'images/icons_sprite.svg';
import {logout} from "../../services/auth";
import type {SendData} from "../../components/form"

interface Event {
    event: MouseEvent;
    readonly target: HTMLElement | null;

    preventDefault(): void

    tagName: string;
}

export class ProfilePage extends Block {
    static componentName = 'ProfilePage';
    // private form: HTMLCollection | undefined;
    // private formElems: Record<string, HTMLElement> | undefined;
    // private formRefs: { [p: string]: Block; } | undefined;
    // private modalButton: HTMLButtonElement | undefined;
    // private modalError: Block | undefined;
    // private formElem: HTMLFormElement | undefined;

    constructor(props) {
        super(props);
        const userData = Store.instance().getState().user;
        this.setProps({
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),
            onLogout: () => Store.instance().dispatch(logout),
            onSubmitFile: (event: MouseEvent) => this.onSubmitFile(event),
            form: userDataToForm(userData, props.pageType && props.pageType === 'password' ? formPassword : form),
            formAvatar,
            store: Store.instance() as Store<AppState>,
            backLink: props.pageType ? '/profile' : '/chat',
            svg,
            photo: Store.instance().getState().user.avatar && `${process.env.API_ENDPOINT}/resources${Store.instance().getState().user.avatar}`,
            userName: Store.instance().getState().user.display_name || 'User',
            profileMainPage: !props.pageType,

            modalOpen: (event: MouseEvent): any => this.refs.modal.modalOpen(event),

        })

    }


    async onSubmitFile({file}: Record<string, File>) {
        if (file) {
            const formData = new FormData();
            formData.append("avatar", file);

            await this.props.store.dispatch(avatarChg, formData);
            console.log('ОТПРАВКА ФАЙЛА')
        }
        return this.props.store.getState().FormError
    }

    async onSubmit({data, form}: SendData): Promise<void> {
        if (data.newPassword_confirm) {
            delete data.newPassword_confirm;
            await this.props.store.dispatch(passwordChg, data);
        } else {
            await this.props.store.dispatch(userChg, data);
        }
        return this.props.store.getState().FormError
    }

    elemInit() {

    }


    render() {
        // language=hbs
        return `
            {{#Layout name="Profile" addPageClass="page_chat-theme"}}
                <img src="../../asserts/images/icons_sprite.svg" alt="">
                <div class="chat-layout profile">
                    <div class="profile__nav-back">
                        <a href="{{backLink}}">
                            <svg class="profile__svg">
                                <use href="{{svg}}#arrow-back"></use>
                            </svg>
                        </a>
                    </div>
                    {{{Modal
                            ref="modal"
                            svg=svg
                            form=formAvatar
                            onSubmit=onSubmitFile
                            errorAddClass="input_error modal__error"
                            file=true
                            modalClass="modal_avatar"
                    }}}
                    <div class="profile__preview {{#if profileMainPage}}profile__preview_inactive{{/if}}">
                        <div class="container container_profile">

                            <div class="profile__avatar-preview">
                                {{{Avatar ref=profileAvatar
                                          avatarClass="profile__avatar-container profile__avatar-container_chng"
                                          svg=svg
                                          photo=photo
                                          onClick=modalOpen
                                }}}
                                <h3 class="profile__user-title">{{userName}}</h3>
                            </div>

                            {{{Form
                                    ref="form"
                                    form=form
                                    onSubmit=onSubmit
                                    errorName=errorName
                                    profileMainPage=profileMainPage
                                    errorAddClass="input_error form__error"
                            }}}
                            {{#if profileMainPage}}
                                <div class="profile__change-controls">
                                    <div class="profile__string">
                                        <a href="/profile/edit" class="profile__link">Изменить данные</a>
                                    </div>
                                    <div class="profile__string">
                                        <a href="/profile/password" class="profile__link">Изменить пароль</a>
                                    </div>
                                    <div class="profile__string">
                                        {{{Button
                                                buttonTitle="Выйти"
                                                buttonClass="button_simple profile__link_red"
                                                onClick=onLogout
                                        }}}
                                    </div>
                                </div>
                            {{/if}}
                        </div>
                    </div>
                </div>
            {{/Layout}}

        `;
    }
}

