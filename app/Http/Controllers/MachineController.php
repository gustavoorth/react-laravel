<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Machine;
use Illuminate\Http\Request;

class MachineController extends Controller
{
    public function index()
    {
        return Inertia::render('machines/index', [
            'machines' => Machine::orderBy('name')->get(),
        ]);

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

        return redirect()->route('machines.index')->with('success', 'Máquina criada com sucesso.');
    }

    public function addContact(Request $request, Machine $machine)
    {
        $request->validate([
            'contact_id' => 'required|exists:contacts,id',
        ]);

        $machine->contacts()->attach($request->contact_id);

        return redirect()->back()->with('success', 'Vinculo criado com sucesso.');
    }
}
