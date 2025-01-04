package database

import (
	"cms/config"
	"cms/models"
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
var MDB *mongo.Client

func Connect(config *config.Config) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        config.DBUser, config.DBPassword, config.DBHost, config.DBPort, config.DBName)

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	if err := DB.AutoMigrate(
		&models.User{},
		&models.Project{},
		&models.ProjectRole{},
		&models.ProjectVersion{},
	); err != nil {
		return err
	}

	log.Println("MySql connected successfully")

	log.Println("Database connected successfully")
	return nil
}

func ConnectMongoDB(config *config.Config) error {
	uri := config.MONGOURL

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
    if err != nil {
        return err
    }

    // Ping to verify connection
    if err := client.Ping(ctx, nil); err != nil {
        return err
    }

    MDB = client
    log.Println("Connected to MongoDB successfully")
    return nil
}

func CloseMongoDB() {
    if MDB != nil {
        if err := MDB.Disconnect(context.TODO()); err != nil {
            log.Printf("Error disconnecting MongoDB client: %v", err)
        } else {
            log.Println("Disconnected MongoDB client successfully")
        }
    }
}
