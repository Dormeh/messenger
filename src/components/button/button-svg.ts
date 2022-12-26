import Block from 'core/Block';
import template from 'bundle-text:./button.hbs';

import './button-svg.scss';

interface ButtonProps {
    buttonTitle: string;
    buttonSvgClass: string;
    svgClass: string
    svgName: string;
    formAction: string;
    svg: string;
    onClick: () => void;
}

export class ButtonSVG extends Block {
    constructor({buttonTitle, buttonSvgClass, formAction, svg, svgClass, svgName, onClick}: ButtonProps) {
        super({buttonTitle, buttonSvgClass, formAction, svg, svgClass, svgName, events: {click: {fn: onClick, options: false}}});

    }

    protected render(): string {

        // language=hbs
        return `<button class="button-svg {{buttonSvgClass}}">
                    <svg class="button-svg__svg-elem {{svgClass}}">
                        <use href="{{svg}}#{{svgName}}"></use>
                    </svg>
                </button>`;
    }
}
