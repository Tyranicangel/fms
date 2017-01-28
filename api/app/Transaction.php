<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model {

	public function filedata() {
		return $this->belongsTo('App\File','file_id','id');
	}

	public function receivedata(){
		return $this->belongsTo('App\User','received_from','id');
	}

	public function forwarddata(){
		return $this->belongsTo('App\User','forwarded_to','id');
	}

	public function userdata(){
		return $this->belongsTo('App\User','user_id','id');
	}

	public function olddata(){
		return $this->belongsTo('App\Transaction','received_id','id');
	}

}
