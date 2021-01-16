<?php


namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Role;
use Illuminate\Support\Str;

class AnonymousLogin extends Controller
{
    public function login(Request $request){
        $this->validate($request, [
            'username' => 'required|max:10|unique:user'
        ]);
        $userParams = $request->toArray();
        $userParams['ip'] = $request->ip();
        $userParams['id'] = Str::uuid();
        $userParams['role_id'] = Role::where('name', '=', 'Participant')->first()->id;
        $user = User::create(
            $userParams
        );
        $token = $userParams['token'] = auth()->login($user);
        $user->setJWTToken($token);
        return response()->json($user);
    }

    public function me(){
        return auth()->user();
    }
}
