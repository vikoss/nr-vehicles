<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        return Vehicle::where('economic_number', 'like', "%{$request->get('economic_number')}%")->paginate();
    }

    public function show(Vehicle $vehicle)
    {
        return $vehicle->load('direction');
    }

    public function update(Vehicle $vehicle, Request $request)
    {
        return $vehicle->update($request->all());
    }
}
