/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./posts.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/timeline/all").get(controller.list).all(methodNotAllowed);

router
  .route("/timeline/:userId")
  .get(controller.listFollowed)
  .all(methodNotAllowed);

router
  .route("/profile/:userId")
  .get(controller.listUserPosts)
  .all(methodNotAllowed);

// router
//   .route("/:postId/comment")
//   .put(controller.addComment)
//   .all(methodNotAllowed);

router.route("/like/:postId").put(controller.like).all(methodNotAllowed);

router
  .route("/:postId/:userId")
  .delete(controller.delete)
  .put(controller.update)
  .all(methodNotAllowed);

router.route("/:postId").get(controller.read).all(methodNotAllowed);

router.route("/").post(controller.create).all(methodNotAllowed);

module.exports = router;
