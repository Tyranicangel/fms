<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransStatusesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('trans_statuses', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamps();
			$table->integer('user_role')->unsigned();
			$table->integer('status')->unsigned();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('trans_statuses');
	}

}
