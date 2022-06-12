<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    /**
     * Get the documents for the vehicle.
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
