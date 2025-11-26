package utils

import (
	"fmt"
	"testing"
	"time"
)

func TestGetTime(t *testing.T) {
	fmt.Println(GetCurrentTime())
}

func TestCheckExpired(t *testing.T) {
	tim := GetExpireTime(time.Hour)
	fmt.Println(CheckExpired(tim))
}
