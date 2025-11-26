package utils

import (
	"fmt"
	"testing"
)

func TestGetSchool(t *testing.T) {
	school, _ := GetSchool("j423zhan@uwaterloo.ca")
	fmt.Println(school)
}
