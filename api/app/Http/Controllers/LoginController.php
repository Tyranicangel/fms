<?php namespace App\Http\Controllers;

use Request;
use Response;
use App\User;
use App\Session;
use App\Password;
use Carbon\Carbon;

class LoginController extends Controller {
	public function change_pass(){
		$date=Carbon::now();
		$refreshtoken=Request::header('JWT-AuthToken');
		$session=Session::where('refresh_token','=',$refreshtoken)->where('expiry_time','>',$date)->first();
		$user=User::where('id','=',$session->user_id)->first();
		$pass=Request::all();
		if($user->password=hash("sha256",$user->username.$pass['old'].'fms'))
		{
			$newpass=hash("sha256",$user->username.$pass['new'].'fms');
			$pas=new Password;
			$pas->user_id=$user->id;
			$pas->old_pass=$user->password;
			$pas->new_pass=$newpass;
			$pas->changed_by=$user->id;
			$pas->changed_on=$date;
			$pas->save();
			$user->password=$newpass;
			$user->save();
			return 'Success';
		}
		else
		{
			return 'Please verify your old password';
		}
	}

	public function user_data(){
		$date=Carbon::now();
		$refreshtoken=Request::header('JWT-AuthToken');
		$session=Session::where('refresh_token','=',$refreshtoken)->where('expiry_time','>',$date)->first();
		$user=User::where('id','=',$session->user_id)->select('id','user_desc','user_role')->first();
		return $user;
	}

	public function logout(){
		$date=Carbon::now();
		$tkn=Request::header('JWT-AuthToken');
		$userdata=Session::where('refresh_token','=',$tkn)->first();
		$userdata->expiry_time=$date;
		$userdata->save();
		return 'Logged Out.';
	}

	public function login(){
		$date=Carbon::now();
		$userdata=Request::all();
		$usercount=User::where('username','=',$userdata['username'])->where('password','=',hash("sha256",$userdata['username'].$userdata['password'].'fms'))->count();
		if($usercount==1)
		{
			$user=User::where('username','=',$userdata['username'])->where('password','=',hash("sha256",$userdata['username'].$userdata['password'].'fms'))->first();
			$refreshtoken=hash("sha256",$userdata['username'].microtime().'ipsumlorem');
			$login=new Session;
			$login->user_id=$user->id;
			$login->login_time=$date;
			$login->refresh_token=$refreshtoken;
			$login->expiry_time=Carbon::now()->addHours(3);
			$login->save();
			return array('statusCode'=>'202','message'=>$refreshtoken,'user_role'=>$user->user_role);
		}
		else
		{
			$userdat=User::where('username','=',$userdata['username'])->count();
			if($userdat==1)
			{
				return array('statusCode'=>'401','message'=>'Please enter correct Password.');
			}
			else
			{
				return array('statusCode'=>'401','message'=>'Please enter valid Username.');
			}
		}
	}

}
