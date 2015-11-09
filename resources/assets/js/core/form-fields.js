var errorHelperMethods = {
    /**
     * Determine if the form has an error for the field.
     */
    hasError: function () {
        return _.indexOf(_.keys(this.form.fullErrors), this.name) > -1;
    },


    /**
     * Get the first error for the given field if it exists.
     */
    getError: function () {
        if (this.hasError()) {
            return this.form.fullErrors[this.name][0];
        }
    }
};

/**
 * Text field input component for Bootstrap.
 */
Vue.component('spark-text', {
    props: ['display', 'form', 'name', 'input'],

    /**
     * Include the helper methods in the component.
     */
    methods: errorHelperMethods,

    template: '<div class="form-group" :class="{\'has-error\': hasError()}">\
    <label class="col-md-3 control-label">{{ display }}</label>\
    <div class="col-md-6">\
        <input type="text" class="form-control" v-model="input">\
        <span class="help-block" v-show="hasError()">\
            <strong>{{ getError() }}</strong>\
        </span>\
    </div>\
</div>'
});


/**
 * E-mail field input component for Bootstrap.
 */
Vue.component('spark-email', {
    props: ['display', 'form', 'name', 'input'],

    /**
     * Include the helper methods in the component.
     */
    methods: errorHelperMethods,

    template: '<div class="form-group" :class="{\'has-error\': hasError()}">\
    <label class="col-md-3 control-label">{{ display }}</label>\
    <div class="col-md-6">\
        <input type="email" class="form-control" v-model="input">\
        <span class="help-block" v-show="hasError()">\
            <strong>{{ getError() }}</strong>\
        </span>\
    </div>\
</div>'
});


/**
 * Password field input component for Bootstrap.
 */
Vue.component('spark-password', {
    props: ['display', 'form', 'name', 'input'],

    /**
     * Include the helper methods in the component.
     */
    methods: errorHelperMethods,

    template: '<div class="form-group" :class="{\'has-error\': hasError()}">\
    <label class="col-md-3 control-label">{{ display }}</label>\
    <div class="col-md-6">\
        <input type="password" class="form-control" v-model="input">\
        <span class="help-block" v-show="hasError()">\
            <strong>{{ getError() }}</strong>\
        </span>\
    </div>\
</div>'
});


/**
 * Password field input component for Bootstrap.
 */
Vue.component('spark-select', {
    props: ['display', 'form', 'name', 'items', 'input'],

    /**
     * Include the helper methods in the component.
     */
    methods: errorHelperMethods,

    template: '<div class="form-group" :class="{\'has-error\': hasError()}">\
    <label class="col-md-3 control-label">{{ display }}</label>\
    <div class="col-md-8">\
        <select class="form-control" v-model="input">\
            <option v-for="item in items" :value="item.value">\
                {{ item.text }}\
            </option>\
        </select>\
        <span class="help-block" v-show="hasError()">\
            <strong>{{ getError() }}</strong>\
        </span>\
    </div>\
</div>'
});
