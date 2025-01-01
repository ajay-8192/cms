package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Id 			uuid.UUID 	`json:"id" gorm:"type:char(36);primary_key;index"`
	FirstName 	string 		`json:"firstName" gorm:"index:idx_full_name"`
	LastName  	string 		`json:"lastName" gorm:"index:idx_full_name"`
	Username 	string 		`json:"username" gorm:"type:varchar(255);uniqueIndex"`
	Email 		string 		`json:"email" gorm:"type:varchar(255);uniqueIndex"`
	Password	string 		`json:"-"`
	Bio			string		`json:"bio" gorm:"type:longtext"`
	Deactivate	bool		`json:"deactivated"`
	CreatedAt	time.Time	`json:"createdAt"`
	UpdateAt	time.Time	`json:"updatedAt"`
}

// BeforeCreate hook to set UUID before creating a new record
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	if u.Id == uuid.Nil {
		u.Id = uuid.New()
		u.CreatedAt = time.Now()
		u.UpdateAt = time.Now()
	}
	return
}

func (u *User) BeforeUpdate(tx *gorm.DB) (err error) {
	u.UpdateAt = time.Now()
	return
}
