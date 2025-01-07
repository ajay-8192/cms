package handler

import (
	"cms/database"
	"cms/models"
	"cms/queries"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"gorm.io/gorm"
)


func GetProjectsByUserId(c *gin.Context) {
	firstName, parsedUUID := getUserDetailsFromRequest(c)
	
	var projects []models.Project

	results := queries.GetProjectsByUserId(parsedUUID, &projects);

	if results.Error != nil {
		log.Printf("Error in retreive %s", firstName)
		log.Printf("Error in retreive %+v", results.Error)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "No Projects found",
		})
		return
	}

	if results.RowsAffected == 0 {
		log.Printf("No project found for %s", firstName)
		c.JSON(http.StatusOK, gin.H{
			"message": "No Projects found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully retreived projects",
		"projects": projects,
	})
}


func CreateProject(c *gin.Context) {
	fullName, parsedUUID := getUserDetailsFromRequest(c)

	// Parse the incoming request data
	data := GetPostRequestData(c)
	title, ok := data["title"].(string)
	if !ok || title == "" {
		c.JSON(400, gin.H{
			"message": "Project title is required",
		})
		return
	}

	description, _ := data["description"].(string)
	publish, ok := data["publish"].(bool)
	if !ok {
		publish = false
	}

	var publishedAt *time.Time

	if publish {
		publishedAt = new(time.Time)
		*publishedAt = time.Now()
	}

	// Generate IDs for the project, project role, and project version to avoid additional queries
	projectID := uuid.New()

	// Wrap all database operations in a transaction
	err := database.DB.Transaction(func(tx *gorm.DB) error {
		// 1. Create the Project
		project := models.Project{
			Id:          projectID,
			Title:       title,
			VersionId:   1,
			Description: description,
			CreatedBy:   parsedUUID,
			CreatedAt:   time.Now(),
			UpdateAt:    time.Now(),
			PublishedAt: publishedAt,
		}

		if err := tx.Create(&project).Error; err != nil {
			log.Printf("Error creating project: %v\n", err)
			return err
		}

		// 2. Batch insert related records (Role and Version)
		projectRole := models.ProjectRole{
			ProjectId: projectID,
			UserId:    parsedUUID,
			Role:      models.OwnerRole,
		}

		projectVersion := models.ProjectVersion{
			VersionId:   1,
			ProjectId:   projectID,
			ModifiedBy:  parsedUUID,
			Title:       title,
			Description: description,
			ModifiedAt:  time.Now(),
			PublishedAt: publishedAt,
		}

		if err := tx.Create(&projectRole).Error; err != nil {
			log.Printf("Error creating Roles records: %v\n", err)
			return err
		}

		// Batch insert related records
		if err := tx.Create(&projectVersion).Error; err != nil {
			log.Printf("Error creating versions records: %v\n", err)
			return err
		}

		return nil
	})

	// Handle transaction errors
	if err != nil {
		log.Printf("Transaction failed: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Failed to create project",
		})
		return
	}

	// Respond with the created project details
	c.JSON(201, gin.H{
		"message": "Project created successfully",
		"project": map[string]interface{}{
			"id":          projectID,
			"title":       title,
			"description": description,
			"createdAt":   time.Now(),
			"role":        models.OwnerRole,
			"publishedAt": publishedAt,
			"createdBy":   map[string]interface{}{
				"id": parsedUUID,
				"name": fullName,
			},
		},
	})
}

func GetProjectDetails(c *gin.Context) {
	// Get the project ID from the URL
	projectID := c.Param("id")

	// Parse the project ID as a UUID
	parsedUUID, err := uuid.Parse(projectID)
	if err != nil {
		log.Printf("Error parsing UUID: %v\n", err)
		c.JSON(400, gin.H{
			"message": "Invalid project ID",
		})
		return
	}

	// Fetch the project details from the database
	var project models.Project
	if err := database.DB.Preload("User").First(&project, "id = ?", parsedUUID).Error; err != nil {
		log.Printf("Error fetching project: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Failed to fetch project",
		})
		return
	}

	// Respond with the project details
	c.JSON(200, gin.H{
		"project": map[string]interface{}{
			"id":          projectID,
			"title":       project.Title,
			"description": project.Description,
			"createdAt":   project.CreatedAt,
			"role":        models.OwnerRole,
			"publishedAt": project.PublishedAt,
			"createdBy":   map[string]interface{}{
				"id": project.CreatedBy,
				"name": project.User.FirstName + project.User.LastName,
			},
		},
	})
}

