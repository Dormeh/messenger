import Block from 'core/Block';

import '../../components/profile/profile.scss';
import {userDataToForm} from '../../asserts/utils'
import form from 'data/profile.json';
import formPassword from 'data/password.json';
import {Store} from "core/Store";
import {passwordChg, userChg, avatarChg} from '../../services/user'

import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import svg from 'images/icons_sprite.svg';

interface Event {
    event: MouseEvent;
    readonly target: HTMLElement | null;

    preventDefault(): void

    tagName: string;
}

export class ProfilePage extends Block {
    static componentName = 'ProfilePage';
    private form: HTMLCollection | undefined;
    private formElems: Record<string, HTMLElement> | undefined;
    private formRefs: { [p: string]: Block; } | undefined;

    constructor() {
        super();
        const userData = Store.instance().getState().user;
        this.setProps({
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),
            form: userDataToForm(userData, form),
            store: Store.instance(),
            svg,
            photo: `https://ya-praktikum.tech/api/v2/resources${Store.instance().getState().user.avatar}`,
            userName: Store.instance().getState().user.display_name || 'User',
            profileMainPage: true,
            events: {
                click: {
                    fn: this.onClick.bind(this),
                    options: false
                },
                change: {
                    fn: this.onChange.bind(this),
                    options: false
                }
            }
        })
        console.log('props', this.props)

    }

    onClick(event: Event): void {
        const link = event.target.closest('a');
        if (!link) return;
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

    onChange(event:Event) {
        const input = event.target as HTMLInputElement
        if (!input.type || input.type !== 'file' || !input.files) return;
        console.log(input.files[0])
        const formData = new FormData();
        formData.append("avatar", input.files[0]);

        this.props.store.dispatch(avatarChg, formData);
        //https://ya-praktikum.tech/api/v2/resources/ урл запроса аватара

    }

    onSubmit(event: MouseEvent): void {
        this.componentDidMount();
        event.preventDefault();

        const rules = Object.keys(this.formElems as object).map(key => {
            const value2 = key === 'newPassword_confirm' && this.formElems && this.formElems['newPassword'].value;
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
        console.log('formValues', formValues)
        if (formValues.newPassword_confirm) {
            delete formValues.newPassword_confirm;
            this.props.store.dispatch(passwordChg, formValues);
        } else {
            this.props.store.dispatch(userChg, formValues);
        }
    }

    componentDidMount() {
        this.form = this.refs.form.element?.children[1].elements;
        this.formElems = Object.keys(this.form as object).filter((key: any) => isNaN(+key)).reduce((acc, key) => {
            acc[key] = this.form[key]
            return acc
        }, {})
        this.formRefs = this.refs.form.refs
        document.getElementById('input').addEventListener('change', () => this.onClick.bind(this))

    }


    render() {
        // language=hbs
        return `
            {{#Layout name="Profile" addPageClass="page_chat-theme"}}
                <div class="chat-layout profile">
                    <div class="profile__nav-back">
                        <a href="/chat">
                            <svg class="profile__svg">
                                <use href="{{svg}}#arrow-back"></use>
                            </svg>
                        </a>
                    </div>
                    <div class="profile__preview {{#if profileMainPage}}profile__preview_inactive{{/if}}">
                        <div class="container container_profile">

                                <label class="profile__avatar-change-container">
                                    <input class="profile__avatar-input" type="file" id="input" multiple>
                                </label>
                            <div class="profile__avatar-preview">
                                {{{Avatar avatarClass="profile__avatar-container profile__avatar-container_chng"
                                          svg=svg
                                          photo=photo
                                }}}
                                <h3 class="profile__user-title">{{userName}}</h3>
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

