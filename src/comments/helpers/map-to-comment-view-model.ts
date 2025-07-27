import { LikeStatus } from "../../likes/types/likes.type";
import container from "../../core/container/container";
import { CommentEntity } from "../dto/comment.entity";
import { LikesService } from "../../likes/domain/likes.service";
import { WithId } from "mongodb";

const likesService = container.get<LikesService>(LikesService);
export async function mapToCommentViewModel(
  comment: WithId<CommentEntity>,
  userId: string,
) {
  const likesInfo = await likesService.getLikesInfo(
    comment._id.toString(),
    userId,
  );

  return {
    id: comment._id.toString(),
    commentatorInfo: comment.commentatorInfo,
    content: comment.content,
    createdAt: comment.createdAt,
    likesInfo: {
      likesCount: likesInfo.likesCount ?? 0,
      dislikesCount: likesInfo.dislikesCount ?? 0,
      myStatus: likesInfo.myStatus ?? LikeStatus.None,
    },
  };
}
