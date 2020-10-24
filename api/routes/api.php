<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('user', function (Request $request) {
        return response()->json($request->user());
    });

    Route::put('user/profile-information', [\App\Http\Controllers\UserProfileInformationController::class, 'update']);
    Route::put('user/password', [\App\Http\Controllers\UserPasswordController::class, 'update']);
});
