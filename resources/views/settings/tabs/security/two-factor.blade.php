@if (Spark::supportsTwoFactorAuth())
	<spark-settings-security-two-factor-screen inline-template>
		<!-- Enable Two-Factor Authentication -->
		<div v-if="user">
			<div class="panel panel-default" v-if=" ! user.using_two_factor_auth">
				<div class="panel-heading">Two-Factor Authentication</div>

				<div class="panel-body">
					<div class="alert alert-info">
						To use two factor authentication, you <strong>must</strong> install the
						<a href="https://authy.com" target="_blank">Authy</a> application on your phone.
					</div>

            		<spark-error-alert :form="twoFactorForm"></spark-error-alert>

					<form class="form-horizontal" role="form">
		                <spark-text :display="'Country Code'"
		                            :form="twoFactorForm"
		                            :name="'country_code'"
		                            :input.sync="twoFactorForm.country_code">
		                </spark-text>

		                <spark-text :display="'Phone Number'"
		                            :form="twoFactorForm"
		                            :name="'phone_number'"
		                            :input.sync="twoFactorForm.phone_number">
		                </spark-text>

						<div class="form-group">
							<div class="col-md-6 col-md-offset-3">
								<button type="submit" class="btn btn-primary" @click.prevent="enableTwoFactorAuth" :disabled="twoFactorForm.busy">
									<span v-if="twoFactorForm.busy">
										<i class="fa fa-btn fa-spinner fa-spin"></i> Enabling
									</span>

									<span v-else>
										<i class="fa fa-btn fa-phone"></i> Enable
									</span>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>

			<!-- Disable Two-Factor Authentication -->
			<div class="panel panel-default" v-if="user.using_two_factor_auth">
				<div class="panel-heading">Two-Factor Authentication</div>

				<div class="panel-body">
					<div class="alert alert-info">
						To use two factor authentication, you <strong>must</strong> install the
						<a href="https://authy.com" target="_blank">Authy</a> application on your phone.
					</div>

					<div class="alert alert-success" v-if="twoFactorForm.enabled">
						<strong>Nice!</strong> Two-factor authentication is enabled for your account.
					</div>

					<form role="form">
						<button type="submit" class="btn btn-danger" @click.prevent="disableTwoFactorAuth" :disabled="disableTwoFactorForm.busy">
							<span v-if="disableTwoFactorForm.busy">
								<i class="fa fa-btn fa-spinner fa-spin"></i> Disabling
							</span>

							<span v-else>
								<i class="fa fa-btn fa-times"></i> Disable
							</span>
						</button>
					</form>
				</div>
			</div>
		</div>
	</spark-settings-security-two-factor-screen>
@endif
