package router

import (
	"github.com/cloudwego/hertz/pkg/app/server"
	"unicore/biz/mw"
	"unicore/biz/router/like"
	"unicore/biz/router/post"
	"unicore/biz/router/reply"
	"unicore/biz/router/user"
)

func RegisterRouters(r *server.Hertz) {
	user.Register(r)
	post.Register(r)
	reply.Register(r)
	like.Register(r)
	registerJWT(r)
}

func registerJWT(r *server.Hertz) {
	auth := r.Group("/auth")
	{
		auth.GET("/refresh_token", mw.JwtMiddleware.RefreshHandler)
	}
}
