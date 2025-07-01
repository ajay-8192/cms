package main

import (
	"cms/config"
	"cms/database"
	"cms/handler"
	"cms/queries"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("Unable to load config: %v", err)
	}

	if err := database.Connect(config); err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}

	if err := database.ConnectMongoDB(config); err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}
	queries.InitMongoCollection()
	defer database.CloseMongoDB()

	router := gin.Default()

	router.GET("/status", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "CMS service running",
		})
	})

	serviceRoutes := router.Group("/service")
	{
		serviceRoutes.GET("/:contentKey", handler.GetContentByApiKey)
	}

	log.Println("Service starting on :8081...")
	router.Run(":8081")
}
