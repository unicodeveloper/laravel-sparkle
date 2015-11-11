
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
 * Add the HTTP form helpers to the Spark object.
 */
_.extend(Spark, require('./http'));

/**
 * Add the error message helpers to the Spark object.
 */
_.extend(Spark, require('./errors'));
