<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect(DataToMigrate::positions())->each(function($position) {
            Position::create([
                'name'              => $position['name'],
                'departament_id'    => $position['departament_id'],
            ]);
        });
    }
}
