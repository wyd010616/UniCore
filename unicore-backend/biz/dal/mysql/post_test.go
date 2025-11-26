package mysql

import (
	"fmt"
	"testing"
	"unicore/pkg/constants"
	"unicore/pkg/utils"
)

func TestCreateReply(t *testing.T) {
	Init(constants.TestMySQLDSN)
	reply := &Post{
		CreatorID:  uint(1),
		ParentID:   uint(1),
		ReplyTo:    uint(1),
		School:     int16(1),
		NickName:   "hhh",
		Content:    "content",
		CreateTime: utils.GetCurrentTime(),
	}
	err := DB.Create(reply).Error
	if err != nil {
		panic(err)
	}
	fmt.Println(fmt.Sprintf("%+v", reply))
}
