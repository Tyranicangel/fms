<?php namespace App\Http\Controllers;

use Request;
use Response;
use App\User;
use App\Session;
use App\Password;
use App\Section;
use App\UserRole;
use App\Dept;
use App\File;
use App\Transaction;
use Carbon\Carbon;

class TappalController extends Controller {

	public function get_tappal_users(){
		return User::where('user_role','=','3')->with('sectiondata')->get();
	}

	public function get_tappal_files(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$files=Transaction::where('user_id','=',$session->user_id)->where('status','=',0)->with('receivedata')->with('olddata')->with('filedata.deptdata')->get();
		return $files;
	}

	public function tappal_frwd_file(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$date=Carbon::now();
		$tid=Request::input('tid');
		$fu=Request::input('user_id');
		$trans=Transaction::where('id','=',$tid)->first();
		$nt=new Transaction;
		$nt->file_id=$trans->file_id;
		$nt->user_id=$fu;
		$nt->received_on=$date;
		$nt->received_id=$trans->id;
		$nt->received_from=$trans->user_id;
		$nt->status=0;
		$nt->save();
		$trans->forwarded_on=$date;
		$trans->forwarded_to=$fu;
		$trans->forwarded_id=$nt->id;
		$trans->status=1;
		$trans->remarks=Request::input('remarks');
		$trans->reason=Request::input('reason');
		$trans->save();
		$file=File::where('id','=',$trans->file_id)->first();
		$nfu=User::where('id','=',$fu)->with('transstatus')->first();
		$file->status=$nfu->transstatus->status;
		$file->last_changed=$date;
		$file->save();
		$files=Transaction::where('user_id','=',$session->user_id)->where('status','=',0)->with('receivedata')->with('olddata')->with('filedata.deptdata')->get();
		return $files;
	}

	public function get_deptlist(){
		return Dept::all();
	}

	public function generate_frn(){
		$date=Carbon::now();
		$file=Request::all();
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$nf=new File;
		$nf->dept_id=$file['dept']['id'];
		$nf->dept_no=$file['dept_no'];
		$nf->received_on=$file['dept_date'];
		$nf->subject=$file['subject'];
		$nf->status=0;
		$nf->last_changed=$date;
		$nf->file_type=$file['type'];
		$nf->created_by=$session->user_id;
		$nf->save();
		$nt=new Transaction;
		$nt->file_id=$nf->id;
		$nt->user_id=$session->user_id;
		$nt->received_on=$date;
		$nt->received_id=0;
		$nt->received_from=0;
		$nt->status=0;
		$nt->remarks=$file['remarks'];
		$nt->save();
		return str_pad($nf->id,7,'0',STR_PAD_LEFT);
	}
}
