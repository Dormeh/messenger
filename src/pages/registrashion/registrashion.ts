import Block from 'core/Block';

import form from '../../data/reg.json';
import { Store } from 'core/Store';

import { registration } from '../../services/auth';
import type { SendData } from '../../components/form';

export class RegPage extends Block {
    static componentName = 'SignUpPage';

    constructor() {
        super();
        this.setProps({
            store: Store.instance() as Store<AppState>,
            onSubmit: (formValues: Record<string, string>): any => this.onSubmit(formValues),
            form: form,
        });
    }

    async onSubmit({ data, form }: SendData): Promise<AppState> {
        await this.props.store.dispatch(registration, data);
        return this.props.store.getState().FormError;
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
