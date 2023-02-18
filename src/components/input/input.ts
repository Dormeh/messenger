import Block from 'core/Block';
import { validateForm, ValidateRuleType } from '../../asserts/utils/validateForm';

import './input.scss';

interface InputProps {
    onInput?: () => void;
    onChange?: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onClick: () => void;
    eventBlurOff?: boolean;
    eventFocusOff?: boolean;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    value?: string;
    errorName?: string;
    messageInput?: boolean;
    inputAddClass: string;
    errorAddClass?: string;
    name: string;
    svg?: any;
    file?: boolean;
}

export class Input extends Block {
    static componentName = 'Input';
    constructor({ eventBlurOff, eventFocusOff, file, ...props }: InputProps) {
        super({ eventBlurOff, eventFocusOff, file, ...props });

        if (file) eventBlurOff = eventFocusOff = true;

        const newProps = {
            events: {} as {
                blur: {};
                focus: {};
            },
        };
        if (!eventBlurOff) {
            newProps.events.blur = { fn: this.onBlur.bind(this), options: true };
        }
        if (!eventFocusOff) {
            newProps.events.focus = { fn: this.onFocus.bind(this), options: true };
        }
        if (Object.keys(newProps.events).length) this.setProps(newProps);
    }

    onBlur(event: MouseEvent): void {
        if (process.env.DEBUG) console.log('blur');
        if (!this.refs.error) return;
        const errorMessage: any = validateForm([
            { type: ValidateRuleType[this.props.name], value: event.target?.value },
        ]);
        if (errorMessage[this.props.name]) {
            this.refs.error.setProps({ errorName: errorMessage[this.props.name] });
        }
    }

    onFocus(): void {
        if (process.env.DEBUG) console.log('focus');
        if (!this.refs.error) return;

        if (this.refs.error.props['errorName']) this.refs.error.setProps({ errorName: '' });
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="input {{inputAddClass}}">
                {{#if file}}
                    <label class="input__avatar-change-container button button_alternate">
                        <span class="input__avatar-change-text">Выбрать файл</span>
                        <input name="file" class="input__avatar-input" type="file" id="input" accept="image/png, image/jpeg, image/gif,">
                    </label>
                {{else}}
                    <label class="input__label">{{label}}
                    </label>
                    <div class="input__container">
                        <input type="{{type}}" placeholder="{{placeholder}}" class="input__input-text" name="{{name}}"
                               value="{{value}}">
                        {{#if profileInput}}
                            <span class="input__profile-label">{{formLabel}}</span>
                        {{/if}}

                        {{#if searchInput}}
                            <svg class="chat-layout__search-icon" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.59239 8.41382C6.16047 9.84574 3.83886 9.84574 2.40694 8.41382C0.975017 6.9819 0.975017 4.6603 2.40694 3.22837C3.83886 1.79645 6.16047 1.79645 7.59239 3.22837C9.02431 4.6603 9.02431 6.9819 7.59239 8.41382ZM8.03277 9.79678C6.07255 11.2962 3.25696 11.1495 1.46413 9.35663C-0.488491 7.40401 -0.488491 4.23819 1.46413 2.28556C3.41675 0.332943 6.58258 0.332943 8.5352 2.28556C10.3279 4.07831 10.4747 6.89373 8.97555 8.85394L12.5423 12.4206L11.5994 13.3635L8.03277 9.79678Z" fill="currentColor"/>
                            </svg>
                        {{else}}
                            {{{ErrorComponent ref="error" errorAddClass=errorAddClass}}}
                        {{/if}}
                    </div>
                {{/if}}

            </div>
        `;
    }
}
