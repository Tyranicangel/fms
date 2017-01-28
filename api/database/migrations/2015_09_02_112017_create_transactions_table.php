<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('transactions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamps();
			$table->integer('file_id')->unsigned();
			$table->integer('user_id')->unsigned();
			$table->timestamp('received_on');
			$table->integer('received_id')->unsigned();
			$table->integer('received_from')->usigned();
			$table->integer('status')->unsigned();
			$table->text('remarks')->nullable();
			$table->text('reason')->nullable();
			$table->timestamp('forwarded_on')->nullable();
			$table->integer('forwarded_to')->unsigned()->nullable();
			$table->integer('forwarded_id')->unsigned()->nullable();
			$table->foreign('file_id')->references('id')->on('files');
			$table->foreign('user_id')->references('id')->on('users');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('transactions');
	}

}
