import { prisma } from "../../../../database/prismaClinet";

interface ICreateClient {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClient) {}
}
