<?php

namespace Laravel\Spark\Events\User;

use Illuminate\Queue\SerializesModels;

class RemoveFromTeam
{
    use SerializesModels;

    public $user;

    public $team;

    /**
     * Create a new event instance.
     *
     * @param  \Illuminate\Contracts\Auth\Authenticatable  $user
     * @return void
     */
    public function __construct(Authenticatable $user, Team $team)
    {
        $this->user = $user;
        $this->team = $team;
    }
}
