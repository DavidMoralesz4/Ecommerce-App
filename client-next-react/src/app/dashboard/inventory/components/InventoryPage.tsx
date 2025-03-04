'use client'

import { signIn, signOut, useSession } from "next-auth/react";

export default function InventoryPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Cargando...</p>;

  return (
    <div>
      {session ? (
        <>
          <p>Bienvenido, {session.user?.email}</p>
          <button onClick={() => signOut()}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <p>No estás autenticado</p>
          <button onClick={() => signIn()}>Iniciar sesión</button>
        </>
      )}
    </div>
  );
}
