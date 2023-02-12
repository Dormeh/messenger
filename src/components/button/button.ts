import Block from 'core/Block';

import './button.scss';

interface ButtonProps {
    buttonTitle: string;
    buttonClass: string;
    formAction: string;
    onClick: () => void;
}

export class Button extends Block {
    static componentName = 'Button';

    constructor({ onClick, ...props }: ButtonProps) {
        super({ events: { click: { fn: onClick, options: false } }, ...props });
    }

    protected render(): string {
        // language=hbs
        return `<button class="button {{buttonClass}}">{{buttonTitle}}</button>`;
    }
}
