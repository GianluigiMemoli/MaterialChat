<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class ChatPartecipant extends Model
{
    protected $fillable = [
        'chatroom_id',
        'partecipant_id'
    ];
    protected $table = 'privateChatroomPartecipant';
}
