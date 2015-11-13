/**
 * Spark form error collection class.
 */
window.SparkFormErrors = function () {
    var self = this;

    this.errors = {};

    /**
     * Determine if the collection has any errors.
     */
    this.hasErrors = function () {
        return ! _.isEmpty(self.errors);
    };


    /**
     * Determine if the collection has errors for a given field.
     */
    this.has = function (field) {
        return _.indexOf(_.keys(self.errors), field) > -1;
    };


    /**
     * Get all of the raw errors for the collection.
     */
    this.all = function () {
        return self.errors;
    };


    /**
     * Get all of the errors for the collection in a flat array.
     */
    this.flatten = function () {
        return _.flatten(_.toArray(self.errors));
    };


    /**
     * Get the first error message for a given field.
     */
    this.get = function (field) {
        if (self.has(field)) {
            return self.errors[field][0];
        }
    };


    /**
     * Set the raw errors for the collection.
     */
    this.set = function (errors) {
        if (typeof errors === 'object') {
            self.errors = errors;
        } else {
            self.errors = {'field': ['Something went wrong. Please try again.']};
        }
    };


    /**
     * Forget all of the errors currently in the collection.
     */
    this.forget = function () {
        self.errors = {};
    };
};
