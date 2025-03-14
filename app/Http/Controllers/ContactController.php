<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Machine;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::with('machines')->orderBy('name')->get();
        return Inertia::render('contacts/index', [
            'contacts' => $contacts,
            'machines' => Machine::select('id', 'name')->orderBy('name')->get(),
        ]);

    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'phone' => 'required',
            'category' => 'required',
        ]);

        Contact::create($request->all());

        return redirect()->route('contacts.index')->with('success', 'Contato criado com sucesso.');
    }
}
