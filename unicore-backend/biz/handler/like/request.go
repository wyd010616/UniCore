package like

type LikeRequest struct {
	UserID string `json:"user_id"`
	PostID string `json:"post_id"`
}

type LikeResponse struct {
	StatusCode int32  `json:"status_code"`
	Message    string `json:"message"`
}
