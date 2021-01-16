<?php


namespace App\Events;


use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ChatroomCreated implements ShouldBroadcast
{
    public $chatroom;

    public function __construct($chatroom)
    {
        $this->chatroom = $chatroom;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('chatroom');
    }
}
