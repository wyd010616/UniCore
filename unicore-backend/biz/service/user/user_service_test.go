package user

import (
	"errors"
	"testing"
	"unicore/biz/dal/mysql"
)

func TestRegisterService(t *testing.T) {
	email := "test@example.com"
	verificationCode := "wrongcode"
	userName := "testuser"
	password := "testpass"
	got, err := RegisterService(email, verificationCode, userName, password)
	if err == nil {
		t.Errorf("RegisterService() = %v, want error", got)
	}
}

func TestChangePasswordService(t *testing.T) {
	var mockUser = &mysql.User{Email: "test@example.com", Password: "hashedPassword"}
	tests := []struct {
		name         string
		email        string
		newPwd       string
		curPwd       string
		mockUser     *mysql.User
		mockError    error
		wantErr      bool
		errorMessage string
	}{
		{
			name:         "Email not registered",
			email:        "unregistered@example.com",
			newPwd:       "newPassword",
			curPwd:       "currentPassword",
			mockUser:     nil,
			mockError:    errors.New("Email not registered"),
			wantErr:      true,
			errorMessage: "Email not registered",
		},
		{
			name:         "Wrong current password",
			email:        "test@example.com",
			newPwd:       "newPassword",
			curPwd:       "wrongCurrentPassword",
			mockUser:     nil, // Suppose CheckUser returns nil for wrong password
			mockError:    errors.New("Wrong password"),
			wantErr:      true,
			errorMessage: "Wrong password",
		},
		{
			name:         "Successful password change",
			email:        "test@example.com",
			newPwd:       "newPassword",
			curPwd:       "currentPassword",
			mockUser:     mockUser,
			mockError:    nil,
			wantErr:      false,
			errorMessage: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			err := ChangePasswordService(tt.email, tt.newPwd, tt.curPwd)

			if (err != nil) != tt.wantErr {
				t.Errorf("ChangePasswordService() error = %v, wantErr %v", err, tt.wantErr)
			} else if err != nil && err.Error() != tt.errorMessage {
				t.Errorf("ChangePasswordService() error = %v, want %v", err, tt.errorMessage)
			}
		})
	}
}

func TestUserInfoService(t *testing.T) {
	tests := []struct {
		name         string
		email        string
		mockUser     *mysql.User // 假设这是返回的用户对象
		wantErr      bool
		errorMessage string
	}{
		{
			name:         "User not found",
			email:        "missing@example.com",
			mockUser:     nil,
			wantErr:      true,
			errorMessage: "No such user found!",
		},
		{
			name:  "Successful user info retrieval",
			email: "existing@example.com",
			mockUser: &mysql.User{
				UserName: "TestUser",
				School:   "TestSchool",
				Email:    "existing@example.com",
			},
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// 设置模拟数据库行为

			got, err := UserInfoService(tt.email)

			if (err != nil) != tt.wantErr {
				t.Fatalf("UserInfoService() error = %v, wantErr %v", err, tt.wantErr)
			}
			if err != nil && err.Error() != tt.errorMessage {
				t.Errorf("UserInfoService() error = %v, wantErr %v", err, tt.errorMessage)
			}
			if err == nil && (got == nil || got.Email != tt.email) {
				t.Errorf("UserInfoService() got = %v, want %v", got, tt.mockUser)
			}
		})
	}
}
