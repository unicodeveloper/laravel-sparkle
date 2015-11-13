/**
 * Define the form error collection class.
 */
require('./errors');

/**
 * SparkForm helper class. Used to set common properties on all forms.
 */
window.SparkForm = function (data) {
    var form = this;

    _.extend(this, data);

    this.errors = new SparkFormErrors();
    this.busy = false;
    this.successful = false;

    this.startProcessing = function () {
        form.errors.forget();
        form.busy = true;
        form.successful = false;
    };

    this.finishProcessing = function () {
        form.busy = false;
        form.successful = true;
    };
};

/**
 * Add additional form helpers to the Spark object.
 */
_.extend(Spark, require('./http'));

/**
 * Define the Spark form input components.
 */
require('./components');
