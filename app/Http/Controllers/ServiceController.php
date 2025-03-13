<?php

namespace App\Http\Controllers;

use App\Models\Machine;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ServiceController extends Controller
{
    public function index(Machine $machine)
    {
        $machine->services = Service::where('machine_id', $machine->id)
            ->orderByRaw('CASE WHEN start IS NULL AND end IS NULL THEN 0
                            WHEN start IS NOT NULL AND end IS NULL THEN 1
                            WHEN start IS NULL AND end IS NOT NULL THEN 2
                            END, start, created_at')
            ->get()->reverse()->values();

        return Inertia::render('machines/services', [
            'machine' => $machine,
        ]);
    }

    public function store(Request $request, Machine $machine)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'schedulingDate' => 'required|date|after:today',
            'category' => 'required',
            'expected_time' => 'required|not_in:0:00,00:00,000:00',
        ]);
        
        $timezone = Carbon::parse($request->input('schedulingDate'))->getTimezone();
        if ($timezone !== 'America/Sao_Paulo') {
            $request->merge([
                'schedulingDate' => Carbon::parse($request->input('schedulingDate'))->setTimezone('America/Sao_Paulo')->toDateTimeString()
            ]);
        } else {
            $request->merge([
                'schedulingDate' => Carbon::parse($request->input('schedulingDate'))->toDateTimeString()
            ]);
        }

        $machine->services()->create($request->all());
        return redirect()->route('services.index', $machine)->with('success', 'Serviço criado com sucesso.');
    }

    public function start(Machine $machine, Service $service)
    {
        if ($service->start !== null) {
            return redirect()->route('services.index', $machine)->with('error', 'Serviço já iniciado.');
        }

        $service->update([
            'start' => Carbon::now()->setTimezone('America/Sao_Paulo')->toDateTimeString()
        ]);

        return redirect()->route('services.index', $machine)->with('success', 'Serviço iniciado com sucesso.');
    }

    public function finish(Machine $machine, Service $service)
    {
        if ($service->end !== null) {
            return redirect()->route('services.index', $machine)->with('error', 'Serviço já finalizado.');
        }

        $service->update([
            'end' => Carbon::now()->setTimezone('America/Sao_Paulo')->toDateTimeString()
        ]);

        return redirect()->route('services.index', $machine)->with('success', 'Serviço finalizado com sucesso.');
    }
}
