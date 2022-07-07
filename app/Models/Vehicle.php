<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'inventory_number',
        'name',
        'brand',
        'model',
        'economic_number',
        'serial_number',
        'direction_id',
    ];

    /**
     * Get the documents for the vehicle.
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }

    /**
     * Get the direction associated with the vehicle.
     */
    public function direction()
    {
        return $this->belongsTo(Direction::class);
    }
}
