package routes

import (
	"cms/handler"

	"github.com/gin-gonic/gin"
)

func getServiceRoutes(router *gin.Engine) {
	serviceRoutes := router.Group("/service")
	{
		serviceRoutes.GET("/:contentKey", handler.GetContentByApiKey)
	}
}
