<?php

namespace Database\Seeders;

use App\Models\Departament;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\DataToMigrate;

class DepartamentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect(DataToMigrate::departaments())->each(function($departament) {
            Departament::create([
                'name'          => $departament['name'],
                'direction_id'  => $departament['direction_id'],
            ]);
        });
    }
}
