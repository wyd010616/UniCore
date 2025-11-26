package mysql

import (
	"unicore/pkg/constants"
	"unicore/pkg/utils"
)

type Nickname struct {
	NickNameID uint   `json:"nick_name_id"`
	ParentID   uint   `json:"parent_id"`
	UserID     uint   `json:"user_id"`
	NickName   string `json:"nick_name"`
}

func (Nickname) TableName() string {
	return constants.NickNameTableName
}

func GetNickName(parentID, userID uint) (string, error) {
	var nickNameList []Nickname
	err := DB.Where("user_id = ? AND parent_id = ?", userID, parentID).Find(&nickNameList).Error
	if err != nil {
		return "", err
	}
	if len(nickNameList) > 0 {
		return nickNameList[0].NickName, nil
	}
	var tempList []Nickname
	err = DB.Where("parent_id = ?", parentID).Find(&tempList).Error
	if err != nil {
		return "", nil
	}
	count := len(tempList)
	newName := utils.GenNickName(count)
	newNickName := Nickname{
		UserID:   userID,
		ParentID: parentID,
		NickName: newName,
	}
	err = DB.Create(&newNickName).Error
	if err != nil {
		return "", nil
	}
	return newName, nil
}
