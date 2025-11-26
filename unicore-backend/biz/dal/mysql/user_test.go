package mysql

import (
	"fmt"
	"strconv"
	"testing"
	"unicore/pkg/constants"
)

func TestCreateUser(t *testing.T) {
	Init(constants.TestMySQLDSN)
	u := &User{
		UserName: "zjh",
		Email:    "jhz.travis@outlook.com",
		Password: "277879201aA",
	}
	userID, err := CreateUser(u)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf(strconv.FormatInt(int64(userID), 10))
}
