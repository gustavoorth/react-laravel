<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = [
        'model',
        'year',
        'mileage',
        'maker',
        'body_type'
    ];
}
