import Block from '../../core/Block';

interface LayoutProps {
  addPageClass: string;
}

export class Layout extends Block {
  constructor({addPageClass}: LayoutProps) {
    super({addPageClass});
  }
  protected render(): string {
    // language=hbs
    return `
      <main class="page {{addPageClass}}">
        <div class="container" data-layout=1>

        </div>
      </main>
    `
  }
}
