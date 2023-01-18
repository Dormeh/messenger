import './modal.scss';
import Block from 'core/Block';

interface ModalProps {
    modalTitle?: string;
    modalClass?: string;
    onSubmit: () => void;
    errorAddClass?: string;
    file?: boolean;
    form: {};
    svg: string
}

export class Modal extends Block {
    static componentName = 'Modal';

    constructor({...props}: ModalProps) {
        super({...props});
        this.setProps({
            events: {
                click: {
                    fn: this.modalClose.bind(this),
                    options: false
                }
            }
        })

    }

    modalClose(event: Event) {
        const element = event.target as HTMLElement;
        if (element.classList.contains("modal")) {
            this.element.style.display = 'none';
            document.body.overflow = 'initial';
        }
    }

    protected render(): string {

        // language=hbs
        return `
            <div id="modal" class="modal modal_component-page">
                <div class="modal__preview">
                    {{{Form
                            ref="modalForm"
                            form=form
                            onSubmit=onSubmit
                            file=file
                            errorAddClass=errorAddClass
                    }}}
                </div>
            </div>
        `;
    }
}
