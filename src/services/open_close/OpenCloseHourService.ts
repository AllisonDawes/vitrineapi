import { getRepository } from "typeorm";

import OpenCloseHourMenu from "../../models/OpenCloseHourMenu";
import User from "../../models/User";

import AppError from "../../errors/AppError";

interface IRequest {
  admin_id: string;
  status: boolean;
  hour_open: Date;
  hour_close: Date;
}

class OpenCloseHourService {
  public async execute({
    admin_id,
    status,
    hour_open,
    hour_close,
  }: IRequest): Promise<OpenCloseHourMenu> {
    const openCloseRepository = getRepository(OpenCloseHourMenu);
    const userRepository = getRepository(User);

    const admin = await userRepository.findOne(admin_id);

    if (!admin) {
      throw new AppError("Usuário administrador não encontrado!", 400);
    }

    const findMenuOpenCloseHour = await openCloseRepository.findOne();

    if (findMenuOpenCloseHour) {
      findMenuOpenCloseHour.hour_open = hour_open;
      findMenuOpenCloseHour.hour_close = hour_close;

      await openCloseRepository.save(findMenuOpenCloseHour);

      return findMenuOpenCloseHour;
    }

    const menuOpenClose = openCloseRepository.create({
      status,
      hour_open,
      hour_close,
    });

    await openCloseRepository.save(menuOpenClose);

    return menuOpenClose;
  }
}

export default OpenCloseHourService;
