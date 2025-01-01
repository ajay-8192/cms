package routes

import (
	"cms/handler"

	"github.com/gin-gonic/gin"
)

func getContentRoutes(router *gin.Engine) {
	contentRoutes := router.Group("/content")
	{
		contentRoutes.GET("/:projectId", handler.GetContentsByProjectId)
		contentRoutes.POST("/:projectId/create", handler.CreateContentForProject)
	}
}
