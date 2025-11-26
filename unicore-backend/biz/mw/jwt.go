package mw

import (
	"context"
	"errors"
	"github.com/cloudwego/hertz/pkg/app"
	"github.com/cloudwego/hertz/pkg/common/hlog"
	"github.com/cloudwego/hertz/pkg/common/utils"
	"github.com/hertz-contrib/jwt"
	"net/http"
	"time"
	"unicore/biz/dal/mysql"
	UserService "unicore/biz/service/user"
	"unicore/pkg/constants"
	"unicore/pkg/errno"
)

var (
	JwtMiddleware *jwt.HertzJWTMiddleware
	IdentityKey   = "email"
)

type loginStruct struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func InitJwt() {
	var err error
	JwtMiddleware, err = jwt.New(&jwt.HertzJWTMiddleware{
		Realm:         "test zone",
		Key:           []byte(constants.JWTSecretKey),
		Timeout:       time.Hour,
		MaxRefresh:    time.Hour,
		TokenLookup:   "header: Authorization, query: token, cookie: jwt",
		TokenHeadName: "Bearer",
		LoginResponse: func(ctx context.Context, c *app.RequestContext, code int, token string, expire time.Time) {
			var ls loginStruct
			if err := c.Bind(&ls); err != nil {
				c.JSON(http.StatusOK, utils.H{
					"status_code": errno.Error,
					"message":     err.Error(),
				})
				return
			}
			var statusCode = 1
			if code == http.StatusOK {
				statusCode = 0
			}
			userInfo, err := UserService.UserInfoService(ls.Email)
			if err != nil {
				c.JSON(http.StatusOK, utils.H{
					"status_code": errno.Error,
					"message":     err.Error(),
				})
				return
			}
			c.JSON(http.StatusOK, utils.H{
				"status_code": statusCode,
				"token":       token,
				"expire":      expire.Format(time.RFC3339),
				"message":     "success",
				"user":        *userInfo,
			})
		},
		Authenticator: func(ctx context.Context, c *app.RequestContext) (interface{}, error) {
			var ls loginStruct
			if err := c.Bind(&ls); err != nil {
				return nil, err
			}
			user, err := mysql.GetUserByEmail(ls.Email)
			if err != nil {
				return nil, err
			}
			if user == nil {
				return nil, errors.New("Email not registered")
			}
			user, err = mysql.CheckUser(ls.Email, ls.Password)
			if err != nil {
				return nil, err
			}
			if user == nil {
				return nil, errors.New("Wrong password")
			}
			return &mysql.User{
				Email: user.Email,
			}, nil
		},
		IdentityKey: IdentityKey,
		IdentityHandler: func(ctx context.Context, c *app.RequestContext) interface{} {
			claims := jwt.ExtractClaims(ctx, c)
			return &mysql.User{
				Email: claims[IdentityKey].(string),
			}
		},
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*mysql.User); ok {
				return jwt.MapClaims{
					IdentityKey: v.Email,
				}
			}
			return jwt.MapClaims{}
		},
		HTTPStatusMessageFunc: func(e error, ctx context.Context, c *app.RequestContext) string {
			hlog.CtxErrorf(ctx, "jwt biz err = %+v", e.Error())
			return e.Error()
		},
		Unauthorized: func(ctx context.Context, c *app.RequestContext, code int, message string) {
			var statusCode = 1
			if code == http.StatusOK {
				statusCode = 0
			}
			c.JSON(http.StatusOK, utils.H{
				"status_code": statusCode,
				"message":     message,
			})
		},
	})
	if err != nil {
		panic(err)
	}
}
