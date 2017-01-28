<?php namespace App\Http\Controllers;

use Request;
use Response;
use App\User;
use App\Session;
use App\Password;
use App\Section;
use App\SectionNo;
use App\UserRole;
use App\File;
use App\Dept;
use App\Transaction;
use App\EditTrans;
use Carbon\Carbon;

class AdminController extends Controller {

	public function reset_pass(){
		$username=Request::input('user');
		$date=Carbon::now();
		$refreshtoken=Request::header('JWT-AuthToken');
		$session=Session::where('refresh_token','=',$refreshtoken)->where('expiry_time','>',$date)->first();
		$user=User::where('username','=',$username)->first();
		if($user)
		{
			$newpass=hash("sha256",$user->username.'123456'.'fms');
			$pas=new Password;
			$pas->user_id=$user->id;
			$pas->old_pass=$user->password;
			$pas->new_pass=$newpass;
			$pas->changed_by=$session->user_id;
			$pas->changed_on=$date;
			$pas->save();
			$user->password=$newpass;
			$user->save();
			return 'Success';
		}
		else
		{
			return 'No such user exists';
		}
	}

	public function change_file(){
		$file=File::where('id','=',Request::input('fileid'))->first();
		$user=User::where('id','=',Request::input('userid'))->with('transstatus')->first();
		$date=Carbon::now();
		$trans=Transaction::where('file_id','=',$file->id)->orderBy('id','desc')->first();
		$nt=new Transaction;
		$nt->file_id=$trans->file_id;
		$nt->user_id=$user->id;
		$nt->received_on=$date;
		$nt->received_id=$trans->id;
		$nt->received_from=$trans->user_id;
		$nt->status=0;
		$nt->save();
		$trans->forwarded_on=$date;
		$trans->forwarded_to=$user->id;
		$trans->forwarded_id=$nt->id;
		$trans->status=1;
		$trans->save();
		$file->status=$user->transstatus->status;
		$file->last_changed=$date;
		$file->save();
		$et=new EditTrans;
		$et->trans_id=$trans->id;
		$et->old_user=$trans->user_id;
		$et->new_user=$nt->user_id;
		$et->changed_by=1;
		$et->changed_on=$date;
		$et->ntrans_id=$nt->id;
		$et->remarks=Request::input('remarks');
		$et->save();
	}

	public function get_admin_users(){
		return User::where('user_role','!=','2')->where('user_role','!=','1')->select('id','user_role','user_desc')->get();
	}

	public function get_eff_rpt(){
		$users=User::where('id','=',5)->orderBy('user_role')->get()->toArray();
		return $users;
	}

	public function get_rpt(){
		$session=Session::where('refresh_token','=',Request::header('JWT-AuthToken'))->first();
		$fromdate=Request::input('fromdate');
		$todate=Request::input('todate').'  23:59:59';
		return Transaction::where('user_id','=',$session->user_id)->where(function($q) use ($fromdate,$todate){
			$q->where(function($query) use ($fromdate,$todate){
				$query->where('received_on','>',$fromdate)->where('received_on','<',$todate);
			})
			->orWhere(function($query) use ($fromdate,$todate){
				$query->where('forwarded_on','>',$fromdate)->where('forwarded_on','<',$todate);
			});
		})->with('filedata.deptdata')->with('receivedata')->with('forwarddata')->orderBy('id','desc')->get();
	}

	public function get_file_rpt(){
		return Transaction::where('status','=',0)->with('filedata.deptdata')->with('receivedata')->with('forwarddata')->orderBy('id')->get();
	}

	public function get_user_files(){
		return Transaction::where('user_id','=',Request::input('userid'))->where('status','=',0)->with('receivedata')->with('olddata')->with('filedata.deptdata')->get();
	}

	public function get_user_rpt(){
		$userlist=User::select('id','user_desc','section_id','user_role')->with('sectiondata')->orderBy('user_role')->get()->toArray();
		for($i=0;$i<count($userlist);$i++)
		{
			$userlist[$i]['pendingtrans']=Transaction::where('user_id','=',$userlist[$i]['id'])->where('status','=',0)->count();
		}
		return $userlist;
	}

	public function get_frn_details(){
		$frn=intval(Request::input('frn'));
		$file=File::where('id','=',$frn)->with('deptdata')->first();
		$trans=Transaction::where('file_id','=',$file->id)->orderBy('id','desc')->with('receivedata')->with('userdata')->first();
		return array($file,$trans);
	}

	public function get_frn_rpt(){
		$frn=intval(Request::input('frn'));
		return File::where('id','=',$frn)->with('deptdata')->with('sectiondata.sectiondetails')->with('transdata.userdata')->with('generatedby')->first();
	}

	public function get_secno_rpt(){
		$secno=Request::input('frn');
		$sec=SectionNo::where('section_no','=',$secno)->first();
		if($sec)
		{

			return File::where('id','=',$sec->file_id)->with('deptdata')->with('sectiondata.sectiondetails')->with('transdata.userdata')->with('generatedby')->first();
		}
	}

	public function get_file_data(){
		$sub='%'.Request::input('subject').'%';
		return File::where('subject','like',$sub)->with('deptdata')->with('sectiondata.sectiondetails')->with('transdata.userdata')->with('transdata.receivedata')->with('generatedby')->get();
	}

	public function get_sections(){
		return Section::all();
	}

	public function get_roles(){
		return UserRole::all();
	}

	public function create_dept(){
		$dept=new Dept;
		$dept->dept_name=Request::input('dept');
		$dept->save();
		return Dept::all();
	}

	public function create_section(){
		$section=Request::input('section');
		$ns=new Section;
		$ns->section_name=$section;
		$ns->save();
		return Section::all();
	}

	public function get_all_users(){
		return User::with('sectiondata')->orderBy('user_role')->get();
	}

	public function edit_user(){
		$muser=Request::all();
		$u=User::where('id','=',$muser['id'])->first();
		$u->user_desc=$muser['user_desc'];
		$u->section_id=$muser['section_id'];
		$u->save();
		return User::with('sectiondata')->orderBy('user_role')->get();
	}

	public function create_user(){
		$user=Request::all();
		$usercheck=User::where('username','=',$user['name'])->count();
		if($usercheck==0)
		{
			$nu=new User;
			$nu->username=$user['name'];
			$nu->password=hash("sha256",$user['name'].'123456fms');
			$nu->user_role=$user['type']['role'];
			$nu->section_id=$user['section']['id'];
			$nu->user_desc=$user['desc'];
			$nu->login_flag=0;
			$nu->save();
			$userdat=User::with('sectiondata')->orderBy('user_role')->get();
			return array('Success','Created user with username:"'.$user['name'].'" and password:"123456"',$userdat);
		}
		else
		{
			return array('Error','User Name already in use.');
		}
	}

}
