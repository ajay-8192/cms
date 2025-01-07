package queries

import (
	"cms/database"
	"cms/models"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetProjectsByUserId(userId uuid.UUID, projects *[]models.Project) *gorm.DB {
	return database.DB.Find(&projects, "created_by = ?", userId)
}

func GetProjectById(projectId uuid.UUID, project *models.Project) *gorm.DB {
	return database.DB.Where("id = ?", projectId).Find(project)
}

func DeleteProjectById(project *models.Project) (*gorm.DB, error) {

	if (project.Id == uuid.Nil) {
		return nil, fmt.Errorf("project does not exist")
	}

	return database.DB.Delete(project, "id = ?", project.Id), nil
}
