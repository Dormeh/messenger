import Block from 'core/Block';


export class NavPage extends Block {
    static componentName = 'DebugPage';

    protected render(): string {
        return `<ul id="nav-list">
            <li>
                <a href="/auth">auth</a>
            </li>
            <li>
                <a href="/registration">registration</a>
            </li>
            <li>
                <a href="/chat">chat</a>
            </li>
            <li>
                <a href="/profile">profile</a>
            </li>
            <li>
                <a href="/404">404</a>
            </li>
            <li>
                <a href="/500">500</a>
            </li>
        </ul>
        `
    }
}
