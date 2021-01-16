<?php


namespace App\Http\Controllers;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function test(Request $request) {
        return Auth::user();
    }

    public function fakeLogin(Request $request){

    }
}
