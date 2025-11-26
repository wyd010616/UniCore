package utils

import (
	"gopkg.in/gomail.v2"
	"math/rand"
	"time"
	"unicore/pkg/constants"
)

func SendValidationEmail(to string, code string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", constants.SMTPUsername)
	m.SetHeader("To", to)
	title := "[" + constants.WebName + "] Verification Code"
	m.SetHeader("Subject", title)

	msg := `<!DOCTYPE html>
<html lang="cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>` + title + `</title>
</head>
<body>
<p>Welcome for registering` + constants.WebName + `！</p>
<p>This is your verification code, which will be valid for 12 hours.</p>
<p><strong>` + code + `</strong></p>
</body>
</html>`

	m.SetBody("text/html", msg)
	m.AddAlternative("text/plain", "您好：\n\n欢迎您注册"+constants.WebName+"！\n\n"+code+"\n这是您注册"+constants.WebName+"的验证码，有效时间12小时。\n")
	d := gomail.NewDialer(constants.SMTPHost, constants.Port, constants.SMTPUsername, constants.SMTPPassword)

	if err := d.DialAndSend(m); err != nil {
		return err
	}
	return nil
}

func GenerateRandomCode() string {
	var charset = constants.CharSet
	var seededRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))
	b := make([]byte, constants.CodeLength)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}
