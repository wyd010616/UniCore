package mysql

import (
	"fmt"
	"testing"
	"unicore/pkg/constants"
)

func TestCheckLike(t *testing.T) {
	Init(constants.TestMySQLDSN)
	userID := uint(1000)
	postID := uint(2000)
	check, err := CheckLikeExist(userID, postID)
	if err != nil {
		panic(err)
	}
	fmt.Println(check)
}
