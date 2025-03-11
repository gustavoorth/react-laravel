<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    protected $fillable = [
        'name',
        'year',
        'group',
        'brand',
        'serial_number'
    ];

    
    protected $attributes = [
        'active' => true,
    ];
}
