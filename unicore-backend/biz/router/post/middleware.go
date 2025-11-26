package post

import (
	"github.com/cloudwego/hertz/pkg/app"
	"unicore/biz/mw"
)

func mwFunc() []app.HandlerFunc {
	return []app.HandlerFunc{
		mw.JwtMiddleware.MiddlewareFunc(),
	}

}
