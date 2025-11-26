package post

import (
	"context"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
	"strconv"
	"strings"
	"unicore/biz/dal/mysql"
	PostService "unicore/biz/service/post"
	UserService "unicore/biz/service/user"
	"unicore/pkg/constants"
	"unicore/pkg/errno"
)

func CreatePost(ctx context.Context, c *app.RequestContext) {
	var req CreatePostRequest
	err := c.Bind(&req)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			CreatePostResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
	}
	userID, _ := strconv.ParseUint(req.CreatorID, 10, 32)
	postType, _ := strconv.Atoi(req.Type)
	post, err := PostService.CreatePostService(uint(userID), req.Content, postType)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			CreatePostResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	if post == nil {
		c.JSON(
			consts.StatusOK,
			CreatePostResponse{
				StatusCode: errno.Error,
				Message:    "No such user",
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		CreatePostResponse{
			StatusCode: errno.SuccessCode,
			Post: PostService.ReturnPost{
				Post:      *post,
				Reply:     0,
				LikeCount: 0,
				Like:      false,
			},
		},
	)
}

func GetPostDetail(ctx context.Context, c *app.RequestContext) {
	postID, err := strconv.ParseUint(c.Query("post_id"), 10, 32)
	userID, err := strconv.ParseUint(c.Query("user_id"), 10, 32)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			CreatePostResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	post, err := mysql.GetPostDetailByID(uint(postID))
	if err != nil {
		c.JSON(
			consts.StatusOK,
			CreatePostResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	if post == nil {
		c.JSON(
			consts.StatusOK,
			CreatePostResponse{
				StatusCode: errno.Error,
				Message:    "No such post!",
			},
		)
		return
	}
	data, err := PostService.GetStatisticData(post.ID, uint(userID))
	if err != nil {
		c.JSON(
			consts.StatusOK,
			CreatePostResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		GetPostDetailResponse{
			StatusCode: errno.SuccessCode,
			Post: PostService.ReturnPost{
				Post:      *post,
				Reply:     data.Reply,
				LikeCount: data.LikeCount,
				Like:      data.Like,
			},
		},
	)
}

func GetSchoolPost(ctx context.Context, c *app.RequestContext) {
	userID := c.Query("user_id")
	page := c.Query("page")
	returnPostList, err := PostService.GetSchoolPostService(userID, page)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			CreatePostResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	haveNext := false
	if len(*returnPostList) == constants.PostPageSize {
		haveNext = true
	}
	c.JSON(
		consts.StatusOK,
		GetPostListResponse{
			StatusCode: errno.SuccessCode,
			PostList:   *returnPostList,
			HaveNext:   haveNext,
		},
	)
}

func GetPublicPost(ctx context.Context, c *app.RequestContext) {
	page := c.Query("page")
	userID := c.Query("user_id")
	returnPostList, err := PostService.GetPublicPostService(userID, page)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			GetPostListResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	haveNext := false
	if len(*returnPostList) == constants.PostPageSize {
		haveNext = true
	}
	c.JSON(
		consts.StatusOK,
		GetPostListResponse{
			StatusCode: errno.SuccessCode,
			PostList:   *returnPostList,
			HaveNext:   haveNext,
		},
	)
}

func GetUserPost(ctx context.Context, c *app.RequestContext) {
	page := c.Query("page")
	userID := c.Query("user_id")
	userPostList, err := PostService.GetUserPostedPost(userID, page)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			GetPostListResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	haveNext := false
	if len(*userPostList) == constants.PostPageSize {
		haveNext = true
	}
	returnPostList := make([]PostService.ReturnPost, len(*userPostList))
	uid, err := strconv.ParseUint(userID, 10, 32)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			GetPostListResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	for idx, userPost := range *userPostList {
		data, err := PostService.GetStatisticData(userPost.ID, uint(uid))
		if err != nil {
			c.JSON(
				consts.StatusOK,
				GetPostListResponse{
					StatusCode: errno.Error,
					Message:    err.Error(),
				},
			)
			return
		}
		returnPostList[idx] = PostService.ReturnPost{
			Post:      userPost,
			Reply:     data.Reply,
			LikeCount: data.LikeCount,
			Like:      data.Like,
		}
	}
	c.JSON(
		consts.StatusOK,
		GetPostListResponse{
			StatusCode: errno.SuccessCode,
			PostList:   returnPostList,
			HaveNext:   haveNext,
		},
	)
}

func GetUserLikedPost(ctx context.Context, c *app.RequestContext) {
	page := c.Query("page")
	userID := c.Query("user_id")
	userLikedPostList, err := UserService.GetUserLikedPost(userID, page)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			GetPostListResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	haveNext := false
	if len(*userLikedPostList) == constants.PostPageSize {
		haveNext = true
	}
	c.JSON(
		consts.StatusOK,
		GetPostListResponse{
			StatusCode: errno.SuccessCode,
			PostList:   *userLikedPostList,
			HaveNext:   haveNext,
		},
	)
}

func CreateReply(ctx context.Context, c *app.RequestContext) {
	var req CreateReplyRequest
	err := c.Bind(&req)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			CreateReplyResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	reply, err := PostService.CreateReplyService(req.UserID, req.ParentID, req.ReplyTo, req.Content)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			CreateReplyResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		CreateReplyResponse{
			StatusCode: errno.SuccessCode,
			Reply:      *reply,
		},
	)
}

func GetReply(ctx context.Context, c *app.RequestContext) {
	page := c.Query("page")
	parentID := c.Query("parent_id")
	replyList, err := PostService.GetReply(parentID, page)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			GetReplyResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	haveNext := false
	if len(*replyList) == constants.PostPageSize {
		haveNext = true
	}
	c.JSON(
		consts.StatusOK,
		GetReplyResponse{
			StatusCode: errno.SuccessCode,
			ReplyList:  *replyList,
			HaveNext:   haveNext,
		},
	)
}

func SearchPostHandler(ctx context.Context, c *app.RequestContext) {
	page := c.Query("page")
	userID := c.Query("user_id")
	kws := c.Query("keywords")
	keywords := strings.Split(kws, " ")
	returnPostList, err := PostService.SearchPostService(userID, page, keywords)
	haveNext := false
	if len(*returnPostList) == constants.PostPageSize {
		haveNext = true
	}
	if err != nil {
		c.JSON(
			consts.StatusOK,
			GetPostListResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		GetPostListResponse{
			StatusCode: errno.SuccessCode,
			PostList:   *returnPostList,
			HaveNext:   haveNext,
		},
	)
}
