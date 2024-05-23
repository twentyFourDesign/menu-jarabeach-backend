import { Router } from 'express'
import { ROUTES } from '../constants/index.js'
import {
	deleteCategory,
	getCategories,
	postCategory,
	putCategory,
} from '../controllers/index.js'

const router = Router()

router.route(ROUTES.CATEGORY).get(getCategories).post(postCategory)
router
	.route(ROUTES.CATEGORY + ROUTES.ID)
	.put(putCategory)
	.delete(deleteCategory)

export { router as categoryRoutes }
