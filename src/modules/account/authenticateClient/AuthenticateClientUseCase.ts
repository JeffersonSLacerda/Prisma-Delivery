import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    // Receber senha e password

    // Verificar se o username é cadastrado
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!!");
    }
    // Verificar se a senha corresponde ao username,
    // com o compare consigo compara sem desciptografar a senha retornada do banco
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!!");
    }

    // Gera o token
    // adicionar chamve secreta ao .env
    const token = sign({ username }, "aa611f5dd768f66db79169e6773d1a2f", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
