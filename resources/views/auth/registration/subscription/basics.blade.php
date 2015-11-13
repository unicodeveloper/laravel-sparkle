<div class="panel panel-default">
    <div class="panel-heading">The Basics</div>
    <div class="panel-body">
        <spark-error-alert :form="registerForm"></spark-error-alert>

        <form class="form-horizontal" role="form" id="subscription-basics-form">
            @if (Spark::usingTeams())
                <spark-text :display="'Team Name'"
                            :form="registerForm"
                            :name="'team_name'"
                            :input.sync="registerForm.team_name">
                </spark-text>
            @endif

            <spark-text :display="'Name'"
                        :form="registerForm"
                        :name="'name'"
                        :input.sync="registerForm.name">
            </spark-text>

            <spark-email :display="'E-Mail Address'"
                        :form="registerForm"
                        :name="'email'"
                        :input.sync="registerForm.email">
            </spark-email>

            <spark-password :display="'Password'"
                        :form="registerForm"
                        :name="'password'"
                        :input.sync="registerForm.password">
            </spark-password>

            <spark-password :display="'Confirm Password'"
                        :form="registerForm"
                        :name="'password_confirmation'"
                        :input.sync="registerForm.password_confirmation">
            </spark-password>

            <div v-if="freePlanIsSelected">
                <div class="form-group" :class="{'has-error': registerForm.errors.has('terms')}">
                    <div class="col-sm-6 col-sm-offset-4">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="registerForm.terms"> I Accept The <a href="/terms" target="_blank">Terms Of Service</a>

                                <span class="help-block" v-show="registerForm.errors.has('terms')">
                                    <strong>@{{ registerForm.errors.get('terms') }}</strong>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-6 col-sm-offset-4">
                        <button type="submit" class="btn btn-primary" @click.prevent="register" :disabled="registerForm.busy">
                            <span v-if="registerForm.busy">
                                <i class="fa fa-btn fa-spinner fa-spin"></i> Registering
                            </span>

                            <span v-else>
                                <i class="fa fa-btn fa-check-circle"></i> Register
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
