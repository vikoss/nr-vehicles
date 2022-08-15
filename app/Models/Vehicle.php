<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory, SoftDeletes;

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

    /**
     * Scope a query to filter by inventory number.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return void
     */
    public function scopeFilterByInventoryNumber($query, $inventoryNumber)
    {
        if ($inventoryNumber) {
            return $query->where('inventory_number', 'like', "%{$inventoryNumber}%");
        }

        return $query;
    }
}
