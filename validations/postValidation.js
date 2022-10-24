import { body } from 'express-validator'

export const postValidation = [
	body('title', 'введите заголовок поста').isLength().isString,
	body('text', 'введите текст статьи').isLength().isString,
	body('tags', 'неверный формат тегов').optional().isString,
	body('imageUrl', 'неверная ссылка на изображение').optional().isString,
]
