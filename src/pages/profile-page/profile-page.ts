import Block from 'core/Block';

import '../../components/profile/profile.scss';
import {userDataToForm} from '../../asserts/utils'
import form from 'data/profile.json';
import formPassword from 'data/password.json';
import formAvatar from 'data/avatarForm.json';
import {Store} from "core/Store";
import {passwordChg, userChg, avatarChg} from '../../services/user'
import {formatBytes} from '../../asserts/utils'
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import svg from 'images/icons_sprite.svg';
import {logout} from "../../services/auth";

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
    private modalButton: HTMLButtonElement | undefined;
    private modalError: Block | undefined;
    private formElem: HTMLFormElement | undefined;

    constructor(props) {
        super(props);
        const userData = Store.instance().getState().user;
        this.setProps({
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),
            onLogout: () => Store.instance().dispatch(logout),
            onSubmitFile: (event: MouseEvent) => this.onSubmitFile(event),
            form: userDataToForm(userData, props.pageType && props.pageType === 'password' ? formPassword : form),
            formAvatar,
            store: Store.instance(),
            backLink: props.pageType ? '/profile' : '/chat',
            svg,
            photo: Store.instance().getState().user.avatar && `${process.env.API_ENDPOINT}/resources${Store.instance().getState().user.avatar}`,
            userName: Store.instance().getState().user.display_name || 'User',
            profileMainPage: !props.pageType,
            events: {
                click: {
                    fn: this.modalOpen.bind(this),
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

    modalOpen(event: Event): void {
        const element = event.target as HTMLElement;
        if (!element.classList.contains('avatar')) return;
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

    onChange(event: Event) {
        const input = event.target as HTMLInputElement
        if (!input.type || input.type !== 'file' || !input.files) return;
        // console.log(input.files[0]);
        let errorName = '';
        this.modalError && this.modalError.props.errorName && this.modalError.setProps({errorName})
        const form = this.refs.modal.refs.modalForm.element?.children[1] as HTMLFormElement

        if (form.file.files && form.file.files[0]) {
            const file = form.file.files[0];
            const size = file.size;
            if (size > 1048576) {
                const sizeKb = formatBytes(size);
                errorName = `размер файла ${sizeKb} допустимый не более 1Мб`
                this.modalError && this.modalError.setProps({errorName})
                return;
            }
            console.log(form.file.files[0])

            const image = form.querySelector('img') as HTMLImageElement;
            image.src = URL.createObjectURL(form.file.files[0])
            image.style.display = "block"
            if (this.modalButton) this.modalButton.disabled = false;
        }

    }

    async onSubmitFile(event: MouseEvent) {
        if (this.modalError && this.modalError.props.errorName) return;
        // console.log(this.refs.modal.refs.modalForm.element?.children[1])
        if (this.formElem && this.formElem.file.files) {
            event.preventDefault();
            const file = this.formElem.file.files[0];
            if (!file && !file.size) {
                this.modalError && this.modalError.setProps({errorName: 'файл не загружен'})
                return;
            }
            // console.log(form.file.files[0])
            const formData = new FormData();
            formData.append("avatar", this.formElem.file.files[0]);

            await this.props.store.dispatch(avatarChg, formData);
            console.log('ОТПРАВКА ФАЙЛА')
        }
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
        this.modalError = this.refs.modal.refs.modalForm.refs.error;
        this.modalButton = this.refs.modal.refs.modalForm.refs.button.element as HTMLButtonElement;
        this.formElem = this.refs.modal.refs.modalForm.element?.children[1] as HTMLFormElement;
        // document.getElementById('input').addEventListener('change', () => this.onClick.bind(this))

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
                    }}}
                    <div class="profile__preview {{#if profileMainPage}}profile__preview_inactive{{/if}}">
                        <div class="container container_profile">

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

