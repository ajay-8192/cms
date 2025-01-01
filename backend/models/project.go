package models

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type RoleEnum string;

const (
	AdminRole   		RoleEnum = "Admin"
	ReadRole  			RoleEnum = "Read"
	WriteRole			RoleEnum = "Write"
	OwnerRole   		RoleEnum = "Owner"
)

type ProjectRole struct {
	ProjectId		uuid.UUID		`json:"projectId" gorm:"type:char(36);index"`
	Project        	*Project		`json:"-" gorm:"foreignKey:ProjectId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	UserId			uuid.UUID		`json:"userId" gorm:"type:char(36);index"`
	User        	*User			`json:"-" gorm:"foreignKey:UserId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Role 			RoleEnum 		`json:"role" gorm:"type:enum('Admin','Read','Write','Owner');not null"`
}

type Project struct {
	Id 				uuid.UUID 		`json:"id" gorm:"type:char(36);primary_key;index"`
	Title 			string			`json:"title"`
	VersionId		uint64			`json:"versionId"`
	Description 	string 			`json:"description"`
	CreatedBy   	uuid.UUID 		`json:"createdBy" gorm:"type:char(36);"`
	User        	*User			`json:"-" gorm:"foreignKey:CreatedBy;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt		time.Time		`json:"createdAt"`
	UpdateAt		time.Time		`json:"updatedAt"`
	PublishedAt		*time.Time		`json:"publishedAt"`
}

type ProjectVersion struct {
	ProjectId		uuid.UUID		`json:"projectId" gorm:"type:char(36);"`
	VersionId		uint64			`json:"versionId"`
	Project        	*Project		`json:"project" gorm:"foreignKey:ProjectId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ModifiedBy		uuid.UUID		`json:"modifiedBy" gorm:"type:char(36);"`
	User        	*User			`json:"-" gorm:"foreignKey:ModifiedBy;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Title			string			`json:"title"`
	Description		string			`json:"description"`
	ModifiedAt		time.Time		`json:"modifiedAt"`
	PublishedAt		*time.Time		`json:"publishedAt"`
}

func (p *Project) BeforeCreate(tx *gorm.DB) (err error) {
	if (p.Id == uuid.Nil) {
		p.Id = uuid.New()
		p.CreatedAt = time.Now()
		p.UpdateAt = time.Now()
	}
	return
}

func (p *Project) BeforeUpdate(tx *gorm.DB) (err error) {
	p.UpdateAt = time.Now()
	return
}
