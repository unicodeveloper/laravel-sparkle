Vue.component('spark-settings-profile-basics-screen', {
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

            updateProfileBasicsForm: new SparkForm({
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

            this.updateProfileBasicsFormForNewUser(user);

            return true;
        }
    },


    methods: {
        /**
         * Update the user profile form with new user information.
         */
        updateProfileBasicsFormForNewUser: function (user) {
            this.updateProfileBasicsForm.name = user.name;
            this.updateProfileBasicsForm.email = user.email;
        },


        /**
         * Update the user's profile information.
         */
        updateProfileBasics: function () {
            var self = this;

            Spark.put('/settings/user', this.updateProfileBasicsForm)
                .then(function () {
                    self.$dispatch('updateUser');
                });
        }
    }
});