func PublishProject(c *gin.Context) {
	projectID := c.Param("id")

	// Parse the project ID as a UUID
	parsedUUID, err := uuid.Parse(projectID)
	if err != nil {
		log.Printf("Error parsing UUID: %v\n", err)
		c.JSON(400, gin.H{
			"message": "Invalid project ID",
		})
		return
	}

	// Fetch the project details from the database
	var project models.Project
	if err := database.DB.First(&project, "id = ?", parsedUUID).Error; err != nil {
		log.Printf("Error fetching project: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Failed to fetch project",
		})
		return
	}

	// Update the project's publishedAt field
	project.PublishedAt = new(time.Time)
	*project.PublishedAt = time.Now()

	// Update the project in the database
	if err := database.DB.Save(&project).Error; err != nil {
		log.Printf("Error updating project: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Failed to publish project",
		})
		return
	}
	
	// Respond with the updated project details
	c.JSON(200, gin.H{
		"message": "Project published successfully",
		"project": map[string]interface{}{
			"id":          projectID,
			"title":       project.Title,
			"description": project.Description,
			"createdAt":   project.CreatedAt,
			"role":        models.OwnerRole,
			"publishedAt": project.PublishedAt,
			"createdBy":   map[string]interface{}{
				"id": project.CreatedBy,
				"name": project.User.FirstName + project.User.LastName,
			},
		},
	})
}

func UpdateProjectDetails(c *gin.Context) {
	// Get the project ID from the URL
	projectID := c.Param("id")

	data := GetPostRequestData(c);

	title := data["title"].(string)
	description := data["description"].(string)

	// Parse the project ID as a UUID
	parsedUUID, err := uuid.Parse(projectID)
	if err != nil {
		log.Printf("Error parsing UUID: %v\n", err)
		c.JSON(400, gin.H{
			"message": "Invalid project ID",
		})
		return
	}

	// Fetch the project details from the database
	var project models.Project
	if err := database.DB.Preload("User").First(&project, "id = ?", parsedUUID).Error; err != nil {
		log.Printf("Error fetching project: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Failed to fetch project",
		})
		return
	}

	project.Title = title
	project.Description = description
	project.VersionId = project.VersionId + 1

	projectVersion := models.ProjectVersion{
		VersionId:   project.VersionId,
		ProjectId:   project.Id,
		ModifiedBy:  project.CreatedBy,
		Title:       title,
		Description: description,
		ModifiedAt:  time.Now(),
		PublishedAt: project.PublishedAt,
	}

	if err := database.DB.Create(&projectVersion).Error; err != nil {
		log.Printf("Error updating project version: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Failed to publish project",
		})
		return
	}

	// Update the project in the database
	if err := database.DB.Save(&project).Error; err != nil {
		log.Printf("Error updating project: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Failed to publish project",
		})
		return
	}

	// Respond with the project details
	c.JSON(200, gin.H{
		"project": map[string]interface{}{
			"id":          projectID,
			"title":       project.Title,
			"description": project.Description,
			"createdAt":   project.CreatedAt,
			"role":        models.OwnerRole,
			"publishedAt": project.PublishedAt,
			"createdBy":   map[string]interface{}{
				"id": project.CreatedBy,
				"name": project.User.FirstName + project.User.LastName,
			},
		},
	})
}

func DeleteProjectById(c *gin.Context) {

	// Get the project ID from the URL
	projectID := c.Param("id")

	// Parse the project ID as a UUID
	parsedUUID, err := uuid.Parse(projectID)
	if err != nil {
		log.Printf("Error parsing UUID: %v\n", err)
		c.JSON(400, gin.H{
			"message": "Invalid project ID",
		})
		return
	}

	// Fetch project by Id and validate based on role access
	var project *models.Project
	results := queries.GetProjectById(parsedUUID, project)
	if results.RowsAffected == 0 || results.Error != nil {
		log.Printf("Error fetching rows: %v - Project not found\n", results.Error)
		c.JSON(500, gin.H{
			"message": "No projects found",
		})
		return
	}

	// Delete
	results, err = queries.DeleteProjectById(project)
	if err != nil {
		log.Printf("Error removing rows: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Error in delete project",
		})
		return
	}

	if results.RowsAffected == 0 {
		log.Printf("Error removing rows: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Failed to delete project",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Project Deleted Successfully",
	})
}
