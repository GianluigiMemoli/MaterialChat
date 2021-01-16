<?php

use Illuminate\Support\Facades\Broadcast;
use Tymon\JWTAuth\JWTAuth;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});



Broadcast::channel('chatroom', function (){
    error_log('non funziono :C');

    return true;
});

Broadcast::channel('newMessageOn.{chatroom_id}', function ($user, $chatroom_id){
    error_log('ci provo');
    $chatroom = \App\Models\ChatRoom::findOrFail($chatroom_id);
    error_log($chatroom);
    if (!$chatroom->private){
        error_log('do true');
        return true;
    } else {
        $partecipant = \App\Models\ChatPartecipant::where('partecipant_id', '=', $user->id, 'and')->where('chatroom_id', '=', $chatroom_id)->first();
        return $partecipant != null;
    }
});
/*Broadcast::channel('chat.{id}', function (){
    return true;
});
*/
