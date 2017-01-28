<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model {

	public function transstatus(){
		return $this->belongsTo('App\TransStatus','user_role','user_role');
	}

	public function sectiondata(){
		return $this->belongsTo('App\Section','section_id','id');
	}

}
