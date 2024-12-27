<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;

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
        $validated = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if(Auth::attempt($validated)) {
            $user = Auth::user();
            return response()->json([
                'status' => 'success',
                'message' => 'Login successful',
                'user' => $user,
            ], 200);
        }

        return response()->json([
            'status' => 'error',
            'message' => 'Invalid credentials',
        ], 401);
    }
}