package post

import (
	PostService "unicore/biz/service/post"
)

type CreatePostRequest struct {
	Content   string `json:"content"`
	CreatorID string `json:"user_id"`
	Type      string `json:"type"`
}

type CreatePostResponse struct {
	StatusCode int32                  `json:"status_code"`
	Message    string                 `json:"message"`
	Post       PostService.ReturnPost `json:"post"`
}

type GetPostDetailResponse struct {
	StatusCode int32                  `json:"status_code"`
	Message    string                 `json:"message"`
	Post       PostService.ReturnPost `json:"post"`
}

type GetPostListResponse struct {
	StatusCode int32                    `json:"status_code"`
	Message    string                   `json:"message"`
	PostList   []PostService.ReturnPost `json:"post_list"`
	HaveNext   bool                     `json:"have_next"`
}

type CreateReplyRequest struct {
	UserID   string `json:"user_id"`
	ParentID string `json:"parent_id"`
	Content  string `json:"content"`
	ReplyTo  string `json:"reply_to"`
}

type CreateReplyResponse struct {
	StatusCode int                     `json:"status_code"`
	Message    string                  `json:"message"`
	Reply      PostService.ReturnReply `json:"reply"`
}

type GetReplyResponse struct {
	StatusCode int                       `json:"status_code"`
	Message    string                    `json:"message"`
	ReplyList  []PostService.ReturnReply `json:"repl_list"`
	HaveNext   bool                      `json:"have_next"`
}
