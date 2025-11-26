package mysql

import "unicore/pkg/constants"

type Like struct {
	LikeID     uint   `json:"like_id"`
	FromUserID uint   `json:"from_user_id"`
	PostID     uint   `json:"post_id"`
	CreateTime string `json:"create_time"`
}

func (Like) TableName() string {
	return constants.LikeTableName
}

func AddLike(like *Like) error {
	err := DB.Create(like).Error
	if err != nil {
		return err
	}
	return nil
}

func DeleteLike(like *Like) error {
	err := DB.Where("post_id = ? AND from_user_id = ?", like.PostID, like.FromUserID).Delete(like).Error
	if err != nil {
		return err
	}
	return nil
}

func GetLikeByUser(userID uint, page int) (*[]Like, error) {
	var likeList []Like
	err := DB.Where("from_user_id = ?", userID).
		Order("create_time desc").
		Limit(constants.ReplyPageSize).
		Offset((page - 1) * constants.ReplyPageSize).
		Find(&likeList).Error
	if err != nil {
		return nil, err
	}
	return &likeList, nil
}

func CheckLikeExist(userID, postID uint) (bool, error) {
	var likeList []Like
	err := DB.Where("post_id = ? AND from_user_id = ?", postID, userID).Find(&likeList).Error
	if err != nil {
		return false, err
	}
	if len(likeList) == 0 {
		return false, nil
	}
	return true, nil
}

func CountPostLike(postID uint) (int, error) {
	var likeList []Like
	err := DB.Where("post_id = ?", postID).Find(&likeList).Error
	if err != nil {
		return -1, err
	}
	return len(likeList), nil
}

func CountUserLike(userID uint) (int, error) {
	var likeList []Like
	err := DB.Where("from_user_id = ?", userID).Find(&likeList).Error
	if err != nil {
		return -1, err
	}
	return len(likeList), nil
}
