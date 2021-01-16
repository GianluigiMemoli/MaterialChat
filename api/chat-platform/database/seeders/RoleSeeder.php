<?php

namespace Database\Seeders;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('role')->insert(
            [
                "id" => Str::uuid(),
                "name" => "Admin"
            ]
        );

        DB::table('role')->insert(
            [
                "id" => Str::uuid(),
                "name" => "Participant"
            ]
        );
    }
}
