package handler

import (
	"cms/database"
	"cms/models"
	"cms/queries"
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)


func GetContentsByProjectId(c *gin.Context) {
	projectId := c.Param("projectId")

	var contents []map[string]interface{}
	cursor, err := queries.FetchContentByProjectId(projectId, "")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err = cursor.All(context.TODO(), &contents); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "Get contents by project ID",
		"data": map[string]interface{}{
			"projectId": projectId,
			"contents":   contents,
		},
	})
}

func UpdateContentById(c *gin.Context) {
	contentId := c.Param("contentId")
	data := GetPostRequestData(c)

	contentName := data["contentName"].(string)
	contentData, ok := data["contents"].([]interface{})
	if !ok {
		log.Println("Invalid or missing contents")
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Contents must be an array",
		})
		return
	}

	contents, err := extractContents(contentData)
	if err != nil {
		log.Printf("Error processing contents: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid contents format",
		})
		return
	}
	fmt.Println(contents, contentName)

	var content models.Content
	result := queries.FetchContentById(contentId, "", &content)

	err = result.Decode(&content)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	content.Name = contentName;
	content.Data = contents
	results, err := queries.UpdateContent(contentId, content)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(results.MatchedCount)
	if results.MatchedCount != 1 {
		c.JSON(500, gin.H{"error": "Multiple data found with same content ID"})
		return
	}

	c.JSON(200, gin.H{
		"message": "Content updated successfully",
		"data":    content,
	})
}

func CreateContentForProject(c *gin.Context) {
	// Extract user ID from context
	id, ok := c.Get("id")
	if !ok {
		log.Println("User not authenticated")
		c.JSON(http.StatusForbidden, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	// Parse user UUID
	userId, err := uuid.Parse(id.(string))
	if err != nil {
		log.Printf("Error parsing user UUID: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to process user information",
		})
		return
	}

	// Parse project ID from URL parameter
	projectId, err := uuid.Parse(c.Param("projectId"))
	if err != nil {
		log.Printf("Error parsing project UUID: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid project ID",
		})
		return
	}

	// Get POST data
	data := GetPostRequestData(c)

	// Extract content name
	name, ok := data["contentName"].(string)
	if !ok || name == "" {
		log.Println("Invalid or missing contentName")
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Content name is required",
		})
		return
	}

	// Extract and process contents
	contentData, ok := data["contents"].([]interface{})
	if !ok {
		log.Println("Invalid or missing contents")
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Contents must be an array",
		})
		return
	}

	contents, err := extractContents(contentData)
	if err != nil {
		log.Printf("Error processing contents: %v\n", err)
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid contents format",
		})
		return
	}

	// Create Content object
	content := models.Content{
		Id:               uuid.New().String(),
		VersionID:        1,
		Name:             name,
		CreatedUser:      userId.String(),
		LastModifiedUser: userId.String(),
		ProjectID:        projectId.String(),
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
		Status:           models.DraftStatus,
		Data:             contents,
	}

	// Save content in MongoDB
	_, err = queries.CreateContent(content)
	if err != nil {
		log.Printf("Error creating content: %v\n", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed to create content",
		})
		return
	}

	// Successful response
	c.JSON(http.StatusOK, gin.H{
		"message": "Content created successfully",
		"data": map[string]interface{}{
			"projectId": projectId,
			"content":   content,
		},
	})
}

// Helper function to process contents
func extractContents(contentData []interface{}) (map[string]interface{}, error) {
	contents := make(map[string]interface{})

	for _, item := range contentData {
		contentItem, ok := item.(map[string]interface{})
		if !ok {
			return nil, fmt.Errorf("invalid content item format")
		}

		key, ok := contentItem["key"].(string)
		if !ok || key == "" {
			return nil, fmt.Errorf("missing or invalid key in content item")
		}

		value, ok := contentItem["value"]
		if !ok {
			return nil, fmt.Errorf("missing value in content item")
		}

		contents[key] = value
	}

	return contents, nil
}


func UpdateContentForProject(c *gin.Context) {
	projectId := c.Param("projectId")

	data := GetPostRequestData(c)

	data["projectId"] = projectId

	contentId := data["contentId"].(string)

	_, err := database.MDB.Database("cms").Collection("contents").UpdateOne(context.TODO(), map[string]interface{}{"contentId": contentId}, data)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "Content updated successfully",
		"data": map[string]interface{}{
			"projectId": projectId,
			"content":   data,
		},
	})
}

func GetContentDetails(c *gin.Context) {
	projectId := c.Param("projectId")
	contentId := c.Param("contentId")

	var content models.Content
	result := queries.FetchContentById(contentId, "", &content)

	err := result.Decode(&content)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "Get content details",
		"data": map[string]interface{}{
			"projectId": projectId,
			"contentId": contentId,
			"content":   content,
		},
	})
}

// func DeleteContentById(c *gin.Context) {
// 	contentId := c.Param("contentid")
// }
