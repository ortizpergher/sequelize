import { Op } from 'sequelize';
import Post from '../models/Post';
import User from '../models/User';

class PostController {
  async index(request, response) {
    const { limit, offset } = request.query;

    let { content, userUid } = request.body;
    if (!content) {
      content = ' ';
    }

    return response.json(
      await Post.findAll({
        where: {
          [Op.and]: {
            content: {
              [Op.iLike]: `%${content}%`,
            },
            user_uid: {
              [Op.eq]: userUid,
            },
          },
        },
        attributes: ['content', 'user_uid'],
        limit,
        offset,
      })
    );
  }

  async show(request, response) {
    const { uid } = request.params;
    return response.json(await Post.findByPk(uid));
  }

  async store(request, response) {
    const { content, userUid } = request.body;

    const errors = [];

    if (!content) {
      errors.push({ error: 'Conteúdo não infomado! Informação obrigatória' });
    }

    if (!userUid) {
      errors.push({ error: 'Usuário não infomado! Informação obrigatória' });
    }

    const user = await User.findByPk(userUid);

    if (!user) {
      errors.push({ error: 'Usuário não encontrado!' });
    }

    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    return response.json(await Post.create({ content, user_uid: userUid }));
  }

  async update(request, response) {
    const { uid } = request.params;
    const { content, userUid } = request.body;

    const errors = [];

    if (!content) {
      errors.push({ error: 'Conteúdo não infomado! Informação obrigatória' });
    }

    if (!userUid) {
      errors.push({ error: 'Usuário não infomado! Informação obrigatória' });
    }

    const user = await User.findByPk(userUid);

    if (!user) {
      errors.push({ error: 'Usuário não encontrado!' });
    }

    const post = await Post.findByPk(uid);

    if (!post) {
      errors.push({ error: 'Post informado não foi encontrado!' });
    }

    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    return response.json(
      await Post.update(
        { content, user_uid: userUid },
        {
          where: {
            uid,
          },
          returning: true,
        }
      )
    );
  }

  async delete(request, response) {
    const { uid } = request.params;

    const post = await Post.destroy({
      where: {
        uid,
      },
    });
    if (post > 0) {
      return response.sendStatus(202);
    }

    return response.sendStatus(404);
  }
}

export default new PostController();
