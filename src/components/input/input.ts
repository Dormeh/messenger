import Block from 'core/Block';
import {validateForm, ValidateRuleType} from "../../asserts/utils/validateForm";

type strObj = { [key: string]: string }

// import './input.scss';

interface InputProps {
    onInput?: () => void;
    onChange?: () => void;
    onFocus: () => void;
    onBlur: () => void;
    eventBlurOff?: boolean;
    eventFocusOff?: boolean;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    errorName?: string;
    messageInput?: boolean;
    inputAddClass: string;
    name: string;
    svg?: any;
}

export class Input extends Block {
    static componentName = 'Input';
        constructor({eventBlurOff, eventFocusOff, ...props}: InputProps) {
        super({eventBlurOff, eventFocusOff, ...props});
        const newProps = {
            events: {
            } as {
                blur:{},
                focus:{}
            }
        };
        if (!eventBlurOff) {
            newProps.events.blur = {fn: this.onBlur.bind(this), options: true}
        }
        if (!eventFocusOff) {
            newProps.events.focus = {fn: this.onFocus.bind(this), options: true}
        }
        if (Object.keys(newProps.events).length) this.setProps(newProps)

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
                        {{{ErrorComponent ref="error" messageInput=messageInput}}}
                    {{/if}}
                </div>
            </div>
        `
    }
}
