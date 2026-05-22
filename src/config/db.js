import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('DB connected via Prisma');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process with an error code
    }
}

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log('DB disconnected via Prisma');
    } catch (error) {
        console.error('Error disconnecting from the database:', error);
        process.exist(1); // Exit the process with an error code
    }
}

export { prisma, connectDB, disconnectDB };
