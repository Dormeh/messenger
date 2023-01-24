import Block from 'core/Block';

import './error.scss';

interface ErrorProps {
    errorName?: string;
    messageInput?: boolean;
    errorAddClass?: string;

}

export class ErrorComponent extends Block<ErrorProps> {
    static componentName = 'ErrorComponent';

    protected render(): string {
        // language=hbs
        return `
            <div class="error {{#if errorAddClass}}{{errorAddClass}}{{else}}input_error{{/if}}">
                {{#if errorName}}
                    {{errorName}}
                {{/if}}
            </div>
        `
    }
}
