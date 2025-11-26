package utils

import (
	"fmt"
	"testing"
)

func TestHash(t *testing.T) {
	fmt.Println(hash("hello"))
	fmt.Println(HashPassword("myPassword"))
}
