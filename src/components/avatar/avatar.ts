import Block from 'core/Block';
import template from "*.hbs";


interface AvatarProps {
    avatarClass: string;
    avatarSvgClass: string;
    photo: string;
    svg: string;

}

export class Avatar extends Block {
    constructor({avatarClass, avatarSvgClass, photo, svg}: AvatarProps) {
        super({avatarClass, avatarSvgClass,  photo, svg});

    }

    protected render(): string {
        // const {photo} = this.props;
        // console.log(photo)
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
