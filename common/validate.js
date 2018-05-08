const validatorList = require('validator')

/**
 *
 * @param {Object} data
 * @param {Object} rules {
 *      someField: [
 *          {
 *              validator: 'isLength',
 *              reverse: false,
 *              message: '',
 *              extraArgs: {}
 *          }
 *      ]
 * }
 * @param {*} messages
 */
module.exports = function validate (data, rules) {
    const ret = { isValid: true, data: null, errors: null }
    if (!rules) return ret
    const safeFields = Object.keys(rules)
    safeFields.forEach(field => {
        const fieldValRet = module.exports.validateField(data[field], rules[field], data)
        if (fieldValRet.isValid) {
            if (!ret.data) ret.data = {}
            ret.data[field] = data[field]
        } else {
            ret.isValid = false
            if (!ret.errors) ret.errors = {}
            ret.errors[field] = fieldValRet.error
        }
    })
    return ret
}

module.exports.validateField = function (value, fieldRules, formData = null) {
    const ret = {
        isValid: true,
        error: ''
    }
    fieldRules.forEach(({ validator, extraArgs, reverse = false, message = '' }) => {
        if (!ret.isValid) return
        const isCustom = typeof validator === 'function'
        const validatorFunc = isCustom ? validator : validatorList[validator]
        if (!validatorFunc) throw new Error(`${validator} is not a valid validator.`)
        let validatorArgs
        if (isCustom) {
            validatorArgs = [formData]
        } else {
            if (!Array.isArray(extraArgs)) {
                validatorArgs = [extraArgs]
            } else {
                validatorArgs = extraArgs
            }
        }
        ret.isValid = validatorFunc(value, ...validatorArgs)
        ret.isValid = reverse ? !ret.isValid : ret.isValid
        if (!ret.isValid) {
            ret.isValid = false
            ret.error = message
        }
    })
    return ret
}
