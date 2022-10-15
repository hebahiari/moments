/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./auth.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

router.route("/register").post(controller.register).all(methodNotAllowed);

router.route("/login").post(controller.login).all(methodNotAllowed);

module.exports = router;
