import Block from 'core/Block';

import form from 'data/reg.json';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";


export class Page extends Block {
    private form: HTMLCollection | undefined;
    private formElems: Record<string, HTMLElement> | undefined;
    private formRefs: { [p: string]: Block; } | undefined;

    constructor() {
        super();
        this.setProps({
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),
            form: form,
        })
    }

    onSubmit(event: MouseEvent): void {
        console.log('Submit')
        event.preventDefault();

        const rules = Object.keys(this.formElems as object).map(key => {
            const value2 = key === 'password_confirm' && this.formElems['password'].value;
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
            {{#Layout name="Registrashion" addPageClass=""}}
                {{{Form
                        ref="form"
                        form=form
                        onSubmit=onSubmit
                        errorName=errorName
                }}}
            {{/Layout}}
    `;
    }
}
