<?php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use Tymon\JWTAuth\Contracts\JWTSubject;
class User extends Model implements AuthenticatableContract, AuthorizableContract, JWTSubject
{
    use Authenticatable, Authorizable, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'ip',
        'id',
        'passwordHash',
        'email',
        'role_id',
        'token'
    ];

    protected $table = 'user';
    public $incrementing = false;
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getRole(){
        error_log('role');
        return $this->belongsTo('App\Models\Role', 'role_id', 'id')->first();
    }
    public function setJWTToken($token){
        error_log($this->getKey());
        $this->token = $token;
        $this->save();
    }
}
