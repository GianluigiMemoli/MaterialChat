<?php

namespace Database\Seeders;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('user')->insert(
            [
                "id" => Str::uuid(),
                "username" => "MasterAdmin",
                'passwordHash' => Hash::make('Admin123@'),
                'ip' => '::1',
                'email' => 'admin@email.com',
                'role_id' => Role::select('id')->where('name', '=', 'Admin')->first()->id
            ]
        );
    }
}
