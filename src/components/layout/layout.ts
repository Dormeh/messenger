import Block from '../../core/Block';

import '../container/container.scss';
import '../page/page.scss';

interface LayoutProps {
    addPageClass: string;
}

export class Layout extends Block {
    static componentName = 'Layout';
    constructor({ addPageClass }: LayoutProps) {
        super({ addPageClass });
    }
    protected render(): string {
        // language=hbs
        return `
      <main class="page {{addPageClass}}">
        <div class="container" data-layout=1>

        </div>
      </main>
    `;
    }
}
