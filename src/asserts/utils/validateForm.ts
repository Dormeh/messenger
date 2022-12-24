import {ValidateComponent} from './validateByType'

export enum ValidateRuleType {
    login = 'login',
    password = 'password',
    password_confirm = 'password_confirm',
    email = 'email',
    first_name = 'first_name',
    second_name = 'second_name',
    phone = 'phone',
    display_name = 'display_name',
    message = 'message'
}

type ValidateRule = {
    type: ValidateRuleType
    value: string,
    value2?: string,
}

type strObj = { [key: string]: string | undefined }

const validateByType: any = new ValidateComponent();


export function validateForm(rules: { type: string; value: string; value2: string }[]): object {

    const errorMessage: strObj = {};

    for (const {type, value, value2} of rules) {

        errorMessage[type] = validateByType.initByType[type](value, value2) || '';
    }


    return errorMessage;
}
