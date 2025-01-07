package handler

import (
	"cms/database"
	"cms/models"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

func checkIfUserAlreadyExists(email string, username string) bool {

	var user models.User;

	results := database.DB.Where("email = ? OR username = ?", email, username).First(&user);

	return results.RowsAffected != 0
}

func CreateUser(c *gin.Context) {
	data := GetPostRequestData(c)

	firstname := data["firstname"].(string)
	lastname := data["lastname"].(string)
	username := data["username"].(string)
	email := data["email"].(string)
	password := data["password"].(string)

	isUserAlreadyExists := checkIfUserAlreadyExists(email, username);

	if isUserAlreadyExists {
		c.JSON(401, gin.H{
			"message": "user already exists",
		})
		return
	}

	var user models.User
	user.Email = email
	user.FirstName = firstname
	user.LastName = lastname
	user.Username = username
	hashPassword, err := GenerateHashString(password)
	if err != nil {
		panic(err)
	}
	user.Password = hashPassword
	results := database.DB.Create(&user)
	if results.RowsAffected == 0 {
		panic("Unable to create user")
	}

	userDetails := map[string]interface{}{
			"id": user.Id,
			"firstName": firstname,
			"lastName": lastname,
			"username": username,
			"email": email,
			"createdAt": user.CreatedAt,
			"updatedAt": user.UpdateAt,
			"bio": user.Bio,
	}
	expiration := time.Now().Add(15 * 24 * time.Hour)

	token, err := GenerateToken(userDetails, expiration)
	if err != nil {
		log.Printf("Error generating token: %v", err)
	}


	c.SetCookie("token", token, int(expiration.Unix()), "/", "", c.Request.TLS != nil, true)

	c.JSON(200, gin.H{
		"message": "User created successfully",
		"userDetails": userDetails,
	})
}

func LoginUser(c *gin.Context) {
	data := GetPostRequestData(c)
	username := data["username"].(string)
	password := data["password"].(string)

	var user models.User

	results := database.DB.Where("username = ? OR email = ?", username, username).First(&user)
	if results.RowsAffected == 0 {
		c.JSON(401, gin.H{
			"message": "User does not exist",
		})
		return
	}

	isPasswordMatched := CompareHashedString(user.Password, password)
	if !isPasswordMatched {
		c.JSON(403, gin.H{
			"message": "Incorrect Password",
		})
		return
	}
	userDetails := map[string]interface{}{
			"id": user.Id,
			"firstName": user.FirstName,
			"lastName": user.LastName,
			"username": user.Username,
			"email": user.Email,
			"createdAt": user.CreatedAt,
			"updatedAt": user.UpdateAt,
			"bio": user.Bio,
	}
	expiration := time.Now().Add(15 * 24 * time.Hour)

	token, err := GenerateToken(userDetails, expiration)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		c.JSON(403, gin.H{
			"message": "Error in generating token",
		})
		return
	}
	host := strings.Split(c.Request.Host, ":")[0]
	log.Printf("hostname: %s", host)

	// c.SetCookie("token", token, int(expiration.Unix()), "/", "", c.Request.TLS != nil, true)
	c.Header("Set-Cookie", "token=" + token + "; Expires=" + expiration.UTC().Format(http.TimeFormat) + "; Path=/; HttpOnly")
	c.JSON(200, gin.H{
		"message": "User loggedin successfully",
		"userDetails": userDetails,
	})
}

func GetUserDetails(c *gin.Context) {
	token, err := c.Cookie("token")
	if err != nil {
		log.Printf("Error fetching token: %v", err)
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	isBlacklisted, err := IsTokenBlacklisted(database.RDB, token)
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

	data, err := ParseToken(token)
	if err != nil {
		log.Printf("Error parsing token: %v", err)
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	c.JSON(200, gin.H{
		"message": "user details fetched successfully",
		"userDetails": data,
	});
}

func UpdateUserDetails(c *gin.Context) {
	token, err := c.Cookie("token")
	if err != nil {
		log.Printf("Error fetching token: %v", err)
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	isBlacklisted, err := IsTokenBlacklisted(database.RDB, token)
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

	data, err := ParseToken(token)
	if err != nil {
		log.Printf("Error parsing token: %v", err)
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}
	reqBody := GetPostRequestData(c);
	firstName := reqBody["firstName"].(string)
	lastName := reqBody["lastName"].(string)
	bio := reqBody["bio"].(string)
	fmt.Println(data)
	id := data["id"].(string)

	fmt.Println("id ==> ", id)
	var user *models.User
	database.DB.Where("id = ?", id).First(&user);
	fmt.Println("user ==> ", user)
	user.Bio = bio
	user.FirstName = firstName
	user.LastName = lastName

	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(500, gin.H{"error": "Failed to update user"})
		return
	}

	userDetails := map[string]interface{}{
		"id": user.Id,
		"firstName": user.FirstName,
		"lastName": user.LastName,
		"username": user.Username,
		"email": user.Email,
		"createdAt": user.CreatedAt,
		"updatedAt": user.UpdateAt,
		"bio": user.Bio,
	}
	expiration := time.Now().Add(15 * 24 * time.Hour)

	token, err = GenerateToken(userDetails, expiration)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		c.JSON(403, gin.H{
			"message": "Error in generating token",
		})
		return
	}
	host := strings.Split(c.Request.Host, ":")[0]
	log.Printf("hostname: %s", host)

	c.Header("Set-Cookie", "token=" + token + "; Expires=" + expiration.UTC().Format(http.TimeFormat) + "; Path=/; HttpOnly")
	c.JSON(200, gin.H{"message": "User updated successfully", "userDetails": userDetails})
}

func LogoutUser(c *gin.Context) {
	token, err := c.Cookie("token")
	log.Println("token: ", token)
	if err != nil {
		log.Printf("Error fetching token: %v", err)
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}

	_, err = ParseToken(token)
	if err != nil {
		log.Printf("Error parsing token: %v", err)
		c.JSON(403, gin.H{
			"message": "Unauthorized access",
		})
		return
	}
	expiration := 15 * 24 * time.Hour
	err = AddTokenToBlacklist(database.RDB, token, expiration)
	if err != nil {
		c.JSON(500, gin.H{"message": "Failed to blacklist token"})
		return
	}

	// Clear the cookie
	c.SetCookie("token", "", -1, "/", "", false, true)
	c.JSON(200, gin.H{"message": "Logged out successfully"})
}

func ForgotPassword(c *gin.Context) {
	data := GetPostRequestData(c)
	email := data["email"].(string)

	var user *models.User

	results := database.DB.Where("email = ?", email).First(&user)
	if results.RowsAffected == 0 {
		c.JSON(401, gin.H{
			"message": "User does not exist",
		})
		return
	}

	// generate reset token and user token and create URL for reset password

	// Send reset password link to mail with mail integration

	c.JSON(200, gin.H{
		"message": "A link is shared through mail for reset password",
	})
}

func ResetPassword(c *gin.Context) {
	data := GetPostRequestData(c)
	resetToken := data["resetToken"].(string)
	password := data["password"].(string)
	confirmPassword := data["password"].(string)

	// fetch user details from redis and update password by validating to DB

	log.Println(resetToken, password, confirmPassword)
}
