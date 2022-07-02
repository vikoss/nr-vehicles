<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class DocumentType extends Model
{
    use HasFactory;

    public function getCreatedAtAttribute($date)
    {
        return (bool) $date ? Carbon::createFromDate($date)->format('Y-m-d H:i') : null;
    }

    public function getUpdatedAtAttribute($date)
    {
        return (bool) $date ? Carbon::createFromDate($date)->format('Y-m-d H:i') : null;
    }
}
