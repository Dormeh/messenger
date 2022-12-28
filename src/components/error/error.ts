import Block from 'core/Block';

import './error.scss';

interface ErrorProps {
    errorName?: string;
    messageInput?: boolean;

}

export class ErrorComponent extends Block<ErrorProps> {
    static componentName = 'ErrorComponent';

    protected render(): string {
        // language=hbs
        return `
            <div class="error {{#if messageInput}}input_message-error{{else}}input_error{{/if}} {{errorAddClass}}">
                {{#if errorName}}
                    {{errorName}}
                {{/if}}
            </div>
        `
    }
}
