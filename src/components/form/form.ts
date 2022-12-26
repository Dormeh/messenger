import Block from 'core/Block';

interface FormProps {
    form: {};
    onSubmit: any;
    onFocus: any;
    onBlur: any;
    onInput: any;
    onChange: any;
    loginValue: string;
    profileMainPage?: boolean;
}

export class Form extends Block {

    constructor({form, onSubmit, onFocus, onBlur, onInput, onChange, loginValue, profileMainPage}: FormProps) {
        super({form, onSubmit, onFocus, onBlur, onInput, onChange, loginValue, profileMainPage});
    }

    protected render(): string {

        // console.log(this.refs)
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
                            }}}
                        {{/each}}
<!--                        {{{Input name="dfdf" onChange=onChange onFocus=onFocus value=loginValue }}}-->

                    </fieldset>
                    {{#unless profileMainPage}}
                        {{{Button 
                                  formAction="chat.html"
                                  buttonTitle=form.buttonTitle
                                  buttonClass=form.buttonClass
                                  onClick=onSubmit 
                        }}}
                    {{/unless}}
                </form>
                <a href="{{form.backLink}}" class="form__change-form-link">{{form.backLinkTitle}}</a>
            </div>
        `
    }
}
