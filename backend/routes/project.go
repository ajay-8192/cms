package routes

import (
	"cms/handler"
	"cms/middleware"

	"github.com/gin-gonic/gin"
)



func getProjectRoutes(router *gin.Engine) {
	
	projectRoutes := router.Group("/project")
	{
		projectRoutes.POST("/create", middleware.Authenticate, handler.CreateProject)

		projectRoutes.GET("/", middleware.Authenticate, handler.GetProjectsByUserId)
		projectRoutes.GET("/:id", middleware.Authenticate, handler.GetProjectDetails)

		projectRoutes.POST("/:id", middleware.Authenticate, handler.UpdateProjectDetails)
		projectRoutes.DELETE("/:id", middleware.Authenticate, handler.DeleteProjectById)
	}
}
