<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('files', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamps();
			$table->integer('file_type')->unsigned();
			$table->integer('dept_id')->unsigned();
			$table->string('dept_no',1000);
			$table->date('received_on');
			$table->text('subject');
			$table->integer('created_by')->unsigned();
			$table->integer('status')->unsigned();
			$table->timestamp('last_changed');
			$table->foreign('dept_id')->references('id')->on('depts');
			$table->foreign('created_by')->references('id')->on('users');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('files');
	}

}
