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
    popupAdd: boolean;
    popupTitle?: string
    popupClass?: string
    popupModalOpen?: any;
    clickProps?: any;
    submitButton?: string;
    popupSvgConfig?: any
    onClick: (clickProps?: any) => void;
}

export class ButtonSVG extends Block {
    static componentName = 'ButtonSVG';

    constructor({onClick, ... props}: ButtonProps) {
        super({events: {click: {fn: onClick, options: false}}, ...props});
        // console.log(this.props)

    }

    protected render(): string {

        // language=hbs
        return `
            <div class="button-svg {{buttonSvgClass}}">
                <button class="button-svg__button">
                    <svg class="button-svg__svg-elem {{svgClass}}">
                        <use href="{{svg}}#{{svgName}}"></use>
                    </svg>
                    <span class="button-svg__title">{{buttonTitle}}</span>
                </button>
                {{#if popupAdd}}
                    {{{Popup
                            ref="popup"
                            title=popupTitle
                            addClass=popupClass
                            popupModalOpen=popupModalOpen
                            submitButton=submitButton
                            popupSvgConfig=popupSvgConfig
                    }}}
                {{/if}}
            </div>
        `;
    }
}
