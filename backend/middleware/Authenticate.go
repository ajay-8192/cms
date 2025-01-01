package middleware

import (
	"cms/database"
	"cms/handler"
	"log"

	"github.com/gin-gonic/gin"
)

func Authenticate(c *gin.Context) {

	token, err := c.Cookie("token")
	// Failed to load token from cookie
	if err != nil {
		log.Printf("Error fetching token: %v", err)
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	// To check whether token is blacklisted or not
	isBlacklisted, err := handler.IsTokenBlacklisted(database.RDB, token)
	if err != nil {
		log.Fatalf("Failed to check blacklist: %v", err)
	}

	if isBlacklisted {
		log.Println("User logged out")
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	// Fetch user details stored in token using jwt
	data, err := handler.ParseToken(token)

	// Failed to parse token to fetch user details
	if err != nil {
		log.Printf("Error parsing token: %v", err)
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	id := data["id"].(string)
	username := data["username"].(string)

	fullName := data["firstName"].(string) + data["lastName"].(string)

	c.Set("id", id)
	c.Set("username", username)
	c.Set("fullName", fullName)

	c.Next()
}