<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');

Route::post('/login','LoginController@login');

Route::get('/get_all_users', ['middleware'=>'auth','uses'=>'AdminController@get_all_users']);

Route::get('/logout',['middleware'=>'auth','uses'=>'LoginController@logout']);

Route::post('/change_pass', ['middleware'=>'auth','uses'=>'LoginController@change_pass']);

Route::post('/get_rpt', ['middleware'=>'auth','uses'=>'AdminController@get_rpt']);

Route::get('/get_file_rpt', ['middleware'=>'auth','uses'=>'AdminController@get_file_rpt']);

Route::get('/get_user_rpt', ['middleware'=>'auth','uses'=>'AdminController@get_user_rpt']);

Route::get('/get_eff_rpt', ['middleware'=>'auth','uses'=>'AdminController@get_eff_rpt']);

Route::get('/get_user_files', ['middleware'=>'auth','uses'=>'AdminController@get_user_files']);

Route::post('/change_file', ['middleware'=>'auth','uses'=>'AdminController@change_file']);

Route::get('/get_frn_rpt', ['middleware'=>'auth','uses'=>'AdminController@get_frn_rpt']);

Route::get('/get_secno_rpt', ['middleware'=>'auth','uses'=>'AdminController@get_secno_rpt']);

Route::get('/get_frn_details', ['middleware'=>'auth','uses'=>'AdminController@get_frn_details']);

Route::get('/get_sections', ['middleware'=>'auth','uses'=>'AdminController@get_sections']);

Route::get('/get_deptlist', ['middleware'=>'auth','uses'=>'TappalController@get_deptlist']);

Route::post('/create_dept', ['middleware'=>'auth','uses'=>'AdminController@create_dept']);

Route::get('/get_tappal_files', ['middleware'=>'auth','uses'=>'TappalController@get_tappal_files']);

Route::get('/get_peshi_files', ['middleware'=>'auth','uses'=>'PeshiController@get_peshi_files']);

Route::get('/get_speshi_files', ['middleware'=>'auth','uses'=>'SpeshiController@get_speshi_files']);

Route::get('/get_aso_files', ['middleware'=>'auth','uses'=>'AsoController@get_aso_files']);

Route::get('/get_so_files', ['middleware'=>'auth','uses'=>'SoController@get_so_files']);

Route::get('/get_officer_files', ['middleware'=>'auth','uses'=>'OfficerController@get_officer_files']);

Route::get('/get_sec_files', ['middleware'=>'auth','uses'=>'SecController@get_sec_files']);

Route::get('/get_special_sec_files', ['middleware'=>'auth','uses'=>'SpecialsecController@get_special_sec_files']);

Route::post('/generate_frn', ['middleware'=>'auth','uses'=>'TappalController@generate_frn']);

Route::post('/peshi_generate_frn', ['middleware'=>'auth','uses'=>'PeshiController@peshi_generate_frn']);

Route::post('/speshi_generate_frn', ['middleware'=>'auth','uses'=>'SpeshiController@speshi_generate_frn']);

Route::get('/get_admin_users', ['middleware'=>'auth','uses'=>'AdminController@get_admin_users']);

Route::get('/get_peshi_users', ['middleware'=>'auth','uses'=>'PeshiController@get_peshi_users']);

Route::get('/get_speshi_users', ['middleware'=>'auth','uses'=>'SpeshiController@get_speshi_users']);

Route::get('/get_tappal_users', ['middleware'=>'auth','uses'=>'TappalController@get_tappal_users']);

Route::get('/get_aso_users', ['middleware'=>'auth','uses'=>'AsoController@get_aso_users']);

Route::get('/get_so_users', ['middleware'=>'auth','uses'=>'SoController@get_so_users']);

Route::get('/get_officer_users', ['middleware'=>'auth','uses'=>'OfficerController@get_officer_users']);

Route::get('/get_sec_users', ['middleware'=>'auth','uses'=>'SecController@get_sec_users']);

Route::get('/get_special_sec_users', ['middleware'=>'auth','uses'=>'SpecialsecController@get_special_sec_users']);

Route::get('/get_roles', ['middleware'=>'auth','uses'=>'AdminController@get_roles']);

Route::get('/user_data', ['middleware'=>'auth','uses'=>'LoginController@user_data']);

Route::post('/create_section', ['middleware'=>'auth','uses'=>'AdminController@create_section']);

Route::post('/aso_close_file', ['middleware'=>'auth','uses'=>'AsoController@aso_close_file']);

Route::post('/peshi_close_file', ['middleware'=>'auth','uses'=>'PeshiController@peshi_close_file']);

Route::post('/speshi_close_file', ['middleware'=>'auth','uses'=>'SpeshiController@speshi_close_file']);

Route::post('/aso_frwd_file', ['middleware'=>'auth','uses'=>'AsoController@aso_frwd_file']);

Route::post('/tappal_frwd_file', ['middleware'=>'auth','uses'=>'TappalController@tappal_frwd_file']);

Route::post('/peshi_frwd_file', ['middleware'=>'auth','uses'=>'PeshiController@peshi_frwd_file']);

Route::post('/speshi_frwd_file', ['middleware'=>'auth','uses'=>'SpeshiController@speshi_frwd_file']);

Route::post('/so_frwd_file', ['middleware'=>'auth','uses'=>'SoController@so_frwd_file']);

Route::post('/officer_frwd_file', ['middleware'=>'auth','uses'=>'OfficerController@officer_frwd_file']);

Route::post('/sec_frwd_file', ['middleware'=>'auth','uses'=>'SecController@sec_frwd_file']);

Route::post('/special_sec_frwd_file', ['middleware'=>'auth','uses'=>'SpecialsecController@special_sec_frwd_file']);

Route::post('/create_user', ['middleware'=>'auth','uses'=>'AdminController@create_user']);

Route::post('/edit_user', ['middleware'=>'auth','uses'=>'AdminController@edit_user']);

Route::post('/reset_pass', ['middleware'=>'auth','uses'=>'AdminController@reset_pass']);

Route::post('/get_file_data', ['middleware'=>'auth','uses'=>'AdminController@get_file_data']);


