Vue.component('spark-simple-registration-screen', {
    mixins: [Spark.formHelpers],

    /*
     * Bootstrap the component. Load the initial data.
     */
    ready: function () {
        $(function() {
            $('.spark-first-field').filter(':visible:first').focus();
        });

        var queryString = URI(document.URL).query(true);

        if (queryString.invitation) {
            this.getInvitation(queryString.invitation);
        }
    },

    /*
     * Initial state of the component's data.
     */
    data: function () {
        return {
            invitation: null,
            failedToLoadInvitation: false,

            registerForm: new SparkForm({
                team_name: '', name: '', email: '', password: '', password_confirmation: '',
                plan: '', terms: false, invitation: null
            }),
        };
    },


    methods: {
        /**
         * Get the specified invitation.
         */
        getInvitation: function (invitation) {
            this.$http.get('/spark/api/teams/invitation/' + invitation)
                .success(function (invitation) {
                    this.invitation = invitation;
                    this.registerForm.invitation = invitation.token;

                    setTimeout(function () {
                        $(function() {
                            $('.spark-first-field').filter(':visible:first').focus();
                        });
                    }, 250);
                })
                .error(function (errors) {
                    this.failedToLoadInvitation = true;

                    console.error('Unable to load invitation for given code.');
                });
        },


        /*
         * Initialize the registration process.
         */
        register: function() {
            Spark.post('/register', this.registerForm)
                .then(function (response) {
                    window.location = response.path;
                });
        }
    }
});
