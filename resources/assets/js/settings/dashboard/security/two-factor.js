Vue.component('spark-settings-security-two-factor-screen', {
    /*
     * Bootstrap the component. Load the initial data.
     */
    ready: function () {
        //
    },


    /*
     * Initial state of the component's data.
     */
    data: function () {
        return {
            user: null,

            twoFactorForm: new SparkForm({
                country_code: '',
                phone_number: '',
                enabled: false
            }),

            disableTwoFactorForm: new SparkForm({})
        };
    },


    events: {
        /*
         * Handle the "userRetrieved" event.
         */
        userRetrieved: function (user) {
            this.user = user;

            this.twoFactorForm.country_code = this.user.phone_country_code;
            this.twoFactorForm.phone_number = this.user.phone_number;

            return true;
        }
    },


    methods: {
        /**
         * Enable two-factor authentication for the user.
         */
        enableTwoFactorAuth: function () {
            var self = this;

            Spark.post('/settings/user/two-factor', this.twoFactorForm)
                .then(function () {
                    self.$dispatch('updateUser');

                    self.twoFactorForm.enabled = true;
                });
        },


        /**
         * Disable two-factor authentication for the user.
         */
        disableTwoFactorAuth: function () {
            var self = this;

            this.twoFactorForm.enabled = false;

            Spark.delete('/settings/user/two-factor', this.disableTwoFactorForm)
                .then(function () {
                    self.$dispatch('updateUser');
                });
        }
    }
});
