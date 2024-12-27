<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class UserController extends Controller
{
    public function index() {
        $users = User::all();

        $data = [
            'status' => 200,
            'users' => $users,
        ];

        return response()->json($data, 200);
    }

    public function show($id) {
        return User::find($id);
    }
}