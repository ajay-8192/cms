package handler

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/redis/go-redis/v9"
	"golang.org/x/crypto/bcrypt"
)

var secretKey = []byte("your-secret-key")
var ctx = context.Background()

type CustomClaims struct {
	Data map[string]interface{} `json:"data"` // Object payload
	jwt.RegisteredClaims
}

func GetPostRequestData(c *gin.Context) map[string]interface{} {
	var reqBody interface{}
	if err := c.ShouldBindJSON(&reqBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
	}
	data, ok := reqBody.(map[string]interface{})
	if !ok {
		c.JSON(400, gin.H{"message": "invalid Request"})
	}
	return data
}

func GenerateHashString(str string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(str), 14)
	return string(bytes), err
}

func CompareHashedString(hashedString string, str string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedString), []byte(str))
    return err == nil
}

func GenerateToken(data map[string]interface{}, expiration time.Time) (string, error) {
	claims := CustomClaims{
		Data: data,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiration),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(secretKey)
}

func ParseToken(tokenString string) (map[string]interface{}, error) {

	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(*CustomClaims); ok && token.Valid {
		return claims.Data, nil
	}

	return nil, fmt.Errorf("invalid token")
}

func AddTokenToBlacklist(rdb *redis.Client, token string, expiration time.Duration) error {
	// Use the token as the key and store an arbitrary value
	err := rdb.Set(ctx, token, "blacklisted", expiration).Err()
	return err
}

// IsTokenBlacklisted checks if a token exists in the blacklist
func IsTokenBlacklisted(rdb *redis.Client, token string) (bool, error) {
	// Check if the token exists
	_, err := rdb.Get(ctx, token).Result()
	if err == redis.Nil {
		// Key does not exist
		return false, nil
	} else if err != nil {
		// Other Redis errors
		return false, err
	}
	// Token is blacklisted
	return true, nil
}

func getUserDetailsFromRequest(c *gin.Context) (fullName string, parsedUUID  uuid.UUID) {
	// Get the authenticated user ID from the context
	id, ok := c.Get("id")
	if !ok {
		log.Println("User not Authenticated")
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return "", uuid.Nil
	}

	name, ok := c.Get("fullName")
	if !ok {
		log.Println("Name not added Authenticated")
		fullName = ""
	} else {
		fullName = name.(string)
	}

	// Parse the user ID as a UUID
	parsedUUID, err := uuid.Parse(id.(string))
	if err != nil {
		log.Printf("Error parsing UUID: %v\n", err)
		c.JSON(500, gin.H{
			"message": "Internal Server Error",
		})
		return "", uuid.Nil
	}

	return fullName, parsedUUID
}
