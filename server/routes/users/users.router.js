/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/search/:username").get(controller.search).all(methodNotAllowed);

router
  .route("/:userId")
  // .put(controller.update)
  .all(methodNotAllowed);

router.route("/").get(controller.read).all(methodNotAllowed);

router
  .route("/following/:userId")
  .get(controller.listFollowing)
  .all(methodNotAllowed);

router
  .route("/followers/:userId")
  .get(controller.listFollowers)
  .all(methodNotAllowed);

router
  .route("/:userId/follow")
  .put(controller.updateFollow)
  .all(methodNotAllowed);

router.route("/:id/img").put(controller.updatePicture).all(methodNotAllowed);

router
  .route("/:userId")
  //   .put(controller.update)
  .put(controller.delete)
  .all(methodNotAllowed);

module.exports = router;
