<spark-settings-profile-basics-screen inline-template>
    <div id="spark-settings-profile-basics-screen" class="panel panel-default">
        <div class="panel-heading">The Basics</div>

        <div class="panel-body">
            <spark-error-alert :form="updateProfileBasicsForm"></spark-error-alert>

            <div class="alert alert-success" v-if="updateProfileBasicsForm.successful">
                <strong>Great!</strong> Your profile was successfully updated.
            </div>

            <form class="form-horizontal" role="form">
                <spark-text :display="'Name'"
                            :form="updateProfileBasicsForm"
                            :name="'name'"
                            :input.sync="updateProfileBasicsForm.name">
                </spark-text>

                <spark-email :display="'E-Mail Address'"
                             :form="updateProfileBasicsForm"
                             :name="'email'"
                             :input.sync="updateProfileBasicsForm.email">
                </spark-email>

                <div class="form-group">
                    <div class="col-md-6 col-md-offset-4">
                        <button type="submit" class="btn btn-primary"
                                  @click.prevent="updateProfileBasics" :disabled="updateProfileBasicsForm.busy">
                            <span v-if="updateProfileBasicsForm.busy">
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
</spark-settings-profile-basics-screen>

