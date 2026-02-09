<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Ruta para el Catálogo
Route::get('/', function () {
    return Inertia::render('WatchList');
});

// Ruta para el Login (He corregido tu URL del componente)
Route::get('/login', function () {
    return Inertia::render('Login'); 
});


Route::get('/register', function () {
    return Inertia::render('Register');
});