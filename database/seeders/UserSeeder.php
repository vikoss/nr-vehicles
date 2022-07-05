<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect(DataToMigrate::users())->each(function($user) {
            User::create([
                'nick_name'     => $user['nick_name'],
                'email'         => $user['email'],
                'password'      => Hash::make($user['password']),
                'employee_id'   => $user['employee_id'],
            ]);
        });
    }
}
