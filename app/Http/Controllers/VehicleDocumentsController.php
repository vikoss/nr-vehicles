<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleDocumentsController extends Controller
{
    public function store(Vehicle $vehicle, Request $request)
    {
        return $vehicle->documents()->create($request->all());
    }

    public function index(Vehicle $vehicle, Request $request)
    {
        return $vehicle->documents()->paginate();
    }
}
