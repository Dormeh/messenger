import Block from 'core/Block';
import template from "*.hbs";


interface AvatarProps {
    avatarClass: string;
    avatarMini: boolean;
    photo: string;
    svg: string;

}

export class Avatar extends Block {
    constructor({avatarClass, avatarMini, photo, svg}: AvatarProps) {
        super({avatarClass, avatarMini,  photo, svg});
        console.log(svg)

    }

    protected render(): string {
        // language=hbs

        return `
                {{#if photo}}
                    <div class="avatar {{avatarClass}}">
                        <img src="{{photo}}" alt="avatar" class="avatar__img">
                    </div>
                {{else}}
                    <div class="avatar avatar_default {{avatarClass}}">
                        <svg class="avatar__svg {{#if avatarMini}}avatar__svg_mini{{/if}}">
                            <use href="{{svg}}#default-avatar"></use>
                        </svg>
                    </div>
                {{/if}}
        `;
    }
}
