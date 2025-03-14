import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AppLayout from '@/layouts/app-layout';
import { Contact, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { FormEventHandler, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './contact-columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Contatos',
        href: '/contacts',
    },
];

type CreateContactForm = {
    name: string;
    email?: string;
    phone: string;
    category: string;
}

export default function Index() {
    const { contacts } = usePage<{ contacts: Contact[] }>().props;
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<CreateContactForm>({
        name: '',
        email: '',
        phone: '',
        category: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('contacts.store'), {
          onSuccess: () => {
            reset('name', 'email', 'phone', 'category');
            setOpen(false);
          },
        });
      };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contatos" />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='ms-4 me-4 mt-2' variant="default">Adicionar Contato</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar Contato</DialogTitle>
                        <DialogDescription>
                            Adicionar um novo contato
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={submit}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input id="name" placeholder='Nome da Máquina' className="col-span-3"
                            onChange={(e) => setData('name', e.target.value)} value={data.name}/>
                            <InputError message={errors.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brand" className="text-right">
                                Email
                            </Label>
                            <Input id="email" placeholder='Email' className="col-span-3"
                            onChange={(e) => setData('email', e.target.value)} value={data.email} />
                            <InputError message={errors.email} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Telefone
                            </Label>
                            <Input id="phone" placeholder='Telefone' className="col-span-3"
                            onChange={(e) => setData('phone', e.target.value)} value={data.phone} />
                            <InputError message={errors.phone} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Categoria
                            </Label>
                            <Select name="category" onValueChange={(value) => setData('category', value)} value={data.category}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione o Grupo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categoria</SelectLabel>
                                        <SelectItem value="interno">Interno</SelectItem>
                                        <SelectItem value="tecnico">Técnico</SelectItem>
                                        <SelectItem value="fornecedor">Fornecedor</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.category} className="col-span-3" />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable columns={columns} data={contacts} />
            </div>
        </AppLayout>
    );
}
