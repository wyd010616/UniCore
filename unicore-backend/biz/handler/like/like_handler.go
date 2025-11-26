package like

import (
	"context"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
	LikeService "unicore/biz/service/like"
	"unicore/pkg/errno"
)

func AddLikeHandler(ctx context.Context, c *app.RequestContext) {
	var req LikeRequest
	err := c.Bind(&req)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			LikeResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	err = LikeService.AddLikeService(req.UserID, req.PostID)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			LikeResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		LikeResponse{
			StatusCode: errno.SuccessCode,
		},
	)
}

func DeleteLikeHandler(ctx context.Context, c *app.RequestContext) {
	var req LikeRequest
	err := c.Bind(&req)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			LikeResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	err = LikeService.DeleteLikeService(req.UserID, req.PostID)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			LikeResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		LikeResponse{
			StatusCode: errno.SuccessCode,
		},
	)
}
