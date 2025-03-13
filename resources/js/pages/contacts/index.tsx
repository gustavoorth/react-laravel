import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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

type CreateMachineForm = {
    brand: string;
    name: string;
    group: string;
    year: number | string;
    serial_number: string;
}

export default function Index() {
    const { contacts } = usePage<{ contacts: Contact[] }>().props;
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<CreateMachineForm>({
        brand: '',
        name: '',
        group: '',
        year: '',
        serial_number: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('machines.store'), {
          onSuccess: () => {
            reset('brand', 'name', 'group', 'year', 'serial_number');
            setOpen(false);
          },
        });
      };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Máquinas" />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='ms-4 me-4 mt-2' variant="outline">Adicionar Máquina</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adicionar Máquina</DialogTitle>
                        <DialogDescription>
                            Adicionar uma nova máquina
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={submit}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input id="name" placeholder='Nome da Máquina' className="col-span-3"
                            onChange={(e) => setData('name', e.target.value)} value={data.name}/>
                            <InputError message={errors.brand} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brand" className="text-right">
                                Marca
                            </Label>
                            <Input id="brand" placeholder='Marca' className="col-span-3"
                            onChange={(e) => setData('brand', e.target.value)} value={data.brand} />
                            <InputError message={errors.brand} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Grupo
                            </Label>
                            <Select name="group" onValueChange={(value) => setData('group', value)} value={data.group}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Selecione o Grupo" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Grupo</SelectLabel>
                                        <SelectItem value="corte">Corte</SelectItem>
                                        <SelectItem value="borda">Borda</SelectItem>
                                        <SelectItem value="furacao">Furação</SelectItem>
                                        <SelectItem value="usinagem">Usinagem</SelectItem>
                                        <SelectItem value="fresagem">Fresagem</SelectItem>
                                        <SelectItem value="pinagem">Pinagem</SelectItem>
                                        <SelectItem value="embalagem">Embalagem</SelectItem>
                                        <SelectItem value="metalurgia">Metalurgia</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.group} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="year" className="text-right">
                                Ano
                            </Label>
                            <Input id="year" name="year" placeholder='Ano de Fabricação' className="col-span-3"
                            onChange={(e) => setData('year', Number(e.target.value) || '')} value={data.year} />
                            <InputError message={errors.year} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="serial_number" className="text-right">
                                Número de Série
                            </Label>
                            <Input id="serial_number" name="serial_number" placeholder='Número de Série' className="col-span-3"
                            onChange={(e) => setData('serial_number', e.target.value)} value={data.serial_number} />
                            <InputError message={errors.serial_number} className="col-span-3" />
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
