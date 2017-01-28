<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEditTransTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('edit_trans', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamps();
			$table->integer('trans_id')->unsigned();
			$table->integer('ntrans_id')->unsigned();
			$table->integer('old_user')->unsigned();
			$table->integer('new_user')->unsigned();
			$table->integer('changed_by')->unsigned();
			$table->timestamp('changed_on');
			$table->text('remarks');
			$table->foreign('trans_id')->references('id')->on('transactions');
			$table->foreign('ntrans_id')->references('id')->on('transactions');
			$table->foreign('old_user')->references('id')->on('users');
			$table->foreign('new_user')->references('id')->on('users');
			$table->foreign('changed_by')->references('id')->on('users');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('edit_trans');
	}

}
