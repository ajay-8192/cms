package queries

import (
	"cms/database"
	"cms/models"
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

var contentsCollection *mongo.Collection

func InitMongoCollection() {
	if database.MDB == nil {
		panic("MongoDB client is not initialized! Please check your MongoDB connection.")
	}
	contentsCollection = database.MDB.Database("cms").Collection("contents")
}

func FetchContentByProjectId(projectId string, projections string) (*mongo.Cursor, error) {
	return contentsCollection.Find(context.TODO(), bson.M{"projectId": projectId})
}

func CreateContent(content models.Content) (*mongo.InsertOneResult, error) {
    if contentsCollection == nil {
        return nil, fmt.Errorf("contentsCollection is not initialized. Did you call InitContentsCollection?")
    }

    ct, cancel := context.WithTimeout(context.Background(), 10*time.Second) // Adjusted timeout
    defer cancel()

    // Check if the client is connected
    if err := contentsCollection.Database().Client().Ping(ct, nil); err != nil {
        return nil, fmt.Errorf("MongoDB client is disconnected: %w", err)
    }

    result, err := contentsCollection.InsertOne(ct, content)
    if err != nil {
        return nil, fmt.Errorf("failed to insert content: %w", err)
    }

    fmt.Printf("Inserted content: %+v\n", content)
    return result, nil
}

func UpdateContent(contentId string, content models.Content) (*mongo.UpdateResult, error) {
	return contentsCollection.UpdateOne(context.TODO(), map[string]interface{}{"id": contentId}, content)
}

func DeleteContent(contentId string) (*mongo.DeleteResult, error) {
	return contentsCollection.DeleteOne(context.TODO(), map[string]interface{}{"id": contentId})
}

func DeleteContentByProjectId(projectId string) (*mongo.DeleteResult, error) {
	return contentsCollection.DeleteMany(context.TODO(), bson.M{"projectId": projectId})
}

func FetchContentById(contentId string, projections string, content *models.Content) *mongo.SingleResult {
	return contentsCollection.FindOne(context.TODO(), map[string]interface{}{"id": contentId})
}