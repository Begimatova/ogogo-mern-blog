import PostModel from '../models/PostModel.js'

// Created Post
export const createdNewPost = async (req, res) => {
	try {
		const doc = new PostModel({
			title: req.body.title,
			text: req.body.text,
			imgUrl: req.body.imgUrl,
			tags: req.body.tags,
			user: req.userId,
		})
		const post = await doc.save()

		res.json(post)
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'К сожалению не удалось...',
		})
	}
}
//get allPost
export const getAllPosts = async (req, res) => {
	try {
		const posts = await PostModel.find().populate('user').exec()
		console.log(posts)
		res.json(posts)
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'к сожалению не удалось',
		})
	}
}

//get single posts
export const getSinglePosts = async (req, res) => {
	try {
		const postId = await req.params.id

		PostModel.findByIdAndUpdate(
			{
				_id: postId,
			},
			{
				$inc: { viewsCount: 1 },
			},
			{
				returnDocument: 'after',
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					res.status(500).json({
						message: 'К сожалению не удалось...',
					})
				}
				if (!doc) {
					console.log(err)
					res.status(500).json({
						message: 'К сожалению пост не найден...',
					})
				}
				res.json(doc)
			}
		)

		const posts = await PostModel.find().populate('user').exec()
		console.log(posts)
		res.json(posts)
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'к сожалению не удалось',
		})
	}
}

//remove posts

export const removePosts = async (req, res) => {
	try {
		const postId = await req.params.id
		PostModel.findByIdAndDelete(
			{
				_id: postId,
			},
			(err, doc) => {
				if (err) {
					console.log(err)
					return res.status(500).json({
						message: 'к сожалению не удалось...',
					})
				}
				if (!doc) {
					return res.status(404).json({
						message: 'к сожалению не удалось...',
					})
				}
				res.json({
					sucess: true,
				})
			}
		)
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'к сожалению не удалось...',
		})
	}
}

//update posts

export const updatePost = async (req, res) => {
	try {
		const postId = await req.params.id
		await PostModel.updateOne(
			{
				_id: postId,
			},
			{
				title: req.body.title,
				text: req.body.text,
				imageUrl: req.body.imageUrl,
				user: req.userId,
				tags: req.body.tags,
			}
		)
		res.json({
			sucess: true,
		})
	} catch (err) {
		console.log(`Ошибка ${err}`)
		res.status(500).json({
			message: 'к сожалению не удалось удалить пост...',
		})
	}
}
