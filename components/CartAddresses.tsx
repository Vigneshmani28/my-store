"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Address = {
  id: string;
  name: string;
  details: string;
  State: string;
  Pin: string;
};

export default function CartAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", name: "Home", details: "123 Main St, City", State: "TamilNadu", Pin: "600001" },
    { id: "2", name: "Work", details: "456 Office Ave, City", State: "TamilNadu", Pin: "600001" },
  ]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", details: "", State: "", Pin: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const newAddress: Address = {
      id: Date.now().toString(),
      ...form,
    };

    setAddresses((prev) => [...prev, newAddress]);
    setForm({ name: "", details: "", State: "", Pin: "" });
    setOpen(false);
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-2">Addresses</h2>
      <ul className="mb-4 space-y-2">
        {addresses.map((addr) => (
          <li key={addr.id} className="border p-3 rounded-lg">
            <p className="font-medium">{addr.name}</p>
            <p className="text-sm text-muted-foreground">{addr.details}</p>
            <p className="text-sm text-muted-foreground">{addr.State} - {addr.Pin}</p>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">+ Add New Address</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Label</Label>
              <Input id="name" name="name" value={form.name} onChange={handleChange} className="col-span-3" placeholder="Home / Work" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="details" className="text-right">Details</Label>
              <Input id="details" name="details" value={form.details} onChange={handleChange} className="col-span-3" placeholder="123 Street, City" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="State" className="text-right">State</Label>
              <Input id="State" name="State" value={form.State} onChange={handleChange} className="col-span-3" placeholder="Tamil Nadu" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Pin" className="text-right">PIN</Label>
              <Input id="Pin" name="Pin" value={form.Pin} onChange={handleChange} className="col-span-3" placeholder="600001" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
