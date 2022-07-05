<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            DirectionSeeder::class,
            DepartamentSeeder::class,
            PositionSeeder::class,
            EmployeeSeeder::class,
            UserSeeder::class,
            VehicleSeeder::class,
            DocumentTypeSeeder::class,
        ]);
    }
}
