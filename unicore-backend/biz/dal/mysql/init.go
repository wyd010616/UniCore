package mysql

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	gormopentracing "gorm.io/plugin/opentracing"
	"time"
)

var (
	DB          *gorm.DB
	MaxAttempts = 5
	TimeSleep   = 5
)

func Init(mysqlDSN string) {
	var err error
	for attemps := 0; attemps < MaxAttempts; attemps++ {
		DB, err = gorm.Open(mysql.Open(mysqlDSN),
			&gorm.Config{
				PrepareStmt:            true,
				SkipDefaultTransaction: true,
			},
		)
		if err == nil {
			break
		}
		time.Sleep(time.Duration(TimeSleep))
	}
	if err != nil {
		panic(err)
	}

	if err = DB.Use(gormopentracing.New()); err != nil {
		panic(err)
	}
}
