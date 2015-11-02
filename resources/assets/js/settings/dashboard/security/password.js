Vue.component('spark-settings-security-password-screen', {
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

            updatePasswordForm: new SparkForm({
                old_password: '',
                password: '',
                password_confirmation: ''
            })
        };
    },


    events: {
        /*
         * Handle the "userRetrieved" event.
         */
        userRetrieved: function (user) {
            this.user = user;

            return true;
        }
    },


    methods: {
        /**
         * Update the user's password.
         */
        updatePassword: function () {
            var self = this;

            Spark.put('/settings/user/password', this.updatePasswordForm)
                .then(function () {
                    self.updatePasswordForm.old_password = '';
                    self.updatePasswordForm.password = '';
                    self.updatePasswordForm.password_confirmation = '';
                });
        }
    }
});
