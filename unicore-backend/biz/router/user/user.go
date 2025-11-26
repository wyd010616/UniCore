package user

import (
	"github.com/cloudwego/hertz/pkg/app/server"
	UserHandler "unicore/biz/handler/user"
	"unicore/biz/mw"
)

func Register(r *server.Hertz) {
	_user := r.Group("/user")
	{
		_register := _user.Group("/register")
		_register.POST("", UserHandler.UserRegister)
	}
	{
		_verify := _user.Group("/verify")
		_verify.POST("", UserHandler.VerifyEmail)
	}
	{
		_info := _user.Group("/info")
		_info.GET("", UserHandler.GetUserInfo)
	}
	{
		_login := _user.Group("/login")
		_login.POST("", mw.JwtMiddleware.LoginHandler)
	}
	{
		_chPwd := _user.Group("/chpwd")
		_chPwd.POST("", UserHandler.ChangePassword)
	}
}
