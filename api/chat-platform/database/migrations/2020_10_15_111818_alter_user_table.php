<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /*Schema::table('user', function (Blueprint $table) {
            $table->dropColumn('token');
        });*/

        //Schema::table('user', function (Blueprint $table) {
          /* $table->dropColumn('token');
           $table->text('token')->nullable(true);*/
        //});
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
