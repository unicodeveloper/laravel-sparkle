Vue.component('spark-team-settings-edit-team-member-screen', {
    props: ['teamMember'],

    /*
     * Initial state of the component's data.
     */
	data: function () {
		return {
	        user: null,
	        team: null,
	        roles: [],

            updateTeamMemberForm: new SparkForm({
                role: ''
            })
		};
	},


    watch: {
        /**
         * Watch for updates to the "teamMember" data.
         */
        'teamMember': function (member) {
            this.updateTeamMemberForm.role = member.pivot.role;
        }
    },


	computed: {
        /**
         * Get the roles that may be assigned to users.
         */
        assignableRoles: function () {
            return _.reject(this.roles, function (role) {
                return role.value == 'owner';
            });
        },
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
         * Edit a given team member.
         */
        updateTeamMember: function () {
            var self = this;

            Spark.put('/settings/teams/' + this.team.id + '/members/' + this.teamMember.id, this.updateTeamMemberForm)
                .then(function (team) {
                    self.$dispatch('teamUpdated', team);

                    $('#modal-edit-team-member').modal('hide');
                });
        }
	}
});
