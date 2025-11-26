package user

import (
	"context"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/protocol/consts"
	UserService "unicore/biz/service/user"
	"unicore/pkg/errno"
)

func UserRegister(ctx context.Context, c *app.RequestContext) {
	var req RegisterRequest
	err := c.Bind(&req)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			RegisterResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	user, err := UserService.RegisterService(req.Email, req.VerificationCode, req.UserName, req.Password)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			RegisterResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		RegisterResponse{
			StatusCode: errno.SuccessCode,
			User:       *user,
		},
	)
}

func VerifyEmail(ctx context.Context, c *app.RequestContext) {
	var req VerifyEmailRequest
	err := c.Bind(&req)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			VerifyEmailResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	err = UserService.VerifyEmailService(req.Email)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			VerifyEmailResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		VerifyEmailResponse{
			StatusCode: errno.SuccessCode,
			Message:    "Success",
		},
	)
	return
}

func GetUserInfo(ctx context.Context, c *app.RequestContext) {
	email := c.Query("email")
	user, err := UserService.UserInfoService(email)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			GetUserInfoResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		GetUserInfoResponse{
			StatusCode: errno.SuccessCode,
			Message:    "Success",
			User:       *user,
		},
	)
}

func ChangePassword(ctx context.Context, c *app.RequestContext) {
	var req ChangePasswordRequest
	err := c.Bind(&req)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			ChangePasswordResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	err = UserService.ChangePasswordService(req.Email, req.NewPassword, req.CurrentPassword)
	if err != nil {
		c.JSON(
			consts.StatusOK,
			ChangePasswordResponse{
				StatusCode: errno.Error,
				Message:    err.Error(),
			},
		)
		return
	}
	c.JSON(
		consts.StatusOK,
		ChangePasswordResponse{
			StatusCode: errno.SuccessCode,
		},
	)
}
