<?php


namespace App\Http\Controllers;


use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AdminRegistrationController extends Controller
{
    public function register(Request $request){
        if(Gate::allows('create-admin')) {
            $this->validate($request, [
                'username' => 'required|min:5|max:30|unique:user',
                'password' => 'required|string|max:64|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/',
                'email' => 'required|email|unique:user'
            ]);
            $adminParameters = $request->toArray();
            $adminParameters['id'] = Str::uuid();
            $adminParameters['passwordHash'] = Hash::make($request->password);
            $adminParameters['ip'] = $request->ip();
            $adminParameters['role_id'] = Role::select('id')->where('name', '=', 'Admin')->first()->id;
            $admin = User::Create($adminParameters);
            $token = auth()->login($admin);
            $admin->setJWTToken($token);
            return response()->json($admin);
        } else {
            return response()->json([], 401);
        }
    }

    public function login(Request $request){
        error_log($request->input('username'));
        $this->validate($request, [
            'username' => 'required|min:5|max:30',
            'password' => 'required|string|max:64|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/'
            ]);
        $username = $request->username;
        $adminRecord = User::where('username', '=', $username)->first();
        if($adminRecord == null || !Hash::check($request->password,$adminRecord->passwordHash)) {
            return response()->json(['error' => 'Login failed'], 401);
        }
        $token = auth()->setTTL(120)->login($adminRecord);
        $adminRecord->setJWTToken($token);
        return response()->json($token);
    }

    public function getCurrentAdmin(Request $request){
        $admin = auth()->user()->setHidden(['passwordHash']);
        return response()->json($admin);
    }

    public function getAllAdmins(Request $request){
        if(Gate::allows('is-admin')){

            $adminRoleId = Role::select('id')->where('name', '=', 'Admin')->first()->id;
            $admins = User::where('role_id', '=', $adminRoleId)->get();
            return response()->json($admins);
        } else {
            return response()->json([], 401);
        }
    }
}
