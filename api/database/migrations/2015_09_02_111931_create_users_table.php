<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamps();
			$table->string('username',100)->unique();
			$table->string('email',100)->nullable();
			$table->string('password',100);
			$table->integer('user_role')->unsigned();
			$table->integer('section_id')->unsigned();
			$table->string('user_desc',100);
			$table->string('phone_no',100)->nullable();
			$table->integer('login_flag')->unsigned();
			$table->foreign('section_id')->references('id')->on('sections');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('users');
	}

}
