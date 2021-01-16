<?php


namespace App\Http\Controllers;
use App\Events\ChatroomCreated;
use App\Events\NewPublicChatroomMessage;
use App\Models\Admin;
use App\Models\Attachment;
use App\Models\ChatPartecipant;
use App\Models\ChatRoom;
use App\Models\Message;
use App\Models\User;
use GrahamCampbell\Flysystem\Facades\Flysystem;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Session\Store;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Gate;
use PhpParser\Node\Expr\Array_;
use function PHPUnit\Framework\directoryExists;

class ChatroomController extends Controller
{

    public function createChatroom(Request $request){
        if(Gate::allows('is-admin')) {
            $this->validate($request, [
                'name' => 'required|max:50|min:5|unique:ChatRoom',
                'private' => 'required'
            ]);

            do {
                $shareble_link = Str::random(8);
            } while (Chatroom::where('shareble_link', '=', $shareble_link)->first() != null);
            $chatroomProperties = $request->toArray();
            $chatroomProperties['shareble_link'] = $shareble_link;
            $chatroomProperties['creator'] = Auth::user()->getKey();
            $chatroom = ChatRoom::Create($chatroomProperties);
            $chatroom->private = $chatroom->private == '1';
            broadcast(new ChatroomCreated($chatroom));
            return response()->json($chatroom);
        } else {
            return response()->json([], 401);
        }

    }

    public function getChatroomByLink(Request $request){
        $this->validate($request, [
            'shareble_link' => 'required|min:8|max:8'
        ]);
        $chatroom = ChatRoom::where('shareble_link', '=', $request->shareble_link)->firstOrFail();
        return response()->json($chatroom);
    }


    public function sendMessage(Request $request){
        $sender = Auth::user();

        $chatroomId = $request->input('chatroom_id');
        $chatroom = ChatRoom::findOrFail($chatroomId);
        if(Gate::allows('is-partecipant', $chatroomId) || !$chatroom->private){
            $messageProps = $request->toArray();
            unset($messageProps['attachment']);
            $messageProps['sender_username'] = $sender->username;
            $msg = Message::create($messageProps);
            if($request->hasFile('attachment')){
                error_log('hasAttach');
                $attachment = $this->saveAttachment($msg, $request->file('attachment'));
                $msg->attachment = $attachment->id;
                $msg->save();
                $msg->attachment = $attachment;
                broadcast(new NewPublicChatroomMessage($msg))->toOthers();
            } else {
                broadcast(new NewPublicChatroomMessage($msg))->toOthers();
            }
            return response()->json($msg != null, 200);
        } else {
            return response()->json(['Fail' => 'Unhautenticated'], 401);
        }
    }

    private function saveAttachment(Message $msg, UploadedFile $attachment){
        $savingPath = "chatrooms/$msg->chatroom_id/attachments";
        $type = $attachment->getMimeType();
        $name = $attachment->getClientOriginalName();
        $id = Str::uuid();
        error_log('creo -1 ');
        if(!file_exists($savingPath)){
            error_log('creo');
            mkdir($savingPath, 0664, true);
        } else {
            error_log('wtf');
        }
        error_log('salvo quasi');
        $attachment->storeAs($savingPath, $id);
        error_log('salvato');
        error_log(Storage::url("$savingPath/$id"));
        $attachment = Attachment::create(['name' => $name, 'id' => $id, "type" => $type]);
        return $attachment;
    }

    public function getChatroomMessages(Request $request){
        $chatroom_id = $request->chatroom_id;
        $chatroom = ChatRoom::where('id', '=', $chatroom_id)->first();

        if(Gate::allows('is-partecipant', $chatroom_id) || !$chatroom->private) {
            return $chatroom->messages()->each(function ($message){
                if($message->attachment != null){
                    $message->attachment = Attachment::find($message->attachment);
                }
            });
        } else {
            return response()->json(['error' => 'Unhautenticated'], 401);
        }
    }


    public function getAllChatrooms(Request $request){
        $chatrooms = ChatRoom::where('private', '=', '0')->get();
        error_log($chatrooms);
        $admin = \auth()->user();

        if($admin) {
            $id = $admin->id;
            $partecipatedChatroom = ChatPartecipant::where('partecipant_id', '=', $id)->get();
            foreach ($partecipatedChatroom as $room){
                $chatrooms[] = ChatRoom::find($room->chatroom_id);
            }
        }
        if(count($chatrooms) > 0) {
            return response()->json(
                $chatrooms
            );
        } return response()->json([], 404);
    }

    public function addPartecipantToPrivateChatroom(Request $request){
        $this->validate($request, [
            'chatroom_id' => 'required',
            'partecipant_id'=> 'required'
        ]);
        $user = \auth()->user();
        $chatroom = ChatRoom::findOrFail($request->chatroom_id);
        if(Gate::allows('is-admin', $chatroom->id) && $chatroom->private) {
            $chatPartecipant = ChatPartecipant::create($request->toArray());
            return response()->json(true);
        } else {
            return response()->json(['error' => "Unauthenticated"], 401);
        }
    }

    public function getChatroomPartecipants(Request $request){
        $this->validate($request, [
            'chatroom_id' => 'required'
        ]);
        $chatroomId = $request->chatroom_id;
        if(ChatRoom::find($chatroomId)->private) {
            $partecipantIds = ChatPartecipant::where('chatroom_id', '=', $chatroomId)->get();
            $partecipants = [];
            foreach ($partecipantIds as $partecipantId) {
                $partecipants[] = User::find($partecipantId)->first()->makeHidden(['token', 'passwordHash']);
            }
            return response()->json($partecipants);
        }
        return response()->json([]);
    }
}

