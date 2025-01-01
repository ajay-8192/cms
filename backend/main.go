package main

import (
	"cms/config"
	"cms/database"
	"cms/routes"
	"log"

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

	database.ConnectRedis(config)

	router := gin.Default();
	
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: 	  []string{"Content-Type", "Authorization", "Set-Cookie"},
		ExposeHeaders: 	  []string{"Set-Cookie"},
		AllowCredentials: true,
	}))

	routes.InitRoutes(router);

	log.Println("Server starting on :8080...")

	router.Run(":8080")
}
