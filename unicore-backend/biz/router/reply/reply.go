package reply

import (
	"github.com/cloudwego/hertz/pkg/app/server"
	PostHandler "unicore/biz/handler/post"
)

func Register(r *server.Hertz) {
	_reply := r.Group("/reply")
	{
		_create := _reply.Group("/create")
		_create.POST("", PostHandler.CreateReply)
	}
	{
		_get := _reply.Group("/get")
		_get.GET("", PostHandler.GetReply)
	}
}
