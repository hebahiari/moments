/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./users.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed");

router.route("/search/:username").get(controller.search).all(methodNotAllowed);

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

router
  .route("/:userId/unfollow")
  .put(controller.updateUnfollow)
  .all(methodNotAllowed);

router.route("/:userId/pets").post(controller.createPet).all(methodNotAllowed);

router
  .route("/:userId/img")
  .put(controller.updatePicture)
  .all(methodNotAllowed);

router
  .route("/:userId/cover")
  .put(controller.updateCover)
  .all(methodNotAllowed);

router
  .route("/:userId/notifications")
  .get(controller.listNotifications)
  .all(methodNotAllowed);

router
  .route("/:userId/clear")
  .put(controller.clearNotifications)
  .all(methodNotAllowed);

router.route("/:userId/followers/:currentUserId").get(controller.isAFollower);
// router
//   .route("/:userId")
//   .put(controller.update)
//   .delete(controller.delete)
//   .all(methodNotAllowed);

module.exports = router;
