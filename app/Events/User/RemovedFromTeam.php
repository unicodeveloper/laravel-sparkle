<?php

namespace Laravel\Spark\Events\User;

use Illuminate\Contracts\Auth\Access\Authorizable;
use Illuminate\Queue\SerializesModels;
use Laravel\Spark\Teams\Team;

class RemovedFromTeam
{
    use SerializesModels;

    public $user;

    public $team;

    /**
     * Create a new event instance.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Authorizable  $user
     * @return void
     */
    public function __construct(Authorizable $user, Team $team)
    {
        $this->user = $user;
        $this->team = $team;
    }
}
