import {Block, IBlockProps} from 'core';

import form from 'data/auth.json';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import Router from "core/Router/Router";
import {Store} from "core/Store";
import {login} from '../../services/auth'
import {chatsCreate} from "../../services/chats";
import type {SendData} from "../../components/form"


export class LoginPage extends Block {
    static componentName = 'LoginPage';

    constructor() {
        super();
        this.setProps({
            store: Store.instance() as Store<AppState>,
            onSubmit: (formValues: Record<string, string>) => this.onSubmit(formValues),
            form,
        })

    }

    async onSubmit({data, form}: SendData): Promise<AppState> {
        await this.props.store.dispatch(login, data);
        return this.props.store.getState().FormError
    }

    render() {

        // language=hbs
        return `
            {{#Layout name="Login"}}
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
