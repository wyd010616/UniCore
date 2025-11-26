package utils

import (
	"errors"
	"strings"
	"unicore/pkg/constants"
)

var (
	schoolMap = map[string]int{
		"uwaterloo.ca":   constants.UW,
		"utoronto.ca":    constants.UofT,
		"student.ubc.ca": constants.UBC,
		"mcgill.ca":      constants.McGill,
		"mail.mcgill.ca": constants.McGill,
		"ualberta.ca":    constants.UAlberta,
		"uwo.ca":         constants.Western,
		"umontreal.ca":   constants.Montreal,
	}
)

func GetSchool(email string) (int, error) {
	splitList := strings.Split(email, "@")
	if len(splitList) < 2 {
		return 0, errors.New("Wrong format for email")
	}
	postfix := splitList[1]
	if school, ok := schoolMap[postfix]; ok {
		return school, nil
	}
	return -1, nil
}
