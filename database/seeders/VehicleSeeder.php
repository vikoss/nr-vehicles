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
                'inventory_number'  => $vehicle[0],
                'name'              => $vehicle[1],
                'brand'             => $vehicle[2],
                'model'             => $vehicle[3],
                'economic_number'   => $vehicle[4],
                'serial_number'     => $vehicle[5],
                'responsible_area'  => $vehicle[6],
            ]);
        });
    }
}
