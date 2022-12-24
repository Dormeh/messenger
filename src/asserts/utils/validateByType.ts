export class ValidateComponent {
    initByType = {
        login: this.loginCheck,
        password: this.passwordCheck,
        password_confirm: this.passwordCheck,
        email: this.emailCheck,
        first_name: this.nameCheck,
        second_name: this.nameCheck,
        phone: this.phoneCheck,
        display_name: this.displayNameCheck,
        message: this.messageCheck,
    };

    loginCheck(value: string) {
        if (value.length === 0) {
            return 'Логин не должен быть пустым';
        }
        if (/[^A-Z\-_0-9]/gi.test(value)) {
            return 'допустимые символы: латинские буквы, цифры, дефис, подчеркивание _'
        }
        if (value.length < 3 || value.length > 20) {
            return 'Логин должен содержать не менее 3 символов и не более 20'
        }
        if (/^[0-9_-]+$/.test(value)) {
            return 'Логин не может состоять только из цифр, дефиса и подчеркивания _';
        }
    }
    passwordCheck(value: string, value2?: string) {
        if (value.length === 0) {
            return 'Пароль не может быть пустым';
        }
        if (value.length < 8 || value.length > 40) {
            return 'Пароль не может быть меньше 8 и более 40 символов';
        }
        if (!/[0-9]/.test(value) || value === value.toLowerCase()) {
            return 'Пароль должен содержать хотя бы одну цифру и заглавную букву';
        }
        if (!value2) return;
        if (value !== value2) {
            return 'Пароли не совпадают';
        }
    }

    emailCheck(value: string){
        if (value.length === 0) return 'email не может быть пустым';
        if (!/[^@\s]+@[^@\s]+\.[^@\s]+/.test(value)) {
            return 'Некорректная электронная почта';
        }
    }

    nameCheck(value: string){
        if (value.length === 0) return 'Поле не может быть пустым';
        if (!/^[A-ZА-ЯЁ]/.test(value)) {
            return 'Первая буква должна быть заглавной';
        }
        if (/[0-9 ]/.test(value)) {
            return 'Поле не может содержать пробелы или цифры';
        }
        if (/-$/.test(value)) {
            return 'Поле не может оканчиваться дефисом';
        }
        if (/[А-ЯЁа-яё][А-ЯЁ]/.test(value)) {
            return 'Заглавные буквы не могут быть в середине слова';
        }
        if (!/^[A-ZА-ЯЁ][A-Za-zа-яё]+(-[A-ZА-ЯЁ]?[A-Za-zа-яё]+)*$/.test(value)) {
            return 'Поле может содержать только кириллицу/латиницу и дефисы';
        }    }

    phoneCheck(value: string){
        if (value.length === 0) {
            return 'Поле не может быть пустым';
        }
        if (!/^\+?[0-9]+$/.test(value)) {
            return 'Формат телефона не правильный';
        }
        if (value.length < 10) {
            return 'Телефон должен быть больше 10 символов';
        }
        if (value.length > 15) {
            return 'Телефон не может быть больше 15 символов';
        }
        if (/[ \-]/.test(value)) {
            return 'Телефон не должен содержать пробелы или дефисы';
        }
    }
    displayNameCheck(value: string) {
        if (value.length === 0) {
            return 'Поле не может быть пустым';
        }
        if (value.length < 3) {
            return 'Имя должно быть больше 3 символов';
        }
        if (value.length > 20) {
            return 'Имя не может быть больше 20 символов';
        }
    }
    messageCheck(value: string) {
        if (value.length === 0) {
            return 'Сообщение не может быть пустым';
        }
    }
}
