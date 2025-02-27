import jwt from "jsonwebtoken";


// export const getUserIdFromToken = (token: any, secretKey: string): string => {
//     try {
//         const data = jwt.verify(token, secretKey);
//         return (data as { id: string }).id; // Accede al campo `id` del payload
//     } catch (error) {
//         throw new Error('Invalid or expired token');
//     }
  
//   };
  