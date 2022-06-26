<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UtilController extends Controller
{
    public function uploadFile(Request $request)
    {
        $publicUrl = Storage::url(
            Storage::put($request->get('path'), $request->file('file'))
        );

        return compact('publicUrl');
    }
}
