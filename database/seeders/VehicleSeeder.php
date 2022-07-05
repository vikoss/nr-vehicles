<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect(DataToMigrate::vehicles())->each(function($vehicle) {
            Vehicle::create([
                'inventory_number'  => $vehicle['inventory_number'],
                'name'              => $vehicle['name'],
                'brand'             => $vehicle['brand'],
                'model'             => $vehicle['model'],
                'economic_number'   => $vehicle['economic_number'],
                'serial_number'     => $vehicle['serial_number'],
                'direction_id'      => $vehicle['direction_id'],
            ]);
        });
    }
}
