import Block from 'core/Block';

import './popup.scss';

export interface PopupProps {
    onClick: any;
    addClass: string;
    popupModalOpen: string;
    submitButton?: string;
    popupSvgConfig: any;
    svg?: string;
}

export class Popup extends Block {
    static componentName = 'Popup';

    constructor({ ...props }: PopupProps) {
        super({ ...props });
        this.setProps({
            popupOpen: () => this.popupOpen.bind(this),
            events: {
                click: {
                    fn: this.popupCloseInit.bind(this),
                    options: false,
                },
            },
        });
    }

    popupOpen(event: Event): void {
        if (this.element) this.element.style.display = 'flex';
        document.addEventListener('click', this.popupCloseInit);
    }

    popupCloseInit = (event: Event) => {
        const element = event.target as HTMLElement;
        if (!element.closest('.button-svg')) {
            if (this.element) this.element.style.display = 'none';
            document.removeEventListener('click', this.popupCloseInit);
        }
    };

    protected render(): string {
        // language=hbs

        return `
            <div class="popup {{addClass}}">
                <div class="popup__container">
                    {{#each popupSvgConfig}}
                        {{{ButtonSVG
                                ref=ref
                                buttonSvgClass=buttonSvgClass
                                svgClass=svgClass
                                onClick=../popupModalOpen
                                buttonTitle=buttonTitle
                                svgName=svgName
                                svg=../svg
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
