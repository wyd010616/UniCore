package dal

import (
	"unicore/biz/dal/mysql"
	"unicore/pkg/constants"
)

func Init() {
	mysql.Init(constants.MySQLDSN)
	//redis.Init()
}
