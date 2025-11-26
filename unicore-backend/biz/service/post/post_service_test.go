package post

import (
	"testing"
	"unicore/biz/dal/mysql"
)

func TestCreatePostService(t *testing.T) {
	var mockUser = &mysql.User{
		School: "Test School",
	}
}
	tests := []struct {
		name        string
		creatorID   uint
		content     string
		postType    int
		wantErr     bool
	}{
		{
			name:      "User does not exist",
			creatorID: 0, // 假设0为不存在的用户ID
			content:   "Test Content",
			postType:  1,
			wantErr:   true,
		},
		{
			name:      "Successful post creation",
			creatorID: mockUser.ID,
			content:   "Test Content",
			postType:  1,
			wantErr:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// 在这里设置你的模拟数据库调用
			got, err := CreatePostService(tt.creatorID, tt.content, tt.postType)
			if (err != nil) != tt.wantErr {
				t.Errorf("CreatePostService() error = %v, wantErr %v", err, tt.wantErr)
			}
			if !tt.wantErr && got == nil {
				t.Errorf("Expected non-nil post object on successful creation")
			}
		})
	}
}

