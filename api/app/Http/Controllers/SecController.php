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
use App\SectionNo;
use Carbon\Carbon;

class SecController extends Controller {

	public function get_sec_files(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$usermain=User::where('id','=',$session->user_id)->first();
		$secid=$usermain->section_id;
		$files=Transaction::where('user_id','=',$session->user_id)->where('status','=',0)->with('receivedata')->with('olddata')->with('filedata.deptdata')->with(array('filedata.sectiondata'=>function($q) use ($secid){
			$q->where('section_id','=',$secid);
		}))->get();
		return $files;
	}

	public function get_sec_users(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		return User::where('user_role','=','6')->select('id','user_role','user_desc')->get();
	}

	public function sec_frwd_file(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$usermain=User::where('id','=',$session->user_id)->first();
		$secid=$usermain->section_id;
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
		$csecno=SectionNo::where('section_id','=',$usermain->section_id)->where('file_id','=',$trans->file_id)->count();
		if($csecno==0)
		{
			$sectionno=new SectionNo;
			$sectionno->section_id=$usermain->section_id;
			$sectionno->file_id=$trans->file_id;
			$sectionno->section_no=Request::input('section_no');
			$sectionno->created_by=$usermain->id;
			$sectionno->generated_on=$date;
			$sectionno->save();
		}
		$files=Transaction::where('user_id','=',$session->user_id)->where('status','=',0)->with('receivedata')->with('olddata')->with('filedata.deptdata')->with(array('filedata.sectiondata'=>function($q) use ($secid){
			$q->where('section_id','=',$secid);
		}))->get();
		return $files;
	}
}
