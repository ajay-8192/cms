package handler

import (
	"cms/queries"
	"context"

	"github.com/gin-gonic/gin"
)

func GetContentByApiKey(c *gin.Context) {
	apiKey := c.GetHeader("api-key")
	contentKey := c.Param("contentKey")

	project, err := queries.GetProjectByApiKey(apiKey)
	if err != nil {
		c.JSON(401, gin.H{"error": "Invalid API Key"})
		return
	}

	var contents []map[string]interface{}
	cursor, err := queries.FetchContentByProjectId(project.Id.String(), "")
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	if err = cursor.All(context.TODO(), &contents); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	for _, content := range contents {
		if content["name"] == contentKey {
			c.JSON(200, gin.H{
				"data": content["data"],
			})
			return
		}
	}

	c.JSON(404, gin.H{"error": "Content not found"})
}
