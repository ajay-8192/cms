package database

import (
	"cms/config"
	"cms/models"
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
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

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	bsonOpts := &options.BSONOptions {
		UseJSONStructTags: true,
		NilSliceAsEmpty: true,
	}
	
	opts := options.Client().ApplyURI(uri).SetConnectTimeout(30 * time.Second).SetBSONOptions(bsonOpts).SetServerAPIOptions(serverAPI)

	var err error
	MDB, err = mongo.Connect(context.TODO(), opts)
	if err != nil {
		return err
	}
	defer func() {
		if err = MDB.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	var result bson.M
	if err := MDB.Database("cms").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Decode(&result); err != nil {
		return err
	}

	log.Println("MongoDB connected successfully")

	return nil
}
