package mysql

import (
	"errors"
	"fmt"
	"gorm.io/gorm"
	"unicore/pkg/constants"
)

type Post struct {
	gorm.Model
	CreatorID  uint   `json:"creator_id"`
	Content    string `json:"content"`
	CreateTime string `json:"create_time"`
	School     int16  `json:"school"`
	NickName   string `json:"nick_name"`
	Type       int8   `json:"type"`
	ReplyTo    uint   `json:"reply_to"`
	ParentID   uint   `json:"parent_id"`
}

func (Post) TableName() string {
	return constants.PostTableName
}

func CreatePost(post *Post) (uint, error) {
	err := DB.Create(post).Error
	if err != nil {
		return 0, err
	}
	return post.ID, nil
}

func GetPostDetailByID(postID uint) (*Post, error) {
	var postList []Post
	err := DB.Where("id = ?", postID).Find(&postList).Error
	if err != nil {
		return nil, err
	}
	if len(postList) == 0 {
		return nil, errors.New(fmt.Sprintf("No post found with id %d", postID))
	}
	return &postList[0], nil
}

func GetSchoolPost(school int16, page int) (*[]Post, error) {
	var postList []Post
	err := DB.Where("school = ? AND type = ? AND reply_to = ?", school, constants.PostTypeSchool, constants.NoReplyTo).
		Order("create_time desc").
		Limit(constants.PostPageSize).
		Offset((page - 1) * constants.PostPageSize).
		Find(&postList).Error
	if err != nil {
		return nil, err
	}
	return &postList, nil
}

func GetPublicPost(page int) (*[]Post, error) {
	var postList []Post
	err := DB.Where("type = ? AND reply_to = ?", constants.PostTypePublic, constants.NoReplyTo).
		Order("create_time desc").
		Limit(constants.PostPageSize).
		Offset((page - 1) * constants.PostPageSize).
		Find(&postList).Error
	if err != nil {
		return nil, err
	}
	return &postList, nil
}

func CountReply(postID uint) (int, error) {
	var postList []Post
	err := DB.Where("parent_id = ?", postID).Find(&postList).Error
	if err != nil {
		return -1, err
	}
	return len(postList), nil
}

func CountUserPost(userID uint) (int, error) {
	var postList []Post
	err := DB.Where("creator_id = ?", userID).Find(&postList).Error
	if err != nil {
		return -1, err
	}
	return len(postList), nil
}

func CreateReply(post *Post) error {
	err := DB.Create(post).Error
	if err != nil {
		return err
	}
	return nil
}

func GetReplyByParentID(parentID uint, page int) (*[]Post, error) {
	var postList []Post
	err := DB.Where("parent_id = ?", parentID).
		Order("create_time ASC").
		Limit(constants.ReplyPageSize).
		Offset((page - 1) * constants.ReplyPageSize).
		Find(&postList).Error
	if err != nil {
		return nil, err
	}
	return &postList, nil
}

func GetPostByCreatorID(creatorID uint, page int) (*[]Post, error) {
	var postList []Post
	err := DB.Where("creator_id = ?", creatorID).
		Order("create_time desc").
		Limit(constants.ReplyPageSize).
		Offset((page - 1) * constants.ReplyPageSize).
		Find(&postList).Error
	if err != nil {
		return nil, err
	}
	return &postList, nil
}

func SearchPublic(keywordList []string, page int) (*[]Post, error) {
	query := DB.Model(&Post{})
	for i, keyword := range keywordList {
		if i > 0 {
			query = query.Or("content LIKE ?", "%"+keyword+"%")
		} else {
			query = query.Where("type = ? AND content LIKE ?", constants.PostTypePublic, "%"+keyword+"%")
		}
	}
	var postList []Post
	err := query.Order("create_time desc").
		Limit(constants.ReplyPageSize).
		Offset((page - 1) * constants.ReplyPageSize).
		Find(&postList).Error
	if err != nil {
		return nil, err
	}
	return &postList, nil
}

func SearchSchool(keywordList []string, page int, school int16) (*[]Post, error) {
	query := DB.Model(&Post{})
	for i, keyword := range keywordList {
		if i > 0 {
			query = query.Or("name LIKE ?", "%"+keyword+"%")
		} else {
			query = query.Where("type = ? AND school = ? AND name LIKE ?", constants.PostTypePublic, school, "%"+keyword+"%")
		}
	}
	var postList []Post
	err := query.Order("create_time desc").
		Limit(constants.ReplyPageSize).
		Offset((page - 1) * constants.ReplyPageSize).
		Find(&postList).Error
	if err != nil {
		return nil, err
	}
	return &postList, nil
}
