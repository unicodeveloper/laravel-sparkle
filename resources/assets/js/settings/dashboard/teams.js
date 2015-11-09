Vue.component('spark-settings-teams-screen', {
    /*
     * Bootstrap the component. Load the initial data.
     */
    ready: function () {
        this.getInvitations();
    },


    /*
     * Initial state of the component's data.
     */
    data: function () {
        return {
            user: null,
            teams: [],
            invitations: [],

            teamToDelete: null,

            createTeamForm: new SparkForm({
                name: ''
            }),

            deleteTeamForm: new SparkForm({})
        };
    },


    events: {
        /*
         * Handle the "userRetrieved" event.
         */
        userRetrieved: function (user) {
            this.user = user;

            return true;
        },


        /*
         * Handle the "teamsRetrieved" event.
         */
        teamsRetrieved: function (teams) {
            this.teams = teams;

            return true;
        }
    },


    methods: {
        /*
         * Get all of the user's pending invitations from the API.
         */
        getInvitations: function () {
            this.$http.get('/spark/api/teams/invitations')
                .success(function (invitations) {
                    this.invitations = invitations;
                });
        },


        /**
         * Create a new team.
         */
        createTeam: function () {
            var self = this;

            Spark.post('/settings/teams', this.createTeamForm)
                .then(function () {
                    self.createTeamForm.name = '';

                    self.$dispatch('updateUser');
                    self.$dispatch('updateTeams');
                });
        },


        /*
         * Leave the team.
         */
        leaveTeam: function (team) {
            this.teams = _.reject(this.teams, function (t) {
                return t.id == team.id;
            });

            this.$http.delete('/settings/teams/' + team.id + '/membership')
                .success(function () {
                    this.$dispatch('updateUser');
                    this.$dispatch('updateTeams');
                });
        },


        /*
         * Confirm that the user really wants to delete the team.
         */
        confirmTeamDeletion: function (team) {
            this.teamToDelete = team;

            $('#modal-delete-team').modal('show');
        },


        /*
         * Delete the given team.
         */
        deleteTeam: function () {
            var self = this;

            Spark.delete('/settings/teams/' + this.teamToDelete.id, this.deleteTeamForm)
                .then(function () {
                    $('#modal-delete-team').modal('hide');

                    self.$dispatch('updateUser');
                    self.$dispatch('updateTeams');
                });
        },


        /*
         * Accept a pending invitation.
         */
        acceptInvite: function (invite) {
            this.invitations = _.reject(this.invitations, function (i) {
                return i.id == invite.id;
            });

            this.$http.post('/settings/teams/invitations/' + invite.id + '/accept')
                .success(function () {
                    this.$dispatch('updateUser');
                    this.$dispatch('updateTeams');
                });
        },


        /*
         * Reject a pending invitation.
         */
        rejectInvite: function (invite) {
            this.invitations = _.reject(this.invitations, function (i) {
                return i.id == invite.id;
            });

            this.$http.delete('settings/teams/invitations/' + invite.id);
        },


        /*
         * Determine if the current user owns the given team.
         */
        userOwns: function (team) {
            if ( ! this.user) {
                return false;
            }

            return this.user.id === team.owner_id;
        },

        /**
         * Experimental Error Stuff! Also fullErrors on form...
         */
        hasError: function (form, field) {
            var keys = _.keys(form.fullErrors);
            console.log(keys);
            if (_.indexOf(keys, field) > -1) {
                return true;
            }
            return false;
        },

        getError: function (form, field) {
            if (this.hasError(form, field)) {
                return form.fullErrors[field][0];
            }
        }
    }
});
