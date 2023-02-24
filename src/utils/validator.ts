type Data = Record<string, string>;
type Config = Record<string, any>;
type ValidateMethod = string;
type Value = string;

function getError(validateMethod: ValidateMethod, value: Value, config: Config) {
    let statusValidate: boolean = false;

    switch (validateMethod) {
        case 'isRequired':
            statusValidate = value.trim() === '';
            break;
        case 'isPhone': {
            const phoneRegExp = /\+?[0-9]{10,15}/;
            statusValidate = !phoneRegExp.test(value);
            break;
        }
        case 'isPersonName': {
            const nameRegExp = /^[A-ZА-Я][a-zа-яйё-]+/;
            statusValidate = !nameRegExp.test(value);
            break;
        }
        case 'isEmail': {
            const emailRegExp = /^\S+@\S+\.\S+$/;
            statusValidate = !emailRegExp.test(value);
            break;
        }
        case 'isCapitalSymbol': {
            const capitalRegExp = /[A-Z]+/;
            statusValidate = !capitalRegExp.test(value);
            break;
        }
        case 'isNumberOrLetter': {
            const numberOrLetterRegExp = /^\w*(?=\w*[A-Za-z])\w*$/;
            statusValidate = !numberOrLetterRegExp.test(value);
            break;
        }
        case 'isNumberAndLetter': {
            const numberAndLetterRegExp = /^\w*(?=\w*\d)(?=\w*[A-Za-z])\w*$/;
            statusValidate = !numberAndLetterRegExp.test(value);
            break;
        }
        case 'isContainDigit': {
            const digitRegExp = /\d+/g;
            statusValidate = !digitRegExp.test(value);
            break;
        }
        case 'min':
            statusValidate = value.length < config.value;
            break;
        case 'max':
            statusValidate = value.length > config.value;
            break;
        case 'isMatch':
            statusValidate = value !== config.password;
            break;
        default:
            break;
    }

    if (statusValidate) return config.message;
}

export class Validator {
    private validateByField(data: Data, config: Config) {
        const errors: Record<string, string> = {};
        const { fieldName, value } = data;

        for (const validateMethod in config[fieldName]) {
            const error = getError(validateMethod, value, config[fieldName][validateMethod]);

            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }

        return errors;
    }



    private validateAll(data: Data, config: Config) {
        const errors: Record<string, string> = {};

        for (const fieldName in data) {
            for (const validateMethod in config[fieldName]) {
                const error = getError(validateMethod, data[fieldName], config[fieldName][validateMethod]);

                if (error && !errors[fieldName]) {
                    errors[fieldName] = error;
                }
            }
        }

        return errors;
    }

    public validate(validatorConfig: Config, state: Record<string, any>, fieldName?: string) {
        let errors = {};

        if (fieldName) {
            errors = this.validateByField({ fieldName, value: state[fieldName] }, validatorConfig);
        } else {
            errors = this.validateAll(state, validatorConfig);
        }

        const errorsLength = Object.keys(errors).length;

        return {
            errors,
            hasErrors: errorsLength > 0,
        };
    }
}
