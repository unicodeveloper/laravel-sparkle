<div class="panel panel-default" v-if="user.stripe_active">
    <div class="panel-heading">Update Card</div>

    <div class="panel-body">
        <spark-error-alert :form="updateCardForm"></spark-error-alert>

        <div class="alert alert-success" v-if="updateCardForm.updated">
            <strong>Done!</strong> Your card has been updated.
        </div>

        <form class="form-horizontal" role="form">
            <div class="form-group" :class="{'has-error': hasError(updateCardForm, 'number')}">
                <label for="number" class="col-md-3 control-label">Card Number</label>

                <div class="col-md-6">
                    <input type="text"
                        class="form-control"
                        name="number"
                        data-stripe="number"
                        placeholder="************@{{ user.last_four }}"
                        v-model="updateCardForm.number">

                    <span class="help-block" v-show="hasError(updateCardForm, 'number')">
                        <strong>@{{ getError(updateCardForm, 'number') }}</strong>
                    </span>
                </div>
            </div>

            <div class="form-group">
                <label for="cvc" class="col-md-3 control-label">Security Code</label>
                <div class="col-md-6">
                    <input type="text" class="form-control" name="cvc" data-stripe="cvc" v-model="updateCardForm.cvc">
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-3 control-label">Expiration</label>
                <div class="col-md-3">
                    <input type="text" class="form-control" name="month" placeholder="MM" maxlength="2" data-stripe="exp-month" v-model="updateCardForm.month">
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" name="year" placeholder="YYYY" maxlength="4" data-stripe="exp-year" v-model="updateCardForm.year">
                </div>
            </div>

            <div class="form-group">
                <label for="zip" class="col-md-3 control-label">ZIP / Postal Code</label>
                <div class="col-md-6">
                    <input type="text" class="form-control" name="zip" v-model="updateCardForm.zip">
                </div>
            </div>

            <div class="form-group">
                <div class="col-md-6 col-md-offset-3">
                    <button type="submit" class="btn btn-primary" @click.prevent="updateCard" :disabled="updateCardForm.updating">
                        <span v-if="updateCardForm.updating">
                            <i class="fa fa-btn fa-spinner fa-spin"></i> Updating
                        </span>

                        <span v-else>
                            <i class="fa fa-btn fa-credit-card"></i> Update
                        </span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
