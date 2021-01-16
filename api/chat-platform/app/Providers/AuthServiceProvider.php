<?php

namespace App\Providers;

use App\Models\ChatPartecipant;
use App\Models\ChatRoom;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Boot the authentication services for the application.
     *
     * @return void
     */
    public function boot()
    {
        // Here you may define how you wish users to be authenticated for your Lumen
        // application. The callback which receives the incoming request instance
        // should return either a User instance or null. You're free to obtain
        // the User instance via an API token or any other method necessary.

        Gate::define('create-admin', function ($user){
            error_log('vvv');
            error_log($user->getRole());
            return ($user->getRole()->name == 'Admin');

        });
        Gate::define('is-admin', function ($user){
            return ($user->getRole()->name == 'Admin');
        });
        Gate::define('is-partecipant', function ($user, $chatroomId){
            error_log('searcorfail');
            $chatroom = ChatRoom::findOrFail($chatroomId);
            if(!$chatroom->private) {
                return true;
            } else {
                $partecipant = ChatPartecipant::where('partecipant_id', '=', $user->id, 'and')->where('chatroom_id', '=', $chatroomId)->first();
                return $partecipant != null;            }
        });
        Gate::define('admin-message', function ($user){
            return ($user != null);
        });

        $this->app['auth']->viaRequest('', function ($request) {
            if ($request->input('token')) {
                return User::where('token', $request->input('token'))->first();
            }
        });
    }
}
