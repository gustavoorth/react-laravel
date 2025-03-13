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
    Route::post('machines/{machine}', [ServiceController::class, 'store'])->name('services.store');
    Route::put('machines/{machine}/{service}/start', [ServiceController::class, 'start'])->name('services.start');
    Route::put('machines/{machine}/{service}/finish', [ServiceController::class, 'finish'])->name('services.finish');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
