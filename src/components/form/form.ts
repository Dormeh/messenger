import Block from 'core/Block';

import './form.scss';


interface FormProps {
    form: {};
    onSubmit: any;
    onFocus: any;
    onBlur: any;
    onInput: any;
    onChange: any;
    loginValue: string;
    errorAddClass?: string;
    file?: boolean;
    profileMainPage?: boolean;
}

export class Form extends Block {
    static componentName = 'Form';

    constructor({...props}: FormProps) {
        super({...props});
    }

    protected render(): string {

        // language=hbs
        return `
            <div class="form {{form.addFormClass}}">
                <h1 class="form__title">{{form.title}}</h1>
                <form class="form__inner">
                    <fieldset class="form___inputs-inner">
                        {{#each form.inputs}}
                            {{{Input ref=ref
                                     placeholder=placeholder
                                     type=this.type
                                     errorName=errorName
                                     name=name
                                     inputAddClass=../form.inputAddClass
                                     formLabel=this.label
                                     profileInput=../form.profileInput
                                     value=value
                                     file=../file
                            }}}
                        {{/each}}

                    </fieldset>
                    {{#if file}}
                        <div class="modal__container profile__avatar-container">

                            <img src="#" alt="your image" style="display: none" class="avatar__img">
                        </div>
                    {{/if}}
                    {{#unless profileMainPage}}
                        {{{Button
                                ref="button"
                                buttonTitle=form.buttonTitle
                                buttonClass=form.buttonClass
                                onClick=onSubmit
                        }}}
                    {{/unless}}
                {{{ErrorComponent ref="error" errorAddClass=errorAddClass}}}
                </form>
                <a href="{{form.backLink}}" class="form__change-form-link">{{form.backLinkTitle}}</a>

            </div>
        `
    }
}
