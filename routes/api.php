<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentTypeController;
use App\Http\Controllers\UtilController;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\VehicleDocumentsController;

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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/me', [AuthController::class, 'userProfile']);
});

Route::post('/vehicles/{vehicle}/documents', [VehicleDocumentsController::class, 'store']);
Route::get('/vehicles/{vehicle}/documents', [VehicleDocumentsController::class, 'index']);
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show']);
Route::get('/document-types', [DocumentTypeController::class, 'index']);

Route::post('/upload-file', [UtilController::class, 'uploadFile']);
