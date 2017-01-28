<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class SectionNo extends Model {

	public function sectiondetails(){
		return $this->belongsTo('App\Section','section_id','id');
	}

}
