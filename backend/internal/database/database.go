package database

import (
	"context"
	"log"
	"os"
	
	"backend/internal/repository"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DatabaseService struct {
	Client *mongo.Client
	DB     *mongo.Database
	MOMRepo *repository.MOMRepository
}

var mongoURI = os.Getenv("BLUEPRINT_DB_HOST")

func NewDatabaseService() *DatabaseService {
	client, err := mongo.Connect(context.Background(), options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal(err)
	}

	db := client.Database("your_database_name") // Change this to your actual DB name

	return &DatabaseService{
		Client:  client,
		DB:      db,
		MOMRepo: repository.NewMOMRepository(db),
	}
}
