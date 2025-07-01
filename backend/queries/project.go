package queries

import (
	"cms/database"
	"cms/models"
	"fmt"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

func GetProjectsByUserId(userId uuid.UUID, projects *[]models.Project, offset int, limit int) *gorm.DB {
	if limit == 0 {
		limit = 10
	}
	return database.DB.Preload("User").Find(&projects, "created_by = ?", userId).Offset(offset).Limit(limit);
}

func GetProjectById(projectId uuid.UUID, project *models.Project) *gorm.DB {
	return database.DB.First(project, "id = ?", projectId)
}

func GetProjectByApiKey(apiKey string) (*models.Project, error) {
	var project models.Project
	result := database.DB.First(&project, "api_key = ?", apiKey)
	return &project, result.Error
}

func DeleteProjectById(project *models.Project) (*gorm.DB, error) {

	if (project.Id == uuid.Nil) {
		return nil, fmt.Errorf("project does not exist")
	}

	return database.DB.Delete(project, "id = ?", project.Id), nil
}

func CreateProject(project *models.Project) *gorm.DB {
	return database.DB.Create(project)
}

func CreateProjectRole(projectRole *models.ProjectRole) *gorm.DB {
	return database.DB.Create(projectRole)
}

func CreateProjectVersion(projectVersion *models.ProjectVersion) *gorm.DB {
	return database.DB.Create(projectVersion)
}
