<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function destroy(Document $document)
    {
        return $document->delete();
    }
}
