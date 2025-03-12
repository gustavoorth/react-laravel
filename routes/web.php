<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\ServiceController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('machines', [MachineController::class, 'index'])->name('machines.index');
    Route::post('machines', [MachineController::class, 'store'])->name('machines.store');
    Route::get('machines/{machine}', [ServiceController::class, 'index'])->name('services.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
