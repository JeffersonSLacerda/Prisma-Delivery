import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {
    const cleintExists = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (cleintExists) {
      throw new Error("Client alredy exists!");
    }

    const hashPassword = await hash(password, 10);

    await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });
  }
}
