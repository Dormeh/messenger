import Block from 'core/Block';

import './avatar.scss';


interface AvatarProps {
    avatarClass: string;
    avatarSvgClass: string;
    photo: string;
    svg: string;

}

export class Avatar extends Block {
    static componentName = 'Avatar';

    constructor({avatarClass, avatarSvgClass, photo, svg}: AvatarProps) {
        super({avatarClass, avatarSvgClass, photo, svg});

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
                    <svg class="avatar__svg {{avatarSvgClass}}">
                        <use href="{{svg}}#default-avatar"></use>
                    </svg>
                </div>
            {{/if}}
        `;
    }
}
