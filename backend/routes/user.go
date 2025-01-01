package routes

import (
	"cms/handler"

	"github.com/gin-gonic/gin"
)

func getUserRoutes(router *gin.Engine) {
	userRoute := router.Group("/user")
	{
		userRoute.POST("/create", handler.CreateUser)
		userRoute.POST("/login", handler.LoginUser)
		userRoute.GET("/details", handler.GetUserDetails)
		userRoute.POST("/details", handler.UpdateUserDetails)
		userRoute.POST("/logout", handler.LogoutUser)
		userRoute.POST("/forgot-password", handler.ForgotPassword)
	}
}
