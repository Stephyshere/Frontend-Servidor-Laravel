<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WatchController;
use App\Http\Controllers\AuthController;

// Esta es la ruta que hace que tu catálogo funcione
Route::get('/watches', [WatchController::class, 'index']);

// Esta es la ruta para el nuevo sistema de Login (Issue #6)
Route::post('/login', [AuthController::class, 'login']);