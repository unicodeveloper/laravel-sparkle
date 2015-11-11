module.exports = {
    /**
     * Set errors on the form. Flatten the errors if necessary.
     */
    setErrorsOnForm: function (form, errors) {
        form.fullErrors = errors;

        if (typeof errors === 'object') {
            form.errors = _.flatten(_.toArray(errors));
        } else {
            form.errors.push('Something went wrong. Please try again.');
        }
    },


    /**
     * These are mixed into the components for inline error messages.
     */
    formHelpers: {
            methods: {
                /**
                 * Determine if the form has an error for the field.
                 */
                hasError: function (form, field) {
                    return _.indexOf(_.keys(form.fullErrors), field) > -1;
                },


                /**
                 * Get the first error for the given field if it exists.
                 */
                getError: function (form, field) {
                    if (this.hasError(form, field)) {
                        return form.fullErrors[field][0];
                    }
                }
            }
    }
};
