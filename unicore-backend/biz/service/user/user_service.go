package user

import (
	"errors"
	"fmt"
	"strconv"
	"time"
	"unicore/biz/dal/mysql"
	PostService "unicore/biz/service/post"
	"unicore/pkg/utils"
)

func RegisterService(email, verificationCode, userName, password string) (*ReturnUser, error) {
	check, err := mysql.CheckCode(email, verificationCode)
	if err != nil {
		return nil, err
	}
	if !check {
		return nil, errors.New("Verification code check failed")
	}
	school, err := utils.GetSchool(email)
	if err != nil {
		return nil, err
	}
	if school == -1 {
		return nil, errors.New("Invalid institution")
	}
	user := &mysql.User{
		Email:    email,
		UserName: userName,
		Password: utils.HashPassword(password),
		School:   int16(school),
	}
	_, err = mysql.CreateUser(user)
	if err != nil {
		return nil, err
	}
	retUser, err := UserInfoService(user.Email)
	if err != nil {
		return nil, err
	}
	return retUser, nil
}

func VerifyEmailService(email string) error {
	school, err := utils.GetSchool(email)
	if err != nil {
		return err
	}
	user, err := mysql.GetUserByEmail(email)
	if err != nil {
		return err
	}
	if user != nil {
		return errors.New("Email has been registered, if you forget your password, you change it with your email.")
	}
	if school == -1 {
		return errors.New("Invalid institution, please contact administor to add your school.")
	}
	expireTime := utils.GetExpireTime(time.Hour)
	veriCode := utils.GenerateRandomCode()
	err = mysql.NewRegVerCode(email, veriCode, expireTime)
	if err != nil {
		return err
	}
	err = utils.SendValidationEmail(email, veriCode)
	if err != nil {
		return err
	}
	return nil
}

type ReturnUser struct {
	UserID    uint   `json:"user_id"`
	UserName  string `json:"user_name"`
	School    int16  `json:"school"`
	Email     string `json:"email"`
	Avatar    string `json:"avatar"`
	PostCount int    `json:"post_count"`
	LikeCount int    `json:"like_count"`
}

func UserInfoService(email string) (*ReturnUser, error) {
	user, err := mysql.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("No such user found!")
	}
	likeCount, err := mysql.CountUserLike(user.ID)
	if err != nil {
		return nil, err
	}
	postCount, err := mysql.CountUserPost(user.ID)
	if err != nil {
		return nil, err
	}
	retUser := &ReturnUser{
		UserID:    user.ID,
		UserName:  user.UserName,
		School:    user.School,
		Email:     user.Email,
		LikeCount: likeCount,
		PostCount: postCount,
	}
	return retUser, nil
}

func GetUserLikedPost(id, p string) (*[]PostService.ReturnPost, error) {
	userID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return nil, err
	}
	page, err := strconv.Atoi(p)
	if err != nil {
		return nil, err
	}
	user, err := mysql.GetUserByID(uint(userID))
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New(fmt.Sprintf("No such user with id: %d", userID))
	}
	likeList, err := mysql.GetLikeByUser(uint(userID), page)
	if err != nil {
		return nil, err
	}
	postList := make([]PostService.ReturnPost, len(*likeList))
	for idx, like := range *likeList {
		post, err := mysql.GetPostDetailByID(like.PostID)
		if err != nil {
			return nil, err
		}
		data, err := PostService.GetStatisticData(post.ID, uint(userID))
		if err != nil {
			return nil, err
		}
		postList[idx] = PostService.ReturnPost{
			Post:      *post,
			Reply:     data.Reply,
			Like:      data.Like,
			LikeCount: data.LikeCount,
		}
	}
	return &postList, nil
}

func ChangePasswordService(email, newPwd, curPwd string) error {
	user, err := mysql.GetUserByEmail(email)
	if err != nil {
		return err
	}
	if user == nil {
		return errors.New("Email not registered")
	}
	user, err = mysql.CheckUser(email, curPwd)
	if err != nil {
		return err
	}
	if user == nil {
		return errors.New("Wrong password")
	}
	err = mysql.ChangePwd(user, utils.HashPassword(newPwd))
	return err
}
