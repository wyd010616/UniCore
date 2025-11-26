package utils

import (
	"time"
	"unicore/pkg/constants"
)

func GetCurrentTime() string {
	now := time.Now()
	location, err := time.LoadLocation(constants.TimeZone)
	if err != nil {
		panic(err)
	}
	curTime := now.In(location)
	return curTime.Format("2006-01-02 15:04:05")
}

func GetExpireTime(duration time.Duration) string {
	now := time.Now()
	location, err := time.LoadLocation(constants.TimeZone)
	if err != nil {
		panic(err)
	}
	curTime := now.In(location)
	expireTime := curTime.Add(duration)
	return expireTime.Format("2006-01-02 15:04:05")
}

func CheckExpired(expireTime string) bool {
	now := GetCurrentTime()
	return expireTime < now
}
