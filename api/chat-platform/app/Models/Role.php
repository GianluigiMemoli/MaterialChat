<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'role';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    public function users(){
        return $this->hasMany('App\Models\User');
    }


}
