import Block from 'core/Block';
import '../../components/nav-list/nav-list.scss';

export class NavPage extends Block {
    static componentName = 'DebugPage';

    protected render(): string {
        // language=hbs

        return `{{#Layout name="ServicePage"}}
            <nav class="nav-list form form_login-view">
                <ul id="nav-list" class="nav-list__list">
                    <li class="nav-list__elem">
                        <a class="nav-list__link" href="/auth">auth</a>
                    </li>
                    <li class="nav-list__elem">
                        <a class="nav-list__link" href="/registration">registration</a>
                    </li>
                    <li class="nav-list__elem">
                        <a class="nav-list__link" href="/chat">chat</a>
                    </li>
                    <li class="nav-list__elem">
                        <a class="nav-list__link" href="/profile">profile</a>
                    </li>
                    <li class="nav-list__elem">
                        <a class="nav-list__link" href="/404">404</a>
                    </li>
                    <li class="nav-list__elem">
                        <a class="nav-list__link" href="/500">500</a>
                    </li>
                </ul>
            </nav>
        {{/Layout}}`;
    }
}
