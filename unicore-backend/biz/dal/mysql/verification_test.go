package mysql

import (
	"fmt"
	"testing"
	"time"
	"unicore/pkg/constants"
	"unicore/pkg/utils"
)

func TestCreateRVC(t *testing.T) {
	Init(constants.TestMySQLDSN)
	email := "j423zhan@uwaterloo.ca"
	code := utils.GenerateRandomCode()
	err := NewRegVerCode(email, code, utils.GetExpireTime(time.Hour))
	if err != nil {
		panic(err)
	}
	check, err := CheckCode(email, code)
	if err != nil {
		panic(err)
	}
	fmt.Println(check)
}
