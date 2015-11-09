<spark-settings-profile-screen inline-template>
    <div id="spark-settings-profile-screen" class="panel panel-default">
        <div class="panel-heading">Update Profile</div>

        <div class="panel-body">
            <spark-error-alert :form="updateProfileForm"></spark-error-alert>

            <div class="alert alert-success" v-if="updateProfileForm.successful">
                <strong>Great!</strong> Your profile was successfully updated.
            </div>

            <form class="form-horizontal" role="form">
                <spark-text :display="'Name'"
                            :form="updateProfileForm"
                            :name="'name'"
                            :input.sync="updateProfileForm.name">
                </spark-text>

                <spark-email :display="'E-Mail Address'"
                             :form="updateProfileForm"
                             :name="'email'"
                             :input.sync="updateProfileForm.email">
                </spark-email>

                <div class="form-group">
                    <div class="col-md-6 col-md-offset-3">
                        <button type="submit" class="btn btn-primary" @click.prevent="updateProfile" :disabled="updateProfileForm.busy">
                            <span v-if="updateProfileForm.busy">
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
</spark-settings-profile-screen>

