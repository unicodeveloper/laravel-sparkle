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

            updateProfileForm: new SparkForm({
                name: '',
                email: '',
            })
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
            var self = this;

            Spark.put('/settings/user', this.updateProfileForm)
                .then(function () {
                    self.$dispatch('updateUser');
                });
        }
    }
});
