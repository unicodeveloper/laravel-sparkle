<?php

namespace Laravel\Spark\Http\Controllers\Settings;

use Exception;
use Illuminate\Contracts\Validation\Validator as ValidatorContract;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Laravel\Spark\Contracts\Repositories\TeamRepository;
use Laravel\Spark\Http\Controllers\Controller;
use Laravel\Spark\Events\User\acceptTeamInvitation;

class InvitationController extends Controller
{
    use ValidatesRequests;

    /**
     * The team repository instance.
     *
     * @var \Laravel\Spark\Contracts\Repositories\TeamRepository
     */
    protected $teams;

    /**
     * Create a new controller instance.
     *
     * @param  \Laravel\Spark\Contracts\Repositories\TeamRepository  $teams
     * @return void
     */
    public function __construct(TeamRepository $teams)
    {
        $this->teams = $teams;

        $this->middleware('auth');
    }

    /**
     * Send an invitation for the given team.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $teamId
     * @return \Illuminate\Http\Response
     */
    public function sendTeamInvitation(Request $request, $teamId)
    {
        $user = $request->user();

        $this->validate($request, [
            'email' => 'required|max:255|email',
        ]);

        $team = $user->teams()
                ->where('owner_id', $user->id)
                ->findOrFail($teamId);

        if ($team->invitations()->where('email', $request->email)->exists()) {
            return response()->json(['email' => 'That user is already invited to the team.'], 422);
        }

        $team->inviteUserByEmail($request->email);

        return $team->fresh(['users', 'invitations']);
    }

    /**
     * Accept the given team invitation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $inviteId
     * @return \Illuminate\Http\Response
     */
    public function acceptTeamInvitation(Request $request, $inviteId)
    {
        $user = $request->user();

        $invitation = $user->invitations()->findOrFail($inviteId);

        $teamId = $invitation->team_id;
        $user->joinTeamById($teamId);

        $invitation->delete();

        $team = $user->teams()->find($teamId);
        event(new acceptTeamInvitation($user, $team));

        return $this->teams->getAllTeamsForUser($user);
    }

    /**
     * Destroy the given team invitation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $teamId
     * @param  string  $inviteId
     * @return \Illuminate\Http\Response
     */
    public function destroyTeamInvitationForOwner(Request $request, $teamId, $inviteId)
    {
        $user = $request->user();

        $team = $user->teams()
                ->where('owner_id', $user->id)
                ->findOrFail($teamId);

        $team->invitations()->where('id', $inviteId)->delete();

        return $this->teams->getTeam($user, $teamId);
    }

    /**
     * Destroy the given team invitation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $inviteId
     * @return \Illuminate\Http\Response
     */
    public function destroyTeamInvitationForUser(Request $request, $inviteId)
    {
        $request->user()->invitations()->findOrFail($inviteId)->delete();
    }
}
