const express = require('express')

const { joiSchema, joiSubscrSchema } = require('../../models/user')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const upload = require('../../middlewares/upload')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/users/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/verify', controllerWrapper(ctrl.reverification))

router.get('/users/verify/:verifyToken', controllerWrapper(ctrl.verify))

router.post('/users/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.patch('/users', authenticate, validation(joiSubscrSchema), controllerWrapper(ctrl.updateSubscr))

router.get('/users/logout', authenticate, controllerWrapper(ctrl.logout))

router.get('/users/current', authenticate, controllerWrapper(ctrl.current))

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.avatars)

module.exports = router
