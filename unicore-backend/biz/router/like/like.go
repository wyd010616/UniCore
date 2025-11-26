package like

import (
	"github.com/cloudwego/hertz/pkg/app/server"
	LikeHandler "unicore/biz/handler/like"
)

func Register(r *server.Hertz) {
	_like := r.Group("/like")
	{
		_add := _like.Group("/add")
		_add.POST("", LikeHandler.AddLikeHandler)
	}
	{
		_delete := _like.Group("/delete")
		_delete.POST("", LikeHandler.DeleteLikeHandler)
	}
}
