<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/login', [\App\Http\Controllers\AuthController::class, 'login'])
    ->middleware(['guest'])
    ->name('login');

Route::post('/register', [\App\Http\Controllers\AuthController::class, 'register'])
    ->middleware(['guest'])
    ->name('register');

Route::post('/email/verify/{id}/{hash}', \App\Http\Controllers\VerifyEmailController::class)
    ->middleware(['auth:sanctum', 'signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::post('/email/verification-notification', \App\Http\Controllers\EmailVerificationNotificationController::class)
    ->name('verification.send');

Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout'])
    ->middleware('auth:sanctum')
    ->name('logout');

Route::get('/{any?}', [\App\Http\Controllers\SpaController::class, 'index'])
    ->where('any', '^(?!api).*$')
    ->name('home');
