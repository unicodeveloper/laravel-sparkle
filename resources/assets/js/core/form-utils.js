
/**
 * SparkForm helper class. Used to set common properties.
 */
window.SparkForm = function (data) {
    var form = this;

    _.extend(this, data);

    this.fullErrors = {};
    this.errors = [];
    this.busy = false;
    this.successful = false;

    this.startProcessing = function () {
        form.fullErrors = {};
        form.errors = [];
        form.busy = true;
        form.successful = false;
    };

    this.finishProcessing = function () {
        form.busy = false;
        form.successful = true;
    };
};

/**
 * Extend Spark with helpful form helpers.
 */
_.extend(Spark, {
    post: function (uri, form) {
        return Spark.sendForm('post', uri, form);
    },


    put: function (uri, form) {
        return Spark.sendForm('put', uri, form);
    },


    delete: function (uri, form) {
        return Spark.sendForm('delete', uri, form);
    },


    /**
     * Send the form to the back-end server. Perform common form tasks.
     *
     * This function will automatically clear old errors, update "busy" status, etc.
     */
    sendForm: function (method, uri, form) {
        return new Promise(function (resolve, reject) {
            form.startProcessing();

            Vue.http[method](uri, form)
                .success(function (response) {
                    form.finishProcessing();

                    resolve(response);
                })
                .error(function (errors) {
                    form.fullErrors = errors;
                    Spark.setErrorsOnForm(form, errors);
                    form.busy = false;

                    reject(errors);
                });
        });
    },


    /**
     * Set errors on the form. Flatten the errors if necessary.
     */
    setErrorsOnForm: function (form, errors) {
        if (typeof errors === 'object') {
            form.errors = _.flatten(_.toArray(errors));
        } else {
            form.errors.push('Something went wrong. Please try again.');
        }
    },


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
});
