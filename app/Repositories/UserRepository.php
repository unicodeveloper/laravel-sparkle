<?php

namespace Laravel\Spark\Repositories;

use DB;
use Carbon\Carbon;
use Laravel\Spark\Spark;
use Illuminate\Http\Request;
use Laravel\Spark\InteractsWithSparkHooks;
use Laravel\Spark\Contracts\Repositories\UserRepository as Contract;

class UserRepository implements Contract
{
    use InteractsWithSparkHooks;

    /**
     * Get the current user of the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCurrentUser()
    {
        $user = Spark::user();

        if (Spark::usingTeams()) {
            $user->currentTeam;
        }

        return $user->withHidden(['last_four', 'extra_billing_info']);
    }

    /**
     * Create a new user of the application based on a registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  bool  $withSubscription
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    public function createUserFromRegistrationRequest(Request $request, $withSubscription = false)
    {
        return DB::transaction(function () use ($request, $withSubscription) {
            $user = $this->createNewUser($request, $withSubscription);

            if ($withSubscription) {
                $this->createSubscriptionOnStripe($request, $user);
            }

            return $user;
        });
    }

    /**
     * Create a new user of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  bool  $withSubscription
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    protected function createNewUser(Request $request, $withSubscription)
    {
        if (Spark::$createUsersWith) {
            return $this->callCustomUpdater(Spark::$createUsersWith, $request, [$withSubscription]);
        } else {
            return $this->createDefaultUser($request);
        }
    }

    /**
     * Create the default user instance for a new registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Auth\Authenticatable
     */
    protected function createDefaultUser(Request $request)
    {
        $model = config('auth.model');

        return (new $model)->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
    }

    /**
     * Create the subscription on Stripe.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @param  \Stripe\Customer|null  $stripeCustomer
     * @return void
     */
    public function createSubscriptionOnStripe(Request $request, $user, $stripeCustomer = null)
    {
        $plan = Spark::plans()->find($request->plan);

        $subscription = $user->subscription($plan->id);

        if ($plan->hasTrial() && $stripeCustomer === null) {
            $subscription->trialFor(Carbon::now()->addDays($plan->trialDays));
        }

        if ($request->coupon) {
            $subscription->withCoupon($request->coupon);
        }

        if (Spark::$createSubscriptionsWith) {
            $this->callCustomUpdater(Spark::$createSubscriptionsWith, $request, [$user, $subscription, $stripeCustomer]);
        } else {
            $this->createDefaultSubscription($request, $user, $subscription, $stripeCustomer);
        }
    }

    /**
     * Create the default stripe subscription for a new registration.
     *
     * @param Request $request
     * @param $user
     * @param $subscription
     * @param  \Stripe\Customer|null  $stripeCustomer
     */
    protected function createDefaultSubscription(Request $request, $user, $subscription, $stripeCustomer = null)
    {
        $subscription->create($request->stripe_token, [
            'email' => $user->email,
        ], $stripeCustomer);
    }
}
