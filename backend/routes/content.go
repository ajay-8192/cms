package routes

import (
	"cms/handler"
	"cms/middleware"

	"github.com/gin-gonic/gin"
)

func getContentRoutes(router *gin.Engine) {
	contentRoutes := router.Group("/content")
	{
		contentRoutes.GET("/:projectId", middleware.Authenticate, handler.GetContentsByProjectId)
		contentRoutes.POST("/:projectId/create", middleware.Authenticate, handler.CreateContentForProject)
	}
}
