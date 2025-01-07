package routes

import (
	"cms/handler"
	"cms/middleware"

	"github.com/gin-gonic/gin"
)

func getContentRoutes(router *gin.Engine) {
	contentRoutes := router.Group("/content")
	{
		contentRoutes.GET("/project/:projectId", middleware.Authenticate, handler.GetContentsByProjectId)
		contentRoutes.POST("/project/:projectId/create", middleware.Authenticate, handler.CreateContentForProject)
		contentRoutes.GET("/project/:projectId/:contentId", middleware.Authenticate, handler.GetContentDetails)
	}
}
