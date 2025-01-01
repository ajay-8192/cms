package queries

import (
	"cms/database"
	"cms/models"
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

func FetchContentByProjectId(projectId string, projections string) (*mongo.Cursor, error) {
	return database.MDB.Database("cms").Collection("contents").Find(context.TODO(), map[string]interface{}{"projectId": projectId})
}

func CreateContent(content models.Content) (*mongo.InsertOneResult, error) {
	return database.MDB.Database("cms").Collection("contents").InsertOne(context.TODO(), content)
}

func UpdateContent(contentId string, content models.Content) (*mongo.UpdateResult, error) {
	return database.MDB.Database("cms").Collection("contents").UpdateOne(context.TODO(), map[string]interface{}{"id": contentId}, content)
}

func DeleteContent(contentId string) (*mongo.DeleteResult, error) {
	return database.MDB.Database("cms").Collection("contents").DeleteOne(context.TODO(), map[string]interface{}{"id": contentId})
}

func FetchContentById(contentId string, projections string, content models.Content) (*mongo.SingleResult, error) {
	return database.MDB.Database("cms").Collection("contents").FindOne(context.TODO(), map[string]interface{}{"id": contentId}), nil
}
