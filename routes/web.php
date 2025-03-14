<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MachineController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ComponentController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::controller(MachineController::class)->group(function () {
        Route::get('machines', 'index')->name('machines.index');
        Route::post('machines', 'store')->name('machines.store');
    });
    
    Route::controller(ServiceController::class)->group(function () {
        Route::get('machines/{machine}', 'index')->name('services.index');
        Route::post('machines/{machine}', 'store')->name('services.store');
        Route::put('machines/{machine}/{service}/start', 'start')->name('services.start');
        Route::put('machines/{machine}/{service}/finish', 'finish')->name('services.finish');
    });


    Route::controller(ContactController::class)->group(function () {
        Route::get('contacts', 'index')->name('contacts.index');
        Route::post('contacts', 'store')->name('contacts.store');
    });

    Route::controller(ComponentController::class)->group(function () {
        
    });
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
