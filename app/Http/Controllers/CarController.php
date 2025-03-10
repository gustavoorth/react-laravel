<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Car;
use Illuminate\Http\Client\Request;

class CarController extends Controller
{
    public function index()
    {
        return Inertia::render('cars/index')->with('cars', Car::all());
    }

    public function store(Request $request)
    {
        dd($request->all());
        $request->validate([
            'name' => 'required',
            'model' => 'required',
            'year' => 'required',
            'mileage' => 'required',
            'maker' => 'required',
            'body_type' => 'required',
        ]);

        Car::create($request->all());

        return redirect()->route('cars.index');
    }
}
