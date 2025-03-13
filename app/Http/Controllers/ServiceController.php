<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index(Machine $machine)
    {
        $machine->services = Service::where('machine_id', $machine->id)->get();
        return Inertia::render('machines/services', [
            'machine' => $machine,
        ]);
    }

    public function store(Request $request, Machine $machine)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'start' => 'required',
            'category' => 'required',
            'expected_time' => 'required',
        ]);

        $request->merge([
            'start' => \Carbon\Carbon::parse($request->input('start'))->toDateTimeString(),
        ]);


        $machine->services()->create($request->all());
        return redirect()->route('services.index', $machine)->with('success', 'Serviço criado com sucesso.');
    }
}
