<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Model;

class Attachment extends Model
{
    protected $fillable = [
        'id',
        'type',
        'name'
    ];
    protected $table = 'attachment';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
}
