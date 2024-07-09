<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class Authcontroller extends Controller
{
    public function signup(Request $request)
    {
        $data=$request->validate(['name'=>'required|string',
        'email'=>'required|email|string|unique:users,email',
        'password'=>[
            'required',
            'confirmed',
            Password::min(8)->mixedCase()->numbers()->symbols(),
        ]]);
        $user=User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password'])
        ]);
        $token=$user->createToken('main')->plainTextToken;

        return response([
            'user'=>$user,
            'token'=>$token,
        ]);
    }
    public function login(Request $request)
    {
       $credentials=$request->validate(['email'=>'required|email|string',
       'password'=>'required',
       'remember'=>'boolean',]);
       $remember=$credentials ?? false;
       unset($credentials['remember']);
       if(!Auth::attempt($credentials,$remember))
       {
        return response([
            'error'=>'The provided credentials are not correct'
        ],422);
       };
    $user=Auth::user();
    $token=$user->createToken('main')->plainTextToken;
    return response([
        'user'=>$user,
        'token'=>$token
       ]);
    }
    public function logout(Request $request)
    {
       $user=Auth::user();
       $user->currentAccessToken()->delete();
       return response([
        'success'=>true
       ]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}
