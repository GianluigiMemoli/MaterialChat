<?php


namespace App\Http\Controllers;




use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    public function getCurrentUserRole(Request $request){
        $user = Auth::user();
        if($user != null) {
            return response()->json($user->getRole(), 200);
        } else {
            return response()->json([], 401);
        }
    }
}
