import Block from 'core/Block';

import './form.scss';
import { validateForm, ValidateRuleType } from '../../asserts/utils/validateForm';
import { formatBytes } from '../../asserts/utils';

export type SendData = {
    data: Record<string, string>;
    form?: Record<string, string | Array<[Record<string, string>]>>;
    file?: FormData;
};

const MAX_FILE_SIZE = 1048576;

interface FormProps {
    form: {};
    onSubmit: any;
    onFocus: any;
    onBlur: any;
    onInput: any;
    loginValue: string;
    errorAddClass?: string;
    file?: boolean;
    profileMainPage?: boolean;
}

export class Form extends Block {
    static componentName = 'Form';
    private formCollection: HTMLCollection | object | undefined;
    private formElems: Record<string, HTMLInputElement> | undefined;
    private formRefs: { [p: string]: Block } | undefined;
    private formButton: HTMLButtonElement | undefined;
    private formError: Block | undefined;
    private form: HTMLFormElement | undefined;

    constructor({ ...props }: FormProps) {
        super({ ...props });
        this.setProps({
            // store: Store.instance(),
            onSubmitForm: (event: MouseEvent) => this.onSubmitForm(event),
            events: {
                change: {
                    fn: this.onChangeFile.bind(this),
                    options: false,
                },
            },
        });
    }

    onChangeFile(event: Event) {
        this.elemInit();
        const input = event.target as HTMLInputElement;
        if (!input.type || input.type !== 'file' || !input.files) return;

        let errorName = '';

        const hasError = this.formError?.props.errorName;
        if (hasError) {
            this.formError?.setProps({ errorName });
        }

        const file = this.form?.file.files && this.form.file.files[0];

        if (file) {
            const size = file.size;
            if (size > MAX_FILE_SIZE) {
                const sizeKb = formatBytes(size);
                errorName = `размер файла ${sizeKb} допустимый не более 1Мб`;
                this.formError && this.formError.setProps({ errorName });
                if (this.formButton) this.formButton.disabled = true;
                return;
            }

            const image = this.form?.querySelector('img') as HTMLImageElement;
            image.src = URL.createObjectURL(file);
            image.style.display = 'block';
            if (this.formButton) this.formButton.disabled = false;
        }
    }

    async onSubmitForm(event: MouseEvent): Promise<void> {
        console.log('Submit');
        event.preventDefault();
        this.elemInit();

        const rules = Object.keys(this.formElems as object).map((key) => {
            return {
                type: ValidateRuleType[key],
                value: this.formElems[key].value,
            };
        });

        const errorMessage = validateForm(rules) as object;
        let hasError;
        let sendData;
        if (!this.props.file) {
            Object.keys(this.formRefs).forEach((key) => {
                if (this.formRefs && this.formRefs[key].refs.error && this.formRefs[key].props.name) {
                    this.formRefs[key].refs.error.setProps({ errorName: errorMessage[this.formRefs[key].props.name] });
                    hasError = hasError || !!errorMessage[this.formRefs[key].props.name];
                }
            });
            const formValues: Record<string, string> = Object.entries(this.formElems).reduce((acc, [key, item]) => {
                acc[key] = item.value;
                return acc;
            }, {});
            if (hasError) return;
            sendData = { data: formValues, form: this.props.form }; //todo сделать проверку была ли изменина форма

            console.log(formValues);
        } else {
            const file = this.form && this.form.file.files[0];

            if (!file && !file.size) {
                this.formError && this.formError.setProps({ errorName: 'файл не загружен' });
            }
            hasError = this.formError && !!this.formError.props.errorName;
            sendData = { file: file, form: this.props.form};
            console.log(hasError);
        }
        if (hasError) return;
        // @ts-ignore
        const response = await this.props.onSubmit(sendData);
        if (response && typeof response === 'string') {
            this.formError && this.formError.setProps({ errorName: response });
        }
    }

    elemInit() {
        this.form = this.element?.children[1] as HTMLFormElement;
        this.formCollection = this.element?.children[1].elements as HTMLCollection;
        this.formElems = Object.values(this.formCollection as object)
                .filter((value: any) => {

                return value.name
            })
            .reduce((acc, value) => {
                acc[value.name] = value;
                return acc;
            }, {});
        this.formRefs = this.refs;
        this.formButton = this.refs.button.element as HTMLButtonElement;
        this.formError = this.refs.error;
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="form {{form.addFormClass}}">
                <h1 class="form__title">{{form.title}}</h1>
                <form class="form__inner">
                    <fieldset class="form___inputs-inner">
                        {{#each form.inputs}}
                            {{{Input ref=ref
                                     placeholder=placeholder
                                     type=this.type
                                     errorName=errorName
                                     name=name
                                     inputAddClass=../form.inputAddClass
                                     formLabel=this.label
                                     profileInput=../form.profileInput
                                     value=value
                                     file=../file
                            }}}
                        {{/each}}

                    </fieldset>
                    {{#if file}}
                        <div class="modal__container profile__avatar-container">

                            <img src="#" alt="your image" style="display: none" class="avatar__img">
                        </div>
                    {{/if}}
                    {{#unless profileMainPage}}
                        {{{Button
                                ref="button"
                                buttonTitle=form.buttonTitle
                                buttonClass=form.buttonClass
                                onClick=onSubmitForm
                        }}}
                    {{/unless}}
                    {{{ErrorComponent ref="error" errorAddClass=errorAddClass}}}
                </form>
                <a href="{{form.backLink}}" class="form__change-form-link">{{form.backLinkTitle}}</a>

            </div>
        `;
    }
}
