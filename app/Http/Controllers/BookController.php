<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    public function books()
    {
        // Realiza la solicitud GET a tu API
        $token = session('jwt_token');
        $response = Http::withToken($token)
            ->get(env('APP_URL_BACKEND') . '/books');
            
        // Verifica que la solicitud fue exitosa
        if ($response->successful()) {
            $libros = $response->json()['data'];
            return view('book', compact('libros'));
        }
        else{
            Log::error('Error en la solicitud HTTP', [
                'status_code' => $response->status(),
                'error_message' => $response->body(),
                'url' => env('APP_URL_BACKEND') . '/books',
            ]);
        }
    }
}
