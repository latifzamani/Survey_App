<?php

use App\Http\Controllers\Authcontroller;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\NeighbourController;
use App\Http\Controllers\surveyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/signup',[Authcontroller::class,'signup']);
Route::post('/login',[Authcontroller::class,'login']);
Route::get('/survey/getBySlug/{survey:slug}',[surveyController::class,'getBySlug']);
Route::post('/survey/{survey}/answer',[surveyController::class,'storeAnwser']);

Route::middleware('auth:sanctum')->group(function(){
  Route::post('/logout',[Authcontroller::class,'logout']);
  Route::get('/me',[Authcontroller::class,'me']);
  Route::apiResource('survey',surveyController::class);

  Route::get('/dashboard',[dashboardController::class,'index']);
});
