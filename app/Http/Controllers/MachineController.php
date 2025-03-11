<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Machine;
use Illuminate\Http\Request;

class MachineController extends Controller
{
    public function index()
    {
        return Inertia::render('machines/index')->with('machines', Machine::orderBy('name')->get());

    }

    public function store(Request $request)
    {
        $request->validate([
            'brand' => 'required',
            'name' => 'required',
            'group' => 'required',
            'year' => 'required|integer|between:1920,2026',
            'serial_number' => 'required',
        ]);

        Machine::create($request->all());

        return redirect()->route('machines.index');
    }
}
