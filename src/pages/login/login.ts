import Block from 'core/Block';

import form from 'data/auth.json';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";
import Router from "../../core/Router/Router";
import {auth} from '../../services/auth'


export class LoginPage extends Block {
    static componentName = 'LoginPage';
    private form: HTMLCollection | object | undefined;
    private formElems: Record<string, HTMLElement> | undefined;
    private formRefs: { [p: string]: Block; } | undefined;

    constructor() {
        super();
        this.setProps({
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),
            form,
        })
        // const router = Router.instance();// тест управления роутером
        // setTimeout(() => router.navigate('/'), 3000)

    }

    onSubmit(event: MouseEvent): void {
        console.log('Submit')
        event.preventDefault();

        const rules = Object.keys(this.formElems as object).map(key => {
            return {
                type: ValidateRuleType[key],
                value: this.formElems[key].value
            }
        })

        const errorMessage = validateForm(rules)

        Object.keys(this.formRefs as object).forEach(key => this.formRefs[key].refs.error.setProps({errorName: errorMessage[this.formRefs[key].props.name]}))

        const formValues = Object.entries(this.formElems).reduce((acc, [key, item]) => {
            acc[key] = item.value;
            return acc;
        }, {})

        console.log(formValues)
        auth(formValues);
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
            {{#Layout name="Login"}}
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
