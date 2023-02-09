import Block from 'core/Block';

import './avatar.scss';

interface AvatarProps {
    avatarClass: string;
    avatarSvgClass: string;
    photo: string;
    svg: string;
    onClick?: () => void;
}

export class Avatar extends Block {
    static componentName = 'Avatar';

    constructor({ avatarClass, avatarSvgClass, photo, svg, onClick }: AvatarProps) {
        super({ avatarClass, avatarSvgClass, photo, svg, events: { click: { fn: onClick, options: false } } });
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
                    <svg class="avatar__svg {{avatarSvgClass}}" fill="none" >
                        <use href="{{svg}}#default-avatar"></use>
                    </svg>
                </div>
            {{/if}}
        `;
    }
}
