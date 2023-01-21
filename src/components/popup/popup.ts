import Block from 'core/Block';

import './popup.scss';


interface PopupProps {
    onClick: any;
    addClass: string
    popupModalOpen: string;
    submitButton?: string;
    popupSvgConfig: any

}

export class Popup extends Block {
    static componentName = 'Popup';

    constructor({...props}: PopupProps) {
        super({...props});
        this.setProps({
            popupOpen: () => this.popupOpen.bind(this),
            events: {
                click: {
                    fn: this.popupCloseInit.bind(this),
                    options: false
                },
            }

        })
    }

    popupOpen(event: Event): void {
        console.log('open popup')
        if (this.element) this.element.style.display = 'flex';
        document.addEventListener('click', this.popupCloseInit)
    }

    popupCloseInit = (event: Event) => {
        const element = event.target as HTMLElement;
        if (!element.closest(".button-svg")) {
            console.log('close popup')
            if (this.element) this.element.style.display = 'none';
            document.removeEventListener('click', this.popupCloseInit)
        }
    }

    protected render(): string {
        // language=hbs

        return `
            <div class="popup {{addClass}}">
                <div class="popup__container">
                    {{#each popupSvgConfig}}
                        {{{ButtonSVG
                                ref=ref
                                buttonSvgClass=buttonSvgClass
                                svgClass="button-svg__svg-elem_tree-dots"
                                onClick=../popupModalOpen
                                buttonTitle=buttonTitle
                        }}}
                    {{/each}}
                    {{#if submitButton}}
                        {{{Button
                                ref="buttonDel"
                                buttonTitle=submitButton
                                buttonClass="button_alert-red button_set-big-btn profile__button-container"
                                onClick=popupModalOpen
                        }}}
                    {{/if}}


                </div>
            </div>
        `;
    }
}
