<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'description',
        'document_type_id',
        'vehicle_id',
    ];

    /**
     * Get the document type associated with the document.
     */
    public function documentType()
    {
        return $this->belongsTo(DocumentType::class);
    }
}
