<?php
	$db1= pg_connect("host=localhost dbname=fms user=postgres password=noobtard123") or die('Could not connect:'.pg_last_error());
	$q=pg_query("SELECT * FROM users WHERE user_role!=1 ORDER BY user_role,section_id");
	$users=array();
	function secondsToTime($seconds) {
		if($seconds)
		{
			$dtF = new DateTime("@0");
			$dtT = new DateTime("@$seconds");
			$diff=$dtF->diff($dtT);
			return array($diff->days,$diff->h,$diff->i,$diff->s);
		}
		else
		{
			return 0;
		}
	}
	while($r=pg_fetch_array($q,null,PGSQL_ASSOC))
	{
		$userid=$r['id'];
		$sectionid=$r['section_id'];
		$q1=pg_fetch_array(pg_query("SELECT MIN(secs) FROM (SELECT ((DATE_PART('day', forwarded_on::timestamp - received_on::timestamp) * 24 + DATE_PART('hour', forwarded_on::timestamp - received_on::timestamp)) * 60 + DATE_PART('minute', forwarded_on::timestamp - received_on::timestamp)) * 60 + DATE_PART('second', forwarded_on::timestamp - received_on::timestamp) AS secs FROM transactions WHERE user_id=$userid AND forwarded_on IS NOT NULL) AS a"),null,PGSQL_ASSOC);
		$q2=pg_fetch_array(pg_query("SELECT MAX(secs) FROM (SELECT ((DATE_PART('day', forwarded_on::timestamp - received_on::timestamp) * 24 + DATE_PART('hour', forwarded_on::timestamp - received_on::timestamp)) * 60 + DATE_PART('minute', forwarded_on::timestamp - received_on::timestamp)) * 60 + DATE_PART('second', forwarded_on::timestamp - received_on::timestamp) AS secs FROM transactions WHERE user_id=$userid AND forwarded_on IS NOT NULL) AS a"),null,PGSQL_ASSOC);
		$q3=pg_fetch_array(pg_query("SELECT SUM(secs) FROM (SELECT ((DATE_PART('day', forwarded_on::timestamp - received_on::timestamp) * 24 + DATE_PART('hour', forwarded_on::timestamp - received_on::timestamp)) * 60 + DATE_PART('minute', forwarded_on::timestamp - received_on::timestamp)) * 60 + DATE_PART('second', forwarded_on::timestamp - received_on::timestamp) AS secs FROM transactions WHERE user_id=$userid AND forwarded_on IS NOT NULL) AS a"),null,PGSQL_ASSOC);
		$q4=pg_fetch_array(pg_query("SELECT COUNT(*) FROM transactions WHERE user_id=$userid AND forwarded_on IS NOT NULL"),null,PGSQL_ASSOC);
		$q5=pg_fetch_array(pg_query("SELECT COUNT(*) FROM transactions WHERE user_id=$userid AND status=0"),null,PGSQL_ASSOC);
		$q6=pg_fetch_array(pg_query("SELECT COUNT(*) FROM transactions WHERE user_id=$userid"),null,PGSQL_ASSOC);
		$q7=pg_fetch_array(pg_query("SELECT * FROM sections WHERE id=$sectionid"),null,PGSQL_ASSOC);
		if($q4['count']==0)
		{
			array_push($users,array('id'=>$r['id'],
				'user_desc'=>$r['user_desc'],
				'user_role'=>$r['user_role'],
				'section_id'=>$r['section_id'],
				'section_name'=>$q7['section_name'],
				'maxtime'=>secondsToTime($q2['max']),
				'mintime'=>secondsToTime($q1['min']),
				'meantime'=>0,
				'totalcount'=>$q6['count'],
				'frwdcount'=>$q4['count'],
				'pendingcount'=>$q5['count']
				));
		}
		else
		{
			array_push($users,array('id'=>$r['id'],
				'user_desc'=>$r['user_desc'],
				'user_role'=>$r['user_role'],
				'section_id'=>$r['section_id'],
				'section_name'=>$q7['section_name'],
				'maxtime'=>secondsToTime($q2['max']),
				'mintime'=>secondsToTime($q1['min']),
				'meantime'=>secondsToTime(round($q3['sum']/$q4['count'])),
				'totalcount'=>$q6['count'],
				'frwdcount'=>$q4['count'],
				'pendingcount'=>$q5['count']
				));
		}
	}
	echo json_encode($users);
?>
