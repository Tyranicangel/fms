<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model {

	public function deptdata() {
		return $this->belongsTo('App\Dept','dept_id','id');
	}

	public function sectiondata() {
		return $this->hasMany('App\SectionNo','file_id','id');
	}

	public function transdata() {
		return $this->hasMany('App\Transaction','file_id','id')->orderBy('id','desc');
	}

	public function generatedby() {
		return $this->belongsTo('App\User','created_by','id');
	}

}
