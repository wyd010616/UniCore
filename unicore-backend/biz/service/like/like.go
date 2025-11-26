package like

import (
	"errors"
	"strconv"
	"unicore/biz/dal/mysql"
	"unicore/pkg/utils"
)

func AddLikeService(uid, pid string) error {
	userID, err := strconv.ParseUint(uid, 10, 32)
	if err != nil {
		return err
	}
	postID, err := strconv.ParseUint(pid, 10, 32)
	if err != nil {
		return err
	}
	exist, err := mysql.CheckLikeExist(uint(userID), uint(postID))
	if err != nil {
		return err
	}
	if exist {
		return errors.New("Already like the post")
	}
	err = mysql.AddLike(
		&mysql.Like{
			FromUserID: uint(userID),
			PostID:     uint(postID),
			CreateTime: utils.GetCurrentTime(),
		},
	)
	if err != nil {
		return nil
	}
	return nil
}

func DeleteLikeService(uid, pid string) error {
	userID, err := strconv.ParseUint(uid, 10, 32)
	if err != nil {
		return err
	}
	postID, err := strconv.ParseUint(pid, 10, 32)
	if err != nil {
		return err
	}
	if err != nil {
		return err
	}
	exist, err := mysql.CheckLikeExist(uint(userID), uint(postID))
	if !exist {
		return errors.New("Not like the post yet")
	}
	err = mysql.DeleteLike(
		&mysql.Like{
			FromUserID: uint(userID),
			PostID:     uint(postID),
		},
	)
	if err != nil {
		return err
	}
	return nil
}
