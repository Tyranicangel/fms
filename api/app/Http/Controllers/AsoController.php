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

class AsoController extends Controller {

	public function get_aso_files(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$usermain=User::where('id','=',$session->user_id)->first();
		$secid=$usermain->section_id;
		$files=Transaction::where('user_id','=',$session->user_id)->where('status','=',0)->with('receivedata')->with('olddata')->with('filedata.deptdata')->with(array('filedata.sectiondata'=>function($q) use ($secid){
			$q->where('section_id','=',$secid);
		}))->get();
		return $files;
	}

	public function get_aso_users(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		return User::where('id','!=',$session->user_id)->where('user_role','!=','2')->where('user_role','!=','1')->where('user_role','!=','7')->where('user_role','!=','9')->select('id','user_role','user_desc')->get();
	}

	public function aso_close_file(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$usermain=User::where('id','=',$session->user_id)->first();
		$date=Carbon::now();
		$tid=Request::input('tid');
		$trans=Transaction::where('id','=',$tid)->first();
		$trans->forwarded_on=$date;
		$trans->forwarded_to=0;
		$trans->forwarded_id=0;
		$trans->status=3;
		$trans->remarks=Request::input('remarks');
		$trans->save();
		$file=File::where('id','=',$trans->file_id)->first();
		$file->status=10;
		$file->last_changed=$date;
		$file->subject=Request::input('subject');
		$file->save();
		$secid=$usermain->section_id;
		$files=Transaction::where('user_id','=',$session->user_id)->where('status','=',0)->with('receivedata')->with('olddata')->with('filedata.deptdata')->with(array('filedata.sectiondata'=>function($q) use ($secid){
			$q->where('section_id','=',$secid);
		}))->get();
		return $files;
	}

	public function aso_frwd_file(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$usermain=User::where('id','=',$session->user_id)->first();
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
		$file->subject=Request::input('subject');
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
		$secid=$usermain->section_id;
		$files=Transaction::where('user_id','=',$session->user_id)->where('status','=',0)->with('receivedata')->with('olddata')->with('filedata.deptdata')->with(array('filedata.sectiondata'=>function($q) use ($secid){
			$q->where('section_id','=',$secid);
		}))->get();
		return $files;
	}
}
