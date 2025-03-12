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
        $machine->services()->create($request->all());
        return redirect()->route('machines.services', $machine)->with('success', 'Serviço criado com sucesso.');
    }
}
