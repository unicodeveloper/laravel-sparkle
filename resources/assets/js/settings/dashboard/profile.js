Vue.component('spark-settings-profile-screen', {
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

            updateProfileForm: {
                name: '',
                email: '',
                errors: [],
                updating: false,
                updated: false
            }
        };
    },


    events: {
        /*
         * Handle the "userRetrieved" event.
         */
        userRetrieved: function (user) {
            this.user = user;

            this.updateProfileFormForNewUser(user);

            return true;
        }
    },


    methods: {
        /**
         * Update the user profile form with new user information.
         */
        updateProfileFormForNewUser: function (user) {
            this.updateProfileForm.name = user.name;
            this.updateProfileForm.email = user.email;
        },


        /**
         * Update the user's profile information.
         */
        updateProfile: function () {
            this.updateProfileForm.errors = [];
            this.updateProfileForm.updated = false;
            this.updateProfileForm.updating = true;

            this.$http.put('/settings/user', this.updateProfileForm)
                .success(function (user) {
                    this.updateProfileForm.updated = true;
                    this.updateProfileForm.updating = false;

                    this.$dispatch('updateUser');
                })
                .error(function (errors) {
                    Spark.setErrorsOnForm(this.updateProfileForm, errors);
                    this.updateProfileForm.updating = false;
                });
        }
    }
});
