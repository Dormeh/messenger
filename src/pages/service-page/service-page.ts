import Block from 'core/Block';

import '../../components/service-page/service-page.scss';

interface ServiceProps {
    status: number;
    message: string;
    linkName: string;
}

export class ServicePage extends Block {
    constructor({status, message, linkName}: ServiceProps) {
        super({status, message, linkName});
    }

    protected render(): string {
        // language=hbs
        return `
            {{#Layout name="ServicePage"}}
                <div class="service-page">
                    <div class="service-page__preview">
                        <h1 class="service-page__title">{{status}}</h1>
                        <p class="service-page__message">{{message}}</p>
                        <a href="chat" class="service-page__back-link">{{linkName}}</a>
                    </div>
                </div>
            {{/Layout}}
        `
    }
}
