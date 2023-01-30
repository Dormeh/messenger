import Block from 'core/Block';
import template from 'bundle-text:./button.hbs';

import './button.scss';

interface ButtonProps {
    buttonTitle: string;
    buttonClass: string;
    formAction: string;
    onClick: () => void;
}

export class Button extends Block {
    static componentName = 'Button';

    constructor({buttonTitle, buttonClass, formAction, onClick}: ButtonProps) {
        super({buttonTitle, buttonClass, formAction, events: {click: {fn: onClick, options: false}}});

    }

    protected render(): string {

        return `<button class="button {{buttonClass}}">{{buttonTitle}}</button>`;
    }
}
