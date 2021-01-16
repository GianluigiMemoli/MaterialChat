<?php


namespace App\Events;


use App\Models\Message;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewPublicChatroomMessage implements ShouldBroadcast
{
    public $message;
    public function __construct($message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('newMessageOn.'.$this->message->chatroom_id);
    }
}
