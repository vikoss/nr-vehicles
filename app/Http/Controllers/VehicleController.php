<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;

class VehicleController extends Controller
{
    public function index(Request $request)
    {
        return Vehicle::filterByInventoryNumber($request->get('inventory_number'))
            ->orderBy('inventory_number')
            ->paginate();
    }

    public function show(Vehicle $vehicle)
    {
        return $vehicle->load('direction');
    }

    public function update(Vehicle $vehicle, Request $request)
    {
        return $vehicle->update($request->all());
    }

    public function store(Request $request)
    {
        return Vehicle::create($request->all());
    }
}
