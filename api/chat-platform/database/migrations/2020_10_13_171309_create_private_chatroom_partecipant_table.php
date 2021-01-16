<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrivateChatroomPartecipantTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('privateChatroomPartecipant', function (Blueprint $table) {
            $table->timestamps();
            $table->foreignId('chatroom_id')->references('id')->on('chatroom');
            $table->string('partecipant_id')->references('id')->on('user');
            $table->primary(['chatroom_id', 'partecipant_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('private_chatroom_partecipant');
    }
}
