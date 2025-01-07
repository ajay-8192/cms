package models

import (
	"time"

	"github.com/google/uuid"
)

// StatusEnum defines possible content statuses
type StatusEnum string

const (
	DraftStatus     StatusEnum = "Draft"
	PublishedStatus StatusEnum = "Published"
	ArchivedStatus  StatusEnum = "Archived"
)

// Content represents the main content document
type Content struct {
	Id               uuid.UUID              `bson:"id" json:"id"`
	VersionID        uint64                 `bson:"versionId" json:"versionId"`
	Name             string                 `bson:"name" json:"name"`
	CreatedUser      string                 `bson:"createdUser" json:"createdUser"`
	LastModifiedUser string                 `bson:"lastModifiedUser" json:"lastModifiedUser"`
	ProjectID        string                 `bson:"projectId" json:"projectId"`
	CreatedAt        time.Time              `bson:"createdAt" json:"createdAt"`
	UpdatedAt        time.Time              `bson:"updatedAt" json:"updatedAt"`
	Status           StatusEnum             `bson:"status" json:"status"`
	Data             map[string]interface{} `bson:"data" json:"data"` // BSON supports flexible maps
}

// ContentVersion represents a version of the content
type ContentVersion struct {
	ContentID uuid.UUID `bson:"contentId" json:"contentId"` // Reference to the Content document
}
