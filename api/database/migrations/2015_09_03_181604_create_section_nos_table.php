<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSectionNosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('section_nos', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamps();
			$table->integer('section_id')->unsigned();
			$table->integer('file_id')->unsigned();
			$table->string('section_no',100);
			$table->integer('created_by')->unsigned();
			$table->timestamp('generated_on');
			$table->foreign('section_id')->references('id')->on('sections');
			$table->foreign('file_id')->references('id')->on('files');
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
		Schema::drop('section_nos');
	}

}
