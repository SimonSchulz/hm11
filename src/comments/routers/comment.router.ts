import { idValidation } from "../../core/utils/params-id.validation";
import { inputValidationResultMiddleware } from "../../core/utils/input-validtion-result.middleware";
import { Router } from "express";
import { contentValidation } from "../validation/comment.input-dto.validation";
import { deleteCommentHandler } from "./handlers/delete-comment-handler";
import { updateCommentHandler } from "./handlers/update-comment-handler";
import { getCommentHandler } from "./handlers/get-comment-handler";
import container from "../../core/container/container";
import { AccessTokenGuard } from "../../auth/routers/guards/access.token.guard";
import TYPES from "../../core/container/types";
import { likeStatusValidation } from "../../likes/validation/like-status.validation";
import { putLikeStatusHandler } from "./handlers/like-status.handler";
const accessTokenGuard = container.get<AccessTokenGuard>(
  TYPES.AccessTokenGuard,
);
export const commentsRouter = Router({});
commentsRouter
  .get(
    "/:id",
    accessTokenGuard.handle.bind(accessTokenGuard),
    idValidation,
    inputValidationResultMiddleware,
    getCommentHandler,
  )

  .put(
    "/:id",
    accessTokenGuard.handle.bind(accessTokenGuard),
    idValidation,
    contentValidation,
    inputValidationResultMiddleware,
    updateCommentHandler,
  )
  .put(
    "/:id/like-status",
    accessTokenGuard.handle.bind(accessTokenGuard),
    likeStatusValidation,
    inputValidationResultMiddleware,
    putLikeStatusHandler,
  )

  .delete(
    "/:id",
    accessTokenGuard.handle.bind(accessTokenGuard),
    idValidation,
    inputValidationResultMiddleware,
    deleteCommentHandler,
  );
