export function userDataToForm(data: {}, form: {inputs: Array<{}>}) {
    form.inputs.forEach((elem: {}) => {
        if(data[elem.name]) elem.value = data[elem.name];
    })

    return form;
}
