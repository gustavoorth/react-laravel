import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Car } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cars',
        href: '/cars',
    },
];

export default function Cars() {
    const { cars } = usePage<{ cars: Car[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cars" />
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Create Car</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Car</DialogTitle>
                        <DialogDescription>
                            Add a new car to the list.
                        </DialogDescription>
                    </DialogHeader>
                    <form method="POST" action="/cars" className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brand" className="text-right">
                                Brand
                            </Label>
                            <Input id="brand" name="brand" placeholder='Ex. Toyota' className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="model" className="text-right">
                                Model
                            </Label>
                            <Input id="model" name="model" placeholder='Ex. Corolla' className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="mileage" className="text-right">
                                Mileage
                            </Label>
                            <Input id="mileage" name="mileage" placeholder='Ex. 100,000' className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="year" className="text-right">
                                Year
                            </Label>
                            <Input id="year" name="year" placeholder='Ex. 2015' className="col-span-3" />
                            <InputError className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Body Type
                            </Label>
                            <Select name="body_type">
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a body type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Body Type</SelectLabel>
                                        <SelectItem value="coupe">Coupe</SelectItem>
                                        <SelectItem value="sedan">Sedan</SelectItem>
                                        <SelectItem value="hatch">Hatch</SelectItem>
                                        <SelectItem value="suv">SUV</SelectItem>
                                        <SelectItem value="van">Van</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </form>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableCaption>A list of your cars.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Model</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead>Mileage</TableHead>
                            <TableHead>Maker</TableHead>
                            <TableHead>Body Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cars.map((car) => (
                            <TableRow key={car.id}>
                                <TableCell>{car.model}</TableCell>
                                <TableCell>{car.year}</TableCell>
                                <TableCell>{car.mileage}</TableCell>
                                <TableCell>{car.maker}</TableCell>
                                <TableCell>{car.body_type}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
