package post

import (
	"errors"
	"strconv"
	"unicore/biz/dal/mysql"
	"unicore/pkg/constants"
	"unicore/pkg/utils"
)

type ReturnPost struct {
	mysql.Post
	Reply     int  `json:"reply"`
	LikeCount int  `json:"like_count"`
	Like      bool `json:"like"`
}

func CreatePostService(creatorID uint, content string, postType int) (*mysql.Post, error) {
	user, err := mysql.GetUserByID(creatorID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, nil
	}
	school := user.School
	post := &mysql.Post{
		CreatorID:  creatorID,
		Content:    content,
		Type:       int8(postType),
		School:     school,
		NickName:   constants.PostOwnerNickName,
		CreateTime: utils.GetCurrentTime(),
	}
	_, err = mysql.CreatePost(post)
	if err != nil {
		return nil, err
	}
	_, err = mysql.GetNickName(post.ID, creatorID)
	if err != nil {
		return nil, err
	}
	return post, nil
}

type Data struct {
	Reply     int
	LikeCount int
	Like      bool
}

func GetStatisticData(postID, userID uint) (*Data, error) {
	reply, err := mysql.CountReply(postID)
	if err != nil {
		return nil, err
	}
	likeCount, err := mysql.CountPostLike(postID)
	if err != nil {
		return nil, err
	}
	user, err := mysql.GetUserByID(userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("No such user")
	}
	like, err := mysql.CheckLikeExist(userID, postID)
	if err != nil {
		return nil, err
	}
	return &Data{
		Reply:     reply,
		LikeCount: likeCount,
		Like:      like,
	}, nil
}

func CreateReplyService(UserID, ParentID, ReplyTo, Content string) (*ReturnReply, error) {
	userID, err := strconv.ParseUint(UserID, 10, 64)
	if err != nil {
		return nil, err
	}
	parentID, err := strconv.ParseUint(ParentID, 10, 64)
	if err != nil {
		return nil, err
	}
	post, err := mysql.GetPostDetailByID(uint(parentID))
	if err != nil {
		return nil, err
	}
	replyToID, err := strconv.ParseUint(ReplyTo, 10, 64)
	if err != nil {
		return nil, err
	}
	nickName, err := mysql.GetNickName(uint(parentID), uint(userID))
	if err != nil {
		return nil, err
	}
	user, err := mysql.GetUserByID(uint(userID))
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("No such user")
	}
	reply := &mysql.Post{
		CreatorID:  uint(userID),
		ParentID:   uint(parentID),
		ReplyTo:    uint(replyToID),
		School:     user.School,
		Type:       post.Type,
		NickName:   nickName,
		Content:    Content,
		CreateTime: utils.GetCurrentTime(),
	}
	err = mysql.CreateReply(reply)
	if err != nil {
		return nil, err
	}
	replyTo, err := mysql.GetPostDetailByID(uint(replyToID))
	if err != nil {
		return nil, err
	}
	returnReply := &ReturnReply{
		Post:            *reply,
		ReplyToContent:  replyTo.Content,
		ReplyToNickName: replyTo.NickName,
		ReplyToUserID:   replyTo.CreatorID,
	}
	return returnReply, nil
}

type ReturnReply struct {
	mysql.Post
	ReplyToContent  string `json:"reply_to_content"`
	ReplyToNickName string `json:"reply_to_nick_name"`
	ReplyToUserID   uint   `json:"reply_to_user_id"`
}

func GetUserPostedPost(id, p string) (*[]mysql.Post, error) {
	creatorID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return nil, err
	}
	page, err := strconv.Atoi(p)
	if err != nil {
		return nil, err
	}
	postList, err := mysql.GetPostByCreatorID(uint(creatorID), page)
	if err != nil {
		return nil, err
	}
	return postList, nil
}

func GetReply(id, p string) (*[]ReturnReply, error) {
	parentID, err := strconv.ParseUint(id, 10, 32)
	if err != nil {
		return nil, err
	}
	page, err := strconv.Atoi(p)
	if err != nil {
		return nil, err
	}
	postList, err := mysql.GetReplyByParentID(uint(parentID), page)
	if err != nil {
		return nil, err
	}
	retReplyList := make([]ReturnReply, len(*postList))
	for idx, post := range *postList {
		replyTo, err := mysql.GetPostDetailByID(post.ReplyTo)
		if err != nil {
			return nil, err
		}
		retReplyList[idx] = ReturnReply{
			Post:            post,
			ReplyToUserID:   replyTo.CreatorID,
			ReplyToNickName: replyTo.NickName,
			ReplyToContent:  replyTo.Content,
		}
	}
	return &retReplyList, nil
}

func GetSchoolPostService(uid, p string) (*[]ReturnPost, error) {
	userID, err := strconv.ParseUint(uid, 10, 32)
	if err != nil {
		return nil, err
	}
	user, err := mysql.GetUserByID(uint(userID))
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("No such user")
	}
	page, err := strconv.Atoi(p)
	if err != nil {
		return nil, err
	}
	postList, err := mysql.GetSchoolPost(user.School, page)
	if err != nil {
		return nil, err
	}
	returnPostList := make([]ReturnPost, len(*postList))
	for idx, post := range *postList {
		data, err := GetStatisticData(post.ID, uint(userID))
		if err != nil {
			return nil, err
		}
		returnPostList[idx] = ReturnPost{
			Post:      post,
			Reply:     data.Reply,
			LikeCount: data.LikeCount,
			Like:      data.Like,
		}
	}
	return &returnPostList, nil
}

func GetPublicPostService(uid, p string) (*[]ReturnPost, error) {
	userID, err := strconv.ParseUint(uid, 10, 32)
	if err != nil {
		return nil, err
	}
	user, err := mysql.GetUserByID(uint(userID))
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("No such user")
	}
	page, err := strconv.Atoi(p)
	if err != nil {
		return nil, err
	}
	postList, err := mysql.GetPublicPost(page)
	if err != nil {
		return nil, err
	}
	returnPostList := make([]ReturnPost, len(*postList))
	for idx, post := range *postList {
		data, err := GetStatisticData(post.ID, uint(userID))
		if err != nil {
			return nil, err
		}
		returnPostList[idx] = ReturnPost{
			Post:      post,
			Reply:     data.Reply,
			LikeCount: data.LikeCount,
			Like:      data.Like,
		}
	}
	return &returnPostList, nil
}

func SearchPostService(uid, p string, keywords []string) (*[]ReturnPost, error) {
	userID, err := strconv.ParseUint(uid, 10, 32)
	if err != nil {
		return nil, err
	}
	user, err := mysql.GetUserByID(uint(userID))
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("No such user")
	}
	page, err := strconv.Atoi(p)
	if err != nil {
		return nil, err
	}
	//schoolPostList, err := mysql.SearchSchool(keywords, page, user.School)
	publicPostList, err := mysql.SearchPublic(keywords, page)
	returnPostList := make([]ReturnPost, len(*publicPostList))
	for idx, post := range *publicPostList {
		data, err := GetStatisticData(post.ID, user.ID)
		if err != nil {
			return nil, err
		}
		returnPostList[idx] = ReturnPost{
			Post:      post,
			Like:      data.Like,
			LikeCount: data.LikeCount,
			Reply:     data.Reply,
		}
	}
	return &returnPostList, nil
}
