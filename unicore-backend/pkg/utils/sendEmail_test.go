package utils

import (
	"fmt"
	"testing"
)

func TestGenerateCode(t *testing.T) {
	fmt.Println(GenerateRandomCode())
}

func TestSendValidationEmail(t *testing.T) {
	res := SendValidationEmail("j423zhan@uwaterloo.ca", GenerateRandomCode())
	if res != nil {
		panic(res)
	}
}
