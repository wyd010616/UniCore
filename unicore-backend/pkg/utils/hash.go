package utils

import (
	"crypto/sha256"
	"encoding/hex"
	"unicore/pkg/constants"
)

func hash(data string) string {
	h := sha256.New()
	h.Write([]byte(data))
	return hex.EncodeToString(h.Sum(nil))
}

func HashPassword(password string) string {
	return hash(constants.Salt + hash(password))
}
