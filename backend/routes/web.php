<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::view('/login', 'auth.login');

Route::group(['middleware' => 'is_admin'], function() {
    Route::group([
        'prefix' => 'users',
    ], function() {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
    });
});