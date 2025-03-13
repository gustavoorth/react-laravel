"use client"

import { Service } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { router } from "@inertiajs/react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const handleService = (machine_id: number, id: number, action: string) => {
    const routeName = action === 'start' ? 'services.start' : 'services.finish'
    router.post(route(routeName, { machine: machine_id, service: id }), {
        _method: 'put',
    });
}

export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: "Descrição",
    },
    {
        accessorKey: "category",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Categoria
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: (info) => (info.getValue() as string)?.charAt(0).toUpperCase() + (info.getValue() as string)?.slice(1),
    },
    {
        accessorKey: "schedulingDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Data de Agendamento
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ getValue }) => {
            return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(getValue() as string));
        },
    },
    {
        accessorKey: "expected_time",
        header: "Tempo estimado",
        cell: ({ getValue }) => {
            const [hours, minutes] = (getValue() as string).split(':').map(Number);

            return hours ? `${hours} Horas e ${minutes} Minutos` : `${minutes} Minutos`;
        },
    },
    {
        accessorKey: "real_time",
        header: "Status | Tempo real",
        cell: ({ row }) => {
            if (!row.original.start) {
                return 'Agendado';
            }
            if (!row.original.end) {
                return 'Em andamento';
            }
            const start = new Date(row.original.start as string);
            const end = new Date(row.original.end as string);
            const diff = Math.abs(end.getTime() - start.getTime());
            const minutes = Math.floor(diff / 1000 / 60);
            const hours = Math.floor(minutes / 60);

            return hours ? `${hours} Horas e ${minutes % 60} Minutos` : `${minutes} Minutos`;
        },
    },
    {
        accessorKey: "end",
        header: "Data de conclusão",
        cell: ({ getValue }) => {
            if (!getValue()) {
                return 'Não finalizado';
            }
            return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(getValue() as string));
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            {row.original.start ? (
                                <DropdownMenuItem onClick={() => handleService(row.original.machine_id, row.original.id, 'finish')}>
                                    Finalizar
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem onClick={() => handleService(row.original.machine_id, row.original.id, 'start')}>
                                    Iniciar
                                </DropdownMenuItem>
                            )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
