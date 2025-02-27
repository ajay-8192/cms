package queries

import (
	"cms/database"
	"cms/models"

	"gorm.io/gorm"
)

func FetchUserByEmail(email string, projections string, user models.User) *gorm.DB {
	query := database.DB.Where("email = ?", email)

	if projections != "" {
		query = query.Select(projections)
	}

	return query.First(&user);
}

func FetchUserByUsername(username string, projections string, user models.User) *gorm.DB {
	query := database.DB.Where("username = ?", username)

	if projections != "" {
		query = query.Select(projections)
	}

	return query.First(&user);
}

func CreateUser(user models.User) *gorm.DB {
	return database.DB.Create(&user)
}

func FetchUserByEmailOrUsername(email string, username string, projections string, user models.User) *gorm.DB {
	query := database.DB.Where("email = ? OR username = ?", email, username)

	if projections != "" {
		query = query.Select(projections)
	}

	return query.First(&user);
}

func UpdateUserByEmail(email string, user models.User) *gorm.DB {
	return database.DB.Where("email = ?", email).Updates(&user)
}

func UpdateUserByUsername(username string, user models.User) *gorm.DB {
	return database.DB.Where("username = ?", username).Updates(&user)
}

func UpdateUser(user models.User) *gorm.DB {
	return database.DB.Save(&user)
}
