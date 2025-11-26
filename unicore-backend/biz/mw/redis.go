package mw

import (
	"github.com/go-redis/redis/v7"

	"unicore/pkg/constants"
)

var (
	//expireTime  = time.Hour * 1
	rdb *redis.Client
)

func Init() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     constants.RedisAddr,
		Password: constants.RedisPassword,
		DB:       0,
	})
}
