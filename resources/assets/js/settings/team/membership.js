Vue.component('spark-team-settings-membership-screen', {
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
            team: null,
            roles: [],
            leavingTeam: false,

            editingTeamMember: null,

            sendInviteForm: new SparkForm({
                email: ''
            })
        };
    },


    computed: {
        /*
         * Determine if all necessary data has been loaded.
         */
        everythingIsLoaded: function () {
            return this.user && this.team && this.roles.length > 0;
        },


        /*
         * Get all users except for the current user.
         */
        teamMembersExceptMe: function () {
            var self = this;

            return _.reject(this.team.users, function (user) {
                return user.id === self.user.id;
            });
        }
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
         * Handle the "teamRetrieved" event.
         */
        teamRetrieved: function (team) {
            this.team = team;

            return true;
        },


        /*
         * Handle the "rolesRetrieved" event.
         */
        rolesRetrieved: function (roles) {
            this.roles = roles;

            return true;
        }
    },


    methods: {
        /*
         * Send an invitation to a new user.
         */
        sendInvite: function () {
            var self = this;

            Spark.post('/settings/teams/' + this.team.id + '/invitations', this.sendInviteForm)
                .then(function (team) {
                    self.$dispatch('teamUpdated', team);

                    self.sendInviteForm.email = '';
                });
        },


        /*
         * Cancel an existing invitation.
         */
        cancelInvite: function (invite) {
            this.team.invitations = _.reject(this.team.invitations, function (i) {
                return i.id === invite.id;
            });

            this.$http.delete('/settings/teams/' + this.team.id + '/invitations/' + invite.id)
                .success(function (team) {
                    this.$dispatch('teamUpdated', team);
                });
        },


        /*
         * Edit an existing team member.
         */
        editTeamMember: function (member) {
            this.editingTeamMember = member;

            $('#modal-edit-team-member').modal('show');
        },


        /*
         * Remove an existing team member from the team.
         */
        removeTeamMember: function (teamMember) {
            this.team.users = _.reject(this.team.users, function (u) {
                return u.id == teamMember.id;
            });

            this.$http.delete('/settings/teams/' + this.team.id + '/members/' + teamMember.id)
                .success(function (team) {
                    this.$dispatch('teamUpdated', team);
                });
        },


        /*
         * Leave the team.
         */
        leaveTeam: function () {
            this.leavingTeam = true;

            this.$http.delete('/settings/teams/' + this.team.id + '/membership')
                .success(function () {
                    window.location = '/settings?tab=teams';
                });
        },


        /*
         * Determine if the current user owns the given team.
         */
        userOwns: function (team) {
            if ( ! this.user) {
                return false;
            }

            return this.user.id === team.owner_id;
        }
    },


    filters: {
        /**
         * Filter the role to its displayable name.
         */
        role: function (value) {
            return _.find(this.roles, function (role) {
                return role.value == value;
            }).text;
        }
    }
});
