import Block from 'core/Block';

import form from 'data/auth.json';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";


export class LoginPage extends Block {
    private form: HTMLCollection | object | undefined;
    private formElems: {} | undefined;
    private formRefs: {
        [p: string]: Block;
    } | undefined;
    constructor() {
        super();
        // form.inputs[0].value = 'test'
        this.setProps({
            onSubmit: (event: MouseEvent): any => this.onSubmit(event),
            form,
        })

    }

/*    onChange(event: MouseEvent): void {
        const el = event.target as HTMLInputElement
        const formRefs = this.refs.form as Block
        console.log('change', el.value)
        console.log(formRefs.refs.loginInput.element?.children[1].children[0] === event.target)

    }*/


    // onFocus(event: MouseEvent): void {
    //     console.log('focus')
    //     const targetName = event.target.name
    //     const targetRefName = Object.keys(this.formRefs as object).filter(key => this.formRefs[key].props.name === targetName)
    //
    //     if (this.formRefs[targetRefName].refs.error.props['errorName']) {
    //         this.formRefs[targetRefName].refs.error.setProps({errorName: ''})
    //     }
    //
    // }

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
    }

    componentDidMount() {
        //тесты получения Dom элементов после срабатывания события CDM
        this.form = this.refs.form.element?.children[1].elements as HTMLCollection;
        this.formElems = Object.keys(this.form as object).filter((key:any) => isNaN(+key)).reduce((acc, key) => {
            acc[key] = this.form[key]
            return acc
        }, {})
        this.formRefs = this.refs.form.refs

    }

//     protected getStateFromProps() {
//         this.state = {
//             // values: {
//             //     login: '',
//             //     password: '',
//             // },
//             // errors: {
//             //     login: '',
//             //     password: '',
//             // },
//             // form: form,
//             // onSubmit: (event: MouseEvent):any => this.onSubmit(event)
// /*
//             onLogin: () => {
//                 const loginData = {
//                     login: (this.refs.login.firstElementChild as HTMLInputElement).value,
//                     password: (this.refs.password.firstElementChild as HTMLInputElement).value
//                 };
//
//                 const nextState = {
//                     errors: {
//                         login: '',
//                         password: '',
//                     },
//                     values: {...loginData},
//                 };
//
//                 if (!loginData.login) {
//                     nextState.errors.login = 'Login is required';
//                 } else if (loginData.login.length < 4) {
//                     nextState.errors.login = 'Login should contain more than 3 chars';
//                 }
//
//                 if (!loginData.password) {
//                     nextState.errors.password = 'Password is required';
//                 }
//
//                 this.setState(nextState);
//
//                 console.log('action/login', loginData);
//             }
// */
//         }
//     }


    render() {
        // language=hbs
        return `
            {{#Layout name="Login"}}
                {{{Form
                        ref="form"
                        form=form
                        onSubmit=onSubmit
                        onFocus=onFocus
                        onBlur=onBlur
                        onInput=onInput
                        onChange=onChange
                        errorName=errorName
                }}}
            {{/Layout}}
    `;
    }
}
