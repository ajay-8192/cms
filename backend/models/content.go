package models

import (
	"time"

	"github.com/google/uuid"
)

type StatusEnum string;

const (
	DraftStatus		StatusEnum = "Draft"
	PublishedStatus	StatusEnum = "Published"
	ArchivedStatus	StatusEnum = "Archived"
)

type Content struct {
	Id 					uuid.UUID 		`json:"id" gorm:"type:char(36);primary_key;index"`
	VersionId 			uint64 			`json:"versionId"`
	Name      			string 			`json:"name"`
	CreatedUser 		uuid.UUID 		`json:"createdUser" gorm:"type:char(36);"`
	User        		*User			`json:"-" gorm:"foreignKey:CreatedUser;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	LastModifiedUser 	uuid.UUID 		`json:"lastModifiedUser" gorm:"type:char(36);"`
	LastModifiedBy 		*User			`json:"-" gorm:"foreignKey:LastModifiedUser;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	ProjectId 			uuid.UUID 		`json:"projectId" gorm:"type:char(36);index"`
	Project				*Project		`json:"-" gorm:"foreignKey:ProjectId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatedAt			time.Time		`json:"createdAt"`
	UpdatedAt			time.Time		`json:"updatedAt"`
	Status				StatusEnum		`json:"status" gorm:"type:enum('Draft','Published','Archived');not null"`
	Data				map[string]interface{}			`json:"data"`
}

type ContentVersion struct {
	ContentId		uuid.UUID		`json:"contentId" gorm:"type:char(36);"`
	Content			*Content		`json:"-" gorm:"foreignKey:ContentId;references:Id;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
}
