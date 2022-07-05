<?php

namespace Database\Seeders;

use App\Models\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect(DataToMigrate::employees())->each(function($employee) {
            Employee::create([
                'employee_number'   => $employee['employee_number'],
                'name'              => $employee['name'],
                'first_surname'     => $employee['first_surname'],
                'second_surname'    => $employee['second_surname'],
                'position_id'       => $employee['position_id'],
            ]);
        });
    }
}
