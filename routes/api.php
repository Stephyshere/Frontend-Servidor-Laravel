<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// Estas dos líneas de abajo son las que quitan el color rojo del código:
use App\Http\Controllers\WatchController;
use App\Http\Controllers\AuthController;

// Esta es la ruta que hace que tu catálogo funcione
Route::get('/watches', [WatchController::class, 'index']);

// Esta es la ruta para el nuevo sistema de Login (Issue #6)
Route::post('/login', [AuthController::class, 'login']);