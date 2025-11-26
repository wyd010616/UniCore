package mysql

import (
	"fmt"
	"testing"
	"unicore/pkg/constants"
)

func TestGenNickName(t *testing.T) {
	Init(constants.TestMySQLDSN)
	parentID := uint(1)
	for j := 0; j < 2; j++ {
		for i := 0; i < 5; i++ {
			userID := uint(i)
			nickname, err := GetNickName(parentID, userID)
			if err != nil {
				panic(err)
			}
			fmt.Println(fmt.Sprintf("ParentID : %d, UserID: %d, Nickname: %s", parentID, userID, nickname))
		}
	}
}
