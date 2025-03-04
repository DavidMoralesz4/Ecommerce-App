"use client"

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Correo o contraseña incorrectos");
    } else {
      router.push("/dashboard"); // Redirigir después del login
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Iniciar sesion</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Ingresa tu datos para continuar
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Correo electronico</Label>
          <Input id="email" type="email" placeholder="m@example.com" required onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className="grid gap-3">
        <Label htmlFor="email">Contrasena</Label>
          <Input
            id="password"
            type="password"
            required
            placeholder="xxxxxxxx"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <p className="text-red-600 text-center text-[14px]">{error}</p>
        <Button type="submit" className="w-full" >
          Iniciar sesion
        </Button>
      </div>
    </form>
  );
}
