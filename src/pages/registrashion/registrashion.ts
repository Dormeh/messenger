import Block from 'core/Block';

import form from 'data/reg.json';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import {Store} from "core/Store";

import {registration} from '../../services/auth'
import type {SendData} from "../../components/form"


export class RegPage extends Block {
    static componentName = 'SignUpPage';
    private form: HTMLCollection | undefined;
    private formElems: Record<string, HTMLElement> | undefined;
    private formRefs: { [p: string]: Block; } | undefined;

    constructor() {
        super();
        this.setProps({
            store: Store.instance() as Store<AppState>,
            onSubmit: (formValues: Record<string, string>): any => this.onSubmit(formValues),
            form: form,
        })
    }

    async onSubmit({data, form}: SendData): Promise<void> {
        await this.props.store.dispatch(registration, data);
    }


    render() {

        // language=hbs
        return `
            {{#Layout name="Registrashion" addPageClass=""}}
                {{{Form
                        ref="form"
                        form=form
                        onSubmit=onSubmit
                        errorName=errorName
                        errorAddClass="input_error form__error"
                }}}
            {{/Layout}}
    `;
    }
}
