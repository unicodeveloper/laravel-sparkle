<spark-team-settings-owner-screen inline-template>
    <div id="spark-team-settings-owner-screen">
        <div class="panel panel-default">
            <div class="panel-heading">The Basics</div>

            <div class="panel-body">
                <div class="alert alert-success" v-if="updateTeamForm.successful">
                    <strong>Great!</strong> Your team was successfully updated.
                </div>

                <form class="form-horizontal" role="form">
                    <spark-text :display="'Name'"
                                :form="updateTeamForm"
                                :name="'name'"
                                :input.sync="updateTeamForm.name">
                    </spark-text>

                    <div class="form-group">
                        <div class="col-md-6 col-md-offset-4">
                            <button type="submit" class="btn btn-primary" @click.prevent="updateTeam" :disabled="updateTeamForm.busy">
                                <span v-if="updateTeamForm.busy">
                                    <i class="fa fa-btn fa-spinner fa-spin"></i> Updating
                                </span>

                                <span v-else>
                                    <i class="fa fa-btn fa-save"></i> Update
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</spark-team-settings-owner-screen>
