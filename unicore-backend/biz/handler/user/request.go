package user

import (
	UserService "unicore/biz/service/user"
)

type RegisterRequest struct {
	Email            string `json:"email"`
	UserName         string `json:"username"`
	Password         string `json:"password"`
	VerificationCode string `json:"ver_code"`
}

type RegisterResponse struct {
	StatusCode int                    `json:"status_code"`
	Message    string                 `json:"message"`
	User       UserService.ReturnUser `json:"user"`
}

type VerifyEmailRequest struct {
	Email string `json:"email"`
}

type VerifyEmailResponse struct {
	StatusCode int    `json:"status_code"`
	Message    string `jons:"message"`
}

type GetUserInfoResponse struct {
	StatusCode int                    `json:"status_code"`
	Message    string                 `json:"message"`
	User       UserService.ReturnUser `json:"user"`
}

type ChangePasswordRequest struct {
	Email           string `json:"email"`
	CurrentPassword string `json:"cur_pwd"`
	NewPassword     string `json:"new_pwd"`
}

type ChangePasswordResponse struct {
	StatusCode int    `json:"status_code"`
	Message    string `jons:"message"`
}
