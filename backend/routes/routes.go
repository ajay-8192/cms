package routes

import "github.com/gin-gonic/gin"

func InitRoutes(router *gin.Engine) {

	getUserRoutes(router)

	getProjectRoutes(router)

	getContentRoutes(router)

	getServiceRoutes(router)
}
