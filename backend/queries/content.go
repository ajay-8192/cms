package queries

import (
	"cms/database"
	"cms/models"
	"context"
	"fmt"
	"time"

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
	return contentsCollection.Find(context.TODO(), map[string]interface{}{"projectId": projectId})
}

func CreateContent(content models.Content) (*mongo.InsertOneResult, error) {

	if contentsCollection == nil {
		return nil, fmt.Errorf("contentsCollection is not initialized. Did you call InitContentsCollection?")
	}

	ct, cancel := context.WithTimeout(context.Background(), 5 * time.Second)
	defer cancel()

	result, err := contentsCollection.InsertOne(ct, content)
	if err != nil {
		return nil, fmt.Errorf("failed to insert content: %w", err)
	}

	fmt.Printf("result: %+v\n", content)

	return result, nil
}

func UpdateContent(contentId string, content models.Content) (*mongo.UpdateResult, error) {
	return contentsCollection.UpdateOne(context.TODO(), map[string]interface{}{"id": contentId}, content)
}

func DeleteContent(contentId string) (*mongo.DeleteResult, error) {
	return contentsCollection.DeleteOne(context.TODO(), map[string]interface{}{"id": contentId})
}

func FetchContentById(contentId string, projections string, content *models.Content) (*mongo.SingleResult, error) {
	return contentsCollection.FindOne(context.TODO(), map[string]interface{}{"id": contentId}), nil
}
