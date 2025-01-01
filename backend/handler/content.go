package handler

import (
	"cms/database"
	"cms/models"
	"context"
	"fmt"
	"log"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetContentsByProjectId(c *gin.Context) {
	projectId := c.Param("projectId")

	fmt.Println("Project ID: ", projectId)

	var contents []map[string]interface{}
	cursor, err := database.MDB.Database("cms").Collection("contents").Find(context.TODO(), map[string]interface{}{"projectId": projectId})
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
			"content":   contents,
		},
	})
}

func CreateContentForProject(c *gin.Context) {
	id, ok := c.Get("id")
	if !ok {
		log.Println("User not Authenticated")
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	userId, err := uuid.Parse(id.(string))
	if err != nil {
		log.Printf("Error parsing UUID: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Internal Server Error",
		})
		return
	}

	projectId, err := uuid.Parse(c.Param("projectId"))
	if err != nil {
		log.Printf("Error parsing UUID: %v\n", err)
		c.JSON(400, gin.H{
			"message": "Invalid project ID",
		})
		return
	}

	data := GetPostRequestData(c)

	data["projectId"] = projectId

	name := data["name"].(string)

	contentData := data["data"].(map[string]interface{})

	content := models.Content{
		Id:               uuid.New(),
		VersionId:        1,
		ProjectId:        projectId,
		CreatedUser:      userId,
		Name:             name,
		Status:           models.DraftStatus,
		LastModifiedUser: userId,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
		Data:             contentData,
	}

	_, err = database.MDB.Database("cms").Collection("contents").InsertOne(context.TODO(), content)
	if err != nil {
		log.Printf("Error parsing UUID: %v\n", err)
		c.JSON(400, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "Content created successfully",
		"data": map[string]interface{}{
			"projectId": projectId,
			"content":   content,
		},
	})
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
