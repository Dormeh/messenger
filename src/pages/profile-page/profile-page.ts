import Block from 'core/Block';

import form from 'data/profile.json';
import formPassword from 'data/password.json';

import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import svg from 'images/icons_sprite.svg';

interface Event {
    event: MouseEvent;
    readonly target: HTMLElement | null;
    preventDefault(): void
    tagName: string;


}

export class ProfilePage extends Block {

    constructor() {
        super();

        this.setProps({
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),

            form,
            svg,
            profileMainPage: true,
            events: {
                click: {
                    fn: this.onClick.bind(this),
                    options: false
                }
            }
        })

    }

    onClick(event: Event): void {
        event.preventDefault();

        if (event.target?.tagName !== "A") return;
        const navPath = event.target.attributes.href.value.split('.')[0]

        if (navPath === 'profile-chng-data') {
            this.setProps({
                profileMainPage: false
            })
        }
        if (navPath === 'profile-chng-pswd') {
            this.setProps({
                profileMainPage: false,
                form: formPassword
            })
        }
    }


    onSubmit(event: MouseEvent): void {
        this.componentDidMount();
        event.preventDefault();

        const rules = Object.keys(this.formElems as object).map(key => {
            const value2 = key === 'newPassword_confirm' && this.formElems['newPassword'].value;
            return {
                type: ValidateRuleType[key],
                value: this.formElems[key].value,
                value2
            }
        })

        const errorMessage = validateForm(rules)

        Object.keys(this.formRefs as object).forEach(key => this.formRefs[key].refs.error.setProps({errorName: errorMessage[this.formRefs[key].props.name]}))

        const formValues = Object.entries(this.formElems).reduce((acc, [key, item]) => {
            acc[key] = item.value;
            return acc;
        }, {})
        console.log(formValues)
    }

    componentDidMount() {
        this.form = this.refs.form.element?.children[1].elements as HTMLCollection;
        this.formElems = Object.keys(this.form as object).filter((key: any) => isNaN(+key)).reduce((acc, key) => {
            acc[key] = this.form[key]
            return acc
        }, {})
        this.formRefs = this.refs.form.refs

    }


    render() {
        // language=hbs
        return `
            {{#Layout name="Profile" addPageClass="page_chat-theme"}}
                <div class="chat-layout profile">
                    <div class="profile__nav-back">
                        <a href="chat-page.html">
                            <svg class="profile__svg">
                                <use href="{{svg}}#arrow-back"></use>
                            </svg>
                        </a>
                    </div>
                    <div class="profile__preview {{#if profileMainPage}}profile__preview_inactive{{/if}}">
                        <div class="container container_profile">
                            <div class="profile__avatar-preview">
                                {{{Avatar avatarClass="profile__avatar-container profile__avatar-container_chng"
                                          svg=svg
                                }}}
                                <h3 class="profile__user-title">User</h3>
                            </div>
                            {{{Form
                                    ref="form"
                                    form=form
                                    onSubmit=onSubmit
                                    errorName=errorName
                                    profileMainPage=profileMainPage
                            }}}
                            {{#if profileMainPage}}
                                <div class="profile__change-controls">
                                    <div class="profile__string">
                                        <a href="profile-chng-data.hbs" class="profile__link">Изменить данные</a>
                                    </div>
                                    <div class="profile__string">
                                        <a href="profile-chng-pswd.hbs" class="profile__link">Изменить пароль</a>
                                    </div>
                                    <div class="profile__string">
                                        <a href="index.hbs" class="profile__link profile__link_red">Выйти</a>
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

