/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./comments.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

router.route("/:postId").get(controller.list).all(methodNotAllowed);

router.route("/").post(controller.create).all(methodNotAllowed);

module.exports = router;
