package utils

import (
	"fmt"
	"testing"
)

func TestGetNickName(t *testing.T) {
	for i := 0; i < 27; i++ {
		fmt.Println(GenNickName(i))
	}
}
