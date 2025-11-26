package mysql

import (
	"gorm.io/gorm"
	"unicore/pkg/constants"
	"unicore/pkg/utils"
)

type User struct {
	gorm.Model
	UserName string `json:"user_name"`
	Password string `json:"password"`
	Email    string `json:"email"`
	School   int16  `json:"school"`
	Avatar   string `json:"avatar"`
}

func (User) TableName() string {
	return constants.UserTableName
}

func CreateUser(user *User) (uint, error) {
	err := DB.Create(user).Error
	if err != nil {
		return 0, err
	}
	return user.ID, nil
}

func CheckUser(email, password string) (*User, error) {
	var userList []User
	err := DB.Where("email = ? AND password = ?", email, utils.HashPassword(password)).Find(&userList).Error
	if err != nil {
		return nil, err
	}
	if len(userList) == 0 {
		return nil, nil
	}
	return &(userList[0]), nil
}

func GetUserByEmail(email string) (*User, error) {
	var userList []User
	err := DB.Where("email = ?", email).Find(&userList).Error
	if err != nil {
		return nil, err
	}
	if len(userList) == 0 {
		return nil, nil
	}
	return &(userList[0]), nil
}

func GetUserByID(userID uint) (*User, error) {
	var userList []User
	err := DB.Where("id = ?", userID).Find(&userList).Error
	if err != nil {
		return nil, err
	}
	if len(userList) == 0 {
		return nil, nil
	}
	return &(userList[0]), nil
}

func ChangePwd(user *User, newPwd string) error {
	err := DB.Model(&User{}).Where("id = ?", user.ID).Update("password", newPwd).Error
	if err != nil {
		return err
	}
	return nil
}
