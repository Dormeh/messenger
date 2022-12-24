import Block from 'core/Block';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";

type strObj = { [key: string]: string }

// import './input.scss';

interface InputProps {
    onInput?: () => void;
    onChange?: () => void;
    onFocus: () => void;
    onBlur: () => void;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    errorName?: string;
    inputAddClass: string;
    name: string;
    svg?: any;
}

export class Input extends Block {
    // private name: never;
    constructor({...props}: InputProps) {
        super({...props});

        this.setProps({
            events: {
                blur: {fn: this.onBlur.bind(this), options: true},
                // input: {fn: this.onInput.bind(this), options: false},
                // change: {fn: onChange, options: true},
                focus: {fn: this.onFocus.bind(this), options: true},


            }
        })
    }

    onBlur(event: MouseEvent): void {
        console.log('blur')
        if (!this.refs.error) return;
        const errorMessage: any = validateForm([
            {type: ValidateRuleType[this.props.name], value: event.target?.value},
        ])
        if (errorMessage[this.props.name]) {
            this.refs.error.setProps({errorName: errorMessage[this.props.name]})
        }

    }

    onFocus(event: MouseEvent): void {
        console.log('focus')
        if (!this.refs.error) return;

        if (this.refs.error.props['errorName']) this.refs.error.setProps({errorName: ''});
    }

    // onInput(event: MouseEvent): void {
    //     console.log('input')
    //     const errorMessage = validateForm([
    //         {type: ValidateRuleType[this.props.name], value: event.target?.value},
    //     ])
    //     this.refs.error.setProps({errorName: errorMessage[this.props.name]})
    //
    // }

    protected render(): string {
        // language=hbs
        return `
            <div class="input {{inputAddClass}}">
                <label class="input__label">{{label}}</label>
                <div class="input__container">
                    <input type="{{type}}" placeholder="{{placeholder}}" class="input__input-text" name="{{name}}"
                           value="{{value}}">
                    {{#if profileInput}}
                        <span class="input__profile-label">{{formLabel}}</span>
                    {{/if}}
                    {{#if searchInput}}
                        <svg class="chat-layout__search-icon">
                            <use href="{{svg}}#search"></use>
                        </svg>
                    {{else}}
                        {{{ErrorComponent errorAddClass="input_error" ref="error"}}}
                    {{/if}}
                </div>
            </div>
        `
    }
}
