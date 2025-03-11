<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        return Inertia::render('cars/index')->with('cars', Car::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'brand' => 'required',
            'model' => 'required',
            'mileage' => 'required',
            'year' => 'required|integer|between:1920,2026',
            'body_type' => 'required',
        ]);

        $request->merge([
            'brand' => ucfirst(strtolower($request->brand)),
            'model' => ucfirst(strtolower($request->model)),
        ]);

        Car::create($request->all());

        return redirect()->route('cars.index');
    }
}
