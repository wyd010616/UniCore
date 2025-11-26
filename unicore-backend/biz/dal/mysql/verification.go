package mysql

import (
	"errors"
	"unicore/pkg/constants"
	"unicore/pkg/utils"
)

type RegVerCode struct {
	VerID      int64  `json:"ver_id"`
	VerCode    string `json:"ver_code"`
	Email      string `json:"email"`
	ExpireTime string `json:"expire_time"`
}

func (RegVerCode) TableName() string {
	return constants.RegVerCodeTableName
}

func NewRegVerCode(email, veriCode, expireTime string) error {
	var codeList []RegVerCode
	err := DB.Where("email = ?", email).Find(&codeList).Error
	if err != nil {
		return err
	}
	if len(codeList) == 0 {
		newCode := &RegVerCode{
			VerCode:    veriCode,
			Email:      email,
			ExpireTime: expireTime,
		}
		err := DB.Create(newCode).Error
		if err != nil {
			return err
		}
		return nil
	} else {
		code := codeList[0]
		if utils.CheckExpired(code.ExpireTime) {
			err := DB.Delete(&RegVerCode{}, code.VerID).Error
			if err != nil {
				return err
			}
			newCode := &RegVerCode{
				VerCode:    veriCode,
				Email:      email,
				ExpireTime: expireTime,
			}
			err = DB.Create(newCode).Error
			if err != nil {
				return err
			}
			return nil
		}
		return errors.New("Verification code sent, please check your mail box again.")
	}
}

func CheckCode(email, veriCode string) (bool, error) {
	var codeList []RegVerCode
	err := DB.Where("email = ?", email).Find(&codeList).Error
	if err != nil {
		return false, nil
	}
	if len(codeList) == 0 {
		return false, nil
	}
	code := codeList[0]
	if veriCode == code.VerCode && utils.GetCurrentTime() <= code.ExpireTime {
		err := DB.Delete(&RegVerCode{}, code.VerID).Error
		if err != nil {
			return false, err
		}
		return true, nil
	} else if veriCode != code.VerCode {
		return false, nil
	} else {
		err := DB.Delete(&RegVerCode{}, code.VerID).Error
		if err != nil {
			return false, err
		}
		return false, nil
	}

}

type ChPwdVerCode struct {
	VerID      int64  `json:"ver_id"`
	Code       string `json:"code"`
	UserID     int64  `json:"user_id"`
	ExpireTime string `json:"expire_time"`
}

func (ChPwdVerCode) TableName() string {
	return constants.ChPwdVerCodeTableName
}
