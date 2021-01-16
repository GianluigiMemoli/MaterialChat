<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'text',
        'attachment',
        'chatroom_id',
        'sender_username'
    ];
    protected $table = 'message';

}
