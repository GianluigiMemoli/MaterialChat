<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class ChatRoom extends Model
{
    protected $fillable = [
        "name",
        "private",
        "shareble_link",
        "creator"
    ];
    protected $primaryKey = 'id';

    protected $table = "chatroom";

    public function messages()
    {
        return $this->hasMany('App\Models\Message', 'chatroom_id', 'id')->get();
    }



}
