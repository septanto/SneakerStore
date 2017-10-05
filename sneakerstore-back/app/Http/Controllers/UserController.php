<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    function SignUp(Request $req) {
        try {
            //Untuk Validasi
            $this->validate($req, [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
            ]);

            //Create New User by Eloquent ORM
            $user = new User;
            $user->name = $req->input('name');
            $user->email = $req->input('email');
            $user->password = bcrypt($req->input('password'));
            $user->address = $req->input('address');
            $user->phone_number = $req->input('phone_number');
            $user->save();

            $token = JWTAuth::fromUser($user);
            return response()->json(['message' => 'Succesfully Create User', 'token' => $token], 200);
        }
        catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create user, exception:' + $e], 500);
        }
    }
    function SignIn(Request $request) {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        }
        catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        //all good so return the token
        return response()->json(compact('token'));
        // return response()->json(['token' => $token], 200); ->Cara lain
    }
}
