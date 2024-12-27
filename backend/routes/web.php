<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::view('/login', 'auth.login');

Route::post('/login', [AuthController::class, 'loginCms'])->name('cms.login');
Route::post('/logout', [AuthController::class, 'logoutCms'])->name('cms.logout');

Route::group(['middleware' => 'is_admin'], function() {
    Route::view('/dashboard', 'dashboard')->name('cms.dashboard');

    Route::group([
        'prefix' => 'users',
    ], function() {
        Route::get('/', [UserController::class, 'index']);
        Route::get('/{id}', [UserController::class, 'show']);
    });
});