package routes

import (
	"cms/handler"
	"cms/middleware"

	"github.com/gin-gonic/gin"
)

func getUserRoutes(router *gin.Engine) {
	userRoute := router.Group("/user")
	{
		userRoute.POST("/create", handler.CreateUser)
		userRoute.POST("/login", handler.LoginUser)
		userRoute.POST("/forgot-password", handler.ForgotPassword)
		userRoute.POST("/reset-password", handler.ResetPassword)
		userRoute.GET("/details", middleware.Authenticate, handler.GetUserDetails)
		userRoute.POST("/details", middleware.Authenticate, handler.UpdateUserDetails)
		userRoute.POST("/logout", middleware.Authenticate, handler.LogoutUser)
	}
}
