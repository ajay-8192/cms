package main

import (
	"cms/config"
	"cms/database"
	"cms/queries"
	"cms/routes"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
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

	database.ConnectRedis(config)

	router := gin.Default();
	
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: 	  []string{"Content-Type", "Authorization", "Set-Cookie"},
		ExposeHeaders: 	  []string{"Set-Cookie"},
		AllowCredentials: true,
	}))

	router.GET("/status", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "CMS backend service running",
		})
	})

	routes.InitRoutes(router);

	log.Println("Server starting on :8080...")

	router.Run(":8080")
}
