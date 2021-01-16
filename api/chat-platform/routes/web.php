<?php
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Broadcasting\BroadcastController;
/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

    $router->get('/', function () use ($router) {
        return $router->app->version();
    });

    $router->group(['prefix' => 'api'], function () use ($router){
        $router->get('login', 'AnonymousLogin@login');
        $router->get('me', 'AnonymousLogin@me');

        $router->group(['prefix' => 'admin'], function () use ($router) {
            $router->post('register', 'AdminRegistrationController@register');
            $router->post('login', 'AdminRegistrationController@login');
            $router->group(['middleware' => ['auth']], function () use ($router){
                $router->get('getCurrentAdmin','AdminRegistrationController@getCurrentAdmin');
                $router->get('createChatroom', 'ChatroomController@createChatroom');
                $router->get('addPartecipant', 'ChatroomController@addPartecipantToPrivateChatroom');
                $router->get('getAllAdmins', 'AdminRegistrationController@getAllAdmins');
            });
        });
        $router->group(['middleware' => ['auth']], function () use ($router){
            $router->post('sendMessage', 'ChatroomController@sendMessage');
            $router->get('getChatroomByLink', 'ChatroomController@getChatroomByLink');
            $router->get('getAllChatrooms', 'ChatroomController@getAllChatrooms');
            $router->get('getChatroomMessages', 'ChatroomController@getChatroomMessages');
            $router->post('broadcasting/auth', 'BroadcastController@authenticate');
            $router->get('currentRole', 'RoleController@getCurrentUserRole');
            $router->get('getChatroomPartecipants', 'ChatroomController@getChatroomPartecipants');
            $router->get('test', 'UserController@test');
        });

    });
