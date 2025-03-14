<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Contact extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'category',
    ];

    public function machines(): BelongsToMany
    {
        return $this->belongsToMany(Machine::class);
    }
}