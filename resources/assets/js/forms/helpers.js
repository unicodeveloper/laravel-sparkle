/**
 * SparkForm helper class. Used to set common properties on all forms.
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
 * Add additional form helpers to the Spark object.
 */
_.extend(Spark, require('./http'));
_.extend(Spark, require('./errors'));

/**
 * Define the Spark form input components.
 */
require('./components');
