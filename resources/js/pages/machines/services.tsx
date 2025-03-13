import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Service, type Machine } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { FormEventHandler, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './service-columns';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/date-time-picker';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Máquinas',
        href: '/machines',
    },
    {
        title: 'Serviços',
        href: '/machines/services',
    },
];

type CreateServiceForm = {
    name: string;
    description: string;
    category: string;
    start: string;
    expected_time: string;
}

export default function Services() {
    const { machine } = usePage<{ machine: Machine }>().props;
    
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<CreateServiceForm>({
        name: '',
        description: '',
        category: '',
        start: '',
        expected_time: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('services.store', { machine: machine.id }), {
            onSuccess: () => {
                reset('name', 'description', 'category', 'start', 'expected_time');
                setOpen(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Serviços" />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button className='ms-4 me-4 mt-2' variant="outline">Criar Serviço</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Criar Serviço</DialogTitle>
                        <DialogDescription>
                            Preencha o formulário abaixo para criar um novo serviço
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid gap-4 py-4" onSubmit={submit}>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input id="name" placeholder='Nome da Máquina' className="col-span-3"
                                onChange={(e) => setData('name', e.target.value)} value={data.name} />
                            <InputError message={errors.name} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Descrição
                            </Label>
                            <Textarea id="description" placeholder='Descrição do Serviço' className="col-span-3"
                                onChange={(e) => setData('description', e.target.value)} value={data.description} />
                            <InputError message={errors.description} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Categoria
                            </Label>
                            <Select name="category" onValueChange={(value) => setData('category', value)} value={data.category}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Categoria" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Categorias</SelectLabel>
                                        <SelectItem value="corretiva">Corretiva</SelectItem>
                                        <SelectItem value="preventiva">Preventiva</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.category} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="start" className="text-right">
                                Data e Hora de Início
                            </Label>
                            <DateTimePicker className="col-span-3" onChange={(e) => {
                                setData('start', e);
                            }} value={data.start} />
                            <InputError message={errors.start} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="expected_time" className="text-right">
                                Tempo Estimado
                            </Label>
                            <Input id="expected_time" placeholder='00:00' className="col-span-3"
                                onChange={(e) => setData('expected_time', e.target.value)} value={data.expected_time} />
                            <InputError message={errors.expected_time} className="col-span-3" />
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
                <DataTable columns={columns} data={machine.services} />
            </div>
        </AppLayout>
    );
}
