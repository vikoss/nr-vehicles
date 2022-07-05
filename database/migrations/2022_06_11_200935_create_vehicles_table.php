<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('inventory_number')->nullable();
            $table->string('name')->nullable();
            $table->string('brand')->nullable();
            $table->string('model')->nullable();
            $table->string('economic_number')->nullable();
            $table->string('serial_number')->nullable();
            $table->foreignId('direction_id')->nullable()->constrained('directions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vehicles');
    }
};
