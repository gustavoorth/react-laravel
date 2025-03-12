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

    public function services()
    {
        return $this->hasMany(Service::class);
    }

    public function contacts()
    {
        return $this->belongsToMany(Contact::class);
    }

    public function components()
    {
        return $this->belongsToMany(Component::class);
    }
}

