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
<!--закоментировано до webpack                    <svg class="button-svg__svg-elem {{svgClass}}">-->
<!--                        <use href="{{svg}}#{{svgName}}"></use>-->
<!--                    </svg>-->
                    {{#if treedots}}
                        <svg class="button-svg__svg-elem {{svgClass}}">
                            <circle cx="1.5" cy="2" r="1.5" fill="currentColor"/>
                            <circle cx="1.5" cy="8" r="1.5" fill="currentColor"/>
                            <circle cx="1.5" cy="14" r="1.5" fill="currentColor"/>
                        </svg>
                    {{/if}}
                    {{#if clip}}
                        <svg id="clip" fill="none" class="button-svg__svg-elem {{svgClass}}">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M6.18662 12.5L13.7628 4.92389L14.7056 5.8667L7.12943 13.4428L6.18662 12.5Z"
                                  fill="currentColor"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M8.70067 15.0141L16.2768 7.43793L17.2196 8.38074L9.64348 15.9569L8.70067 15.0141Z"
                                  fill="currentColor"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M14.0433 20.3567L21.6195 12.7806L22.5623 13.7234L14.9861 21.2995L14.0433 20.3567Z"
                                  fill="currentColor"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M16.5574 22.8708L24.1335 15.2946L25.0763 16.2374L17.5002 23.8136L16.5574 22.8708Z"
                                  fill="currentColor"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M16.5574 22.8709C13.9423 25.486 9.71181 25.4954 7.10831 22.8919C4.50482 20.2884 4.51424 16.0579 7.12936 13.4428L6.18655 12.5C3.0484 15.6381 3.0371 20.7148 6.16129 23.839C9.28549 26.9632 14.3621 26.9518 17.5003 23.8137L16.5574 22.8709Z"
                                  fill="currentColor"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M21.6195 12.7806L22.5623 13.7234C25.003 11.2826 25.0118 7.3341 22.5819 4.90417C20.152 2.47424 16.2035 2.48303 13.7627 4.92381L14.7055 5.86662C16.6233 3.94887 19.7257 3.94196 21.6349 5.85119C23.5441 7.76042 23.5372 10.8628 21.6195 12.7806Z"
                                  fill="currentColor"/>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M8.70092 15.0144C6.95751 16.7578 6.95123 19.5782 8.68689 21.3138C10.4226 23.0495 13.2429 23.0432 14.9863 21.2998L14.0435 20.357C12.8231 21.5774 10.8489 21.5818 9.63391 20.3668C8.41894 19.1518 8.42334 17.1776 9.64373 15.9572L8.70092 15.0144Z"
                                  fill="currentColor"/>
                        </svg>
                    {{/if}}
                    {{#if arrowback}}
                        <svg  fill="none" viewBox="0 0 448 512" class="button-svg__svg-elem {{svgClass}}">
                            <path xmlns="http://www.w3.org/2000/svg" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" fill="currentColor"/>
                        </svg>
                    {{/if}}
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
