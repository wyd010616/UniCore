package post

import (
	"github.com/cloudwego/hertz/pkg/app/server"
	PostHandler "unicore/biz/handler/post"
)

func Register(r *server.Hertz) {
	_post := r.Group("/post")
	{
		_create := _post.Group("/create")
		_create.POST("", PostHandler.CreatePost)
	}
	{
		_detail := _post.Group("/detail")
		_detail.GET("", PostHandler.GetPostDetail)
	}
	{
		_school := _post.Group("/school")
		_school.GET("", PostHandler.GetSchoolPost)
	}
	{
		_public := _post.Group("/public")
		_public.GET("", PostHandler.GetPublicPost)
	}
	{
		_user := _post.Group("/user")
		_user.GET("", PostHandler.GetUserPost)
	}
	{
		_like := _post.Group("/like")
		_like.GET("", PostHandler.GetUserLikedPost)
	}
	{
		_like := _post.Group("/search")
		_like.GET("", PostHandler.SearchPostHandler)
	}
}
