<!-- Subscribe Plan Selector -->
<div class="panel panel-default" v-if=" ! user.stripe_active && ! userIsOnGracePeriod && ! subscribeForm.plan">
    <div class="panel-heading">Subscribe</div>

    <div class="panel-body">
        @include('spark::settings.tabs.subscription.subscribe.selector')
    </div>
</div>

<!-- Plan Is Selected -->
<div v-if=" ! user.stripe_active && ! userIsOnGracePeriod && subscribeForm.plan">
    <!-- Selected Plan / Select Another Plan -->
    <div class="panel panel-default">
        <div class="panel-heading">Your Plan</div>

        <div class="panel-body">
            <div class="pull-left" style="line-height: 36px;">
                You have selected the <strong>@{{ selectedPlan.name }}</strong>
                (@{{ selectedPlanPrice }} / @{{ selectedPlan.interval | capitalize}}) plan.
            </div>

            <div class="pull-right" style="line-height: 32px;">
                <button class="btn btn-primary" @click.prevent="selectAnotherPlan">
                    <i class="fa fa-btn fa-arrow-left"></i>Change Plan
                </button>
            </div>

            <div class="clearfix"></div>
        </div>
    </div>

    <!-- Subscription Billing Information -->
    <div class="panel panel-default">
        <div class="panel-heading">
                Billing Information
        </div>

        <div class="panel-body">
            <spark-error-alert :form="subscribeForm"></spark-error-alert>
            <spark-error-alert :form="cardForm"></spark-error-alert>

            <form class="form-horizontal" role="form">
                <div class="form-group" :class="{'has-error': hasError(cardForm, 'number')}">
                    <label for="number" class="col-md-3 control-label">Card Number</label>

                    <div class="col-md-6">
                        <input type="text" class="form-control spark-first-field" name="number" data-stripe="number" v-model="cardForm.number">

                        <span class="help-block" v-show="hasError(cardForm, 'number')">
                            <strong>@{{ getError(cardForm, 'number') }}</strong>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <label for="cvc" class="col-md-3 control-label">Security Code</label>

                    <div class="col-md-6">
                        <input type="text" class="form-control" name="cvc" data-stripe="cvc" v-model="cardForm.cvc">
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-md-3 control-label">Expiration</label>

                    <div class="col-md-3">
                        <input type="text" class="form-control" name="month" placeholder="MM" maxlength="2" data-stripe="exp-month" v-model="cardForm.month">
                    </div>

                    <div class="col-md-3">
                        <input type="text" class="form-control" name="year" placeholder="YYYY" maxlength="4" data-stripe="exp-year" v-model="cardForm.year">
                    </div>
                </div>

                <div class="form-group">
                    <label for="zip" class="col-md-3 control-label">ZIP / Postal Code</label>

                    <div class="col-md-6">
                        <input type="text" class="form-control" name="zip" v-model="cardForm.zip">
                    </div>
                </div>

                <div class="form-group" :class="{'has-error': hasError(subscribeForm, 'terms')}">
                    <div class="col-md-6 col-md-offset-3">
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" v-model="subscribeForm.terms">
                                I Accept The <a href="/terms" target="_blank">Terms Of Service</a>
                            </label>
                        </div>

                        <span class="help-block" v-show="hasError(subscribeForm, 'terms')">
                            <strong>@{{ getError(subscribeForm, 'terms') }}</strong>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-md-6 col-md-offset-3">
                        <button type="submit" class="btn btn-primary" @click.prevent="subscribe" :disabled="subscribeForm.busy">
                            <span v-if="subscribeForm.busy">
                                <i class="fa fa-btn fa-spinner fa-spin"></i> Subscribing
                            </span>

                            <span v-else>
                                <i class="fa fa-btn fa-check-circle"></i> Subscribe
                            </span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
