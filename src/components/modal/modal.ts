import './modal.scss';
import Block from 'core/Block';

interface ModalProps {
    modalTitle?: string;
    modalClass?: string;
    onSubmit: () => void;
    errorAddClass?: string;
    file?: boolean;
    form: object;
    svg: string;
}

export class Modal extends Block {
    static componentName = 'Modal';

    constructor({ ...props }: ModalProps) {
        super({ ...props });
        this.setProps({
            events: {
                click: {
                    fn: this.modalCloseInit.bind(this),
                    options: false,
                },
                input: {
                    fn: this.onInput.bind(this),
                    options: false,
                },
            },
            modalClose: this.modalClose.bind(this),
            modalOpen: () => this.modalOpen.bind(this),
        });
    }

    onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.modalButton = this.refs.modalForm.refs.button.element as HTMLButtonElement;

        if (input !== this.inputModalElem) return;

        const inputValue = input.value;

        if (inputValue) {
            this.modalButton.disabled = false;
        }
    }

    modalOpen(): void {
        if (process.env.DEBUG) console.log('модальное окно');

        const modal = document.getElementById('modal');

        if (!modal) {
            return;
        }
        this.element.style.display = 'block';
        document.body.overflow = 'hidden';
        this.inputModalElem = this.refs.modalForm.refs.modalInput
            ? this.refs.modalForm.refs.modalInput.element?.children[1].children[0]
            : (null as HTMLInputElement | null);
        this.inputFile = this.refs.modalForm.refs.fileInput
            ? this.refs.modalForm.refs.fileInput.element?.children[0].children[1]
            : null;

        if ((this.inputFile && !this.inputFile.files[0]) || (this.inputModalElem && !this.inputModalElem.value)) {
            this.refs.modalForm.refs.button.element.disabled = true;
            this.inputModalElem && this.inputModalElem.focus();
        }
    }

    modalCloseInit(event: Event) {
        const element = event.target as HTMLElement;
        if (element.classList.contains('modal')) {
            this.modalClose();
        }
    }

    modalClose() {
        this.element.style.display = 'none';
        document.body.overflow = 'initial';
    }

    protected render(): string {
        // language=hbs
        return `
            <div id="modal" class="modal modal_form {{modalClass}}">
                <div class="modal__preview" data-testid="modal">
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
