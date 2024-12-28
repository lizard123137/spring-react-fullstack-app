<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

use App\Http\Controllers\Controller;

use App\Models\User;

class AuthController extends Controller
{
    public function loginCms(Request $request) {
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if(Auth::attempt($validated)) {
            return redirect()->route('cms.dashboard');
        }

        return back()->withErrors([
            'email' => 'Invalid credentials',
        ])->withInput();
    }

    public function login(Request $request) {
        $request->validate([
            'email' => ['required', 'email', 'exists:users'],
            'password' => ['required']
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = $user->createToken($user->username);
        
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token->plainTextToken
        ]);
    }
    
    public function register(Request $request) {
        $validated = $request->validate([
            'username' => ['required', 'max:32', 'unique:users'],
            'email' => ['required', 'email', 'unique:users'],
            'password' => ['required', 'confirmed']
        ]);

        $user = User::create($validated);

        $token = $user->createToken($request->username);

        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token->plainTextToken
        ]);
    }

    public function logout(Request $request) {
        $request->user()->tokens()->delete();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully',
        ]);
    }
}