<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'name', 
        'description', 
        'category',
        'start', 
        'end', 
        'expected_time', 
        'machine_id'
    ];

    public function machine()
    {
        return $this->belongsTo(Machine::class);
    }
}
       
