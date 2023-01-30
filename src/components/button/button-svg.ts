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

    constructor({onClick, svgName, ...props}: ButtonProps) {
        super({events: {click: {fn: onClick, options: false}}, svgName, ...props});
        const svgType = {
            clip: true,
            treedots: true,
            arrowback: true
        }
        let newProp;
        switch (svgName) {  // временное решение до webpack (parcel обнуляет svg-sprite в продакшен)
            case 'clip':
                newProp = svgName
                break;
            case 'arrowback':
                newProp = svgName
                break;
            case 'treedots':
                newProp = svgName
                break;
        }
        this.setProps({
            [newProp]: true,
        })

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
