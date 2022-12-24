import Block from 'core/Block';

// import './input.scss';

interface ErrorProps {
    errorName?: string;
    errorAddClass?: string;

}

export class ErrorComponent extends Block<ErrorProps> {

    protected render(): string {
        // language=hbs
        return `
            <div class="error {{errorAddClass}}">{{#if errorName}}{{errorName}}{{/if}}</div>
`
    }
}
