const express = require('express')

const { joiSchema, updateFavoriteJoiSchema } = require('../../models/contact')
const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', authenticate, controllerWrapper(ctrl.listContacts))

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getContactById))

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateContact))

router.patch('/:contactId', authenticate, validation(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateFavoriteContact))

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeContact))

module.exports = router
