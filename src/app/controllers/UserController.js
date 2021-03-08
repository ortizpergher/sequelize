import { Op } from 'sequelize';
import User from '../models/User';

class UserController {
  async index(request, response) {
    const { limit, offset } = request.query;

    let { name, email } = request.body;
    if (!name && !email) {
      email = '@';
    }
    const result = await User.findAll({
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
          email: {
            [Op.iLike]: `%${email}%`,
          },
        },
      },
      attributes: ['uid', 'name', 'email'],
      limit,
      offset,
    });

    return response.json(result);
  }

  async show(request, response) {
    const { uid } = request.params;

    return response.json(await User.findByPk(uid));
  }

  async store(request, response) {
    const { name, email } = request.body;

    const errors = [];

    if (!name) {
      errors.push({ error: 'Nome não infomado! Informação obrigatória' });
    }

    if (!email) {
      errors.push({ error: 'E-mail não infomado! Informação obrigatória' });
    }

    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    const user = await User.create({
      name,
      email,
    });

    return response.json(user);
  }

  async update(request, response) {
    const { uid } = request.params;
    const { name, email } = request.body;

    const errors = [];

    if (!name) {
      errors.push({ error: 'Nome não infomado! Informação obrigatória' });
    }

    if (!email) {
      errors.push({ error: 'E-mail não infomado! Informação obrigatória' });
    }

    const user = await User.findByPk(uid);

    if (!user) {
      errors.push({ error: 'Usuário não encontrado!' });
    }

    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    user.name = name;
    user.email = email;

    user.save();

    return response.json(user);
  }

  async delete(request, response) {
    const { uid } = request.params;

    const user = await User.destroy({
      where: {
        uid,
      },
    });
    if (user > 0) {
      return response.sendStatus(202);
    }
    return response.sendStatus(404);
  }
}

export default new UserController();
