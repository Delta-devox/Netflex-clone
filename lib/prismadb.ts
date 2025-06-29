import { PrismaClient } from '@prisma/client';
const client = global.prismadb || new PrismaClient(); //if global.prismadb exist, then assign it to client otherwise create a new instance of PrismaClient and assign it to client.

if(process.env.NODE_ENV === 'production') global.prismadb = client;

export default client;
