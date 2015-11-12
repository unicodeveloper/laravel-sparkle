<spark-team-settings-owner-basics-screen inline-template>
    <div class="panel panel-default">
        <div class="panel-heading">The Basics</div>

        <div class="panel-body">
            <div class="alert alert-success" v-if="updateTeamBasicsForm.successful">
                <strong>Great!</strong> Your team was successfully updated.
            </div>

            <form class="form-horizontal" role="form">
                <spark-text :display="'Name'"
                            :form="updateTeamBasicsForm"
                            :name="'name'"
                            :input.sync="updateTeamBasicsForm.name">
                </spark-text>

                <div class="form-group">
                    <div class="col-md-6 col-md-offset-4">
                        <button type="submit" class="btn btn-primary" @click.prevent="updateTeam" :disabled="updateTeamBasicsForm.busy">
                            <span v-if="updateTeamBasicsForm.busy">
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
</spark-team-settings-owner-screen>
