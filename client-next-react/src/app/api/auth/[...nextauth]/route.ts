import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Correo electrónico", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Conéctate a tu backend para autenticar al usuario
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          credentials: "include", // Mantiene la cookie de sesión
        });

        if (!res.ok) throw new Error("Credenciales incorrectas");

        const user = await res.json();

        // Verifica la respuesta del backend
        if (user.error) throw new Error(user.error);

        return user; // Devuelve el usuario para que NextAuth lo maneje
      },
    }),
  ],
  session: { strategy: "jwt" }, // Usar JWT para las sesiones
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }; // Agregar el usuario al JWT
    },
    async session({ session, token }) {
      session.user = token as any; // Establecer el usuario en la sesión
      return session;
    },
  },
  pages: {
    signIn: "/login", // Asegúrate de usar tu ruta de login personalizada
  },
});

export { handler as GET, handler as POST };
