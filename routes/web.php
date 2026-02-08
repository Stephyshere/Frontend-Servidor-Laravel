<?php
use Illuminate\Support\Facades\Route;

// Forzamos que CUALQUIER ruta cargue la vista de React
Route::get('{any}', function () {
    return view('welcome');
})->where('any', '.*');