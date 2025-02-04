package repository

import (
	"backend/internal/models"
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// MOMRepository handles database operations
type MOMRepository struct {
	Collection *mongo.Collection
}

// NewMOMRepository creates a new instance of MOMRepository
func NewMOMRepository(db *mongo.Database) *MOMRepository {
	return &MOMRepository{
		Collection: db.Collection("minutes_of_meeting"),
	}
}

// CreateMOM inserts a new MOM record
func (r *MOMRepository) CreateMOM(ctx context.Context, mom models.MOM) (*mongo.InsertOneResult, error) {
	mom.ID = primitive.NewObjectID() // Generate unique ObjectID
	result, err := r.Collection.InsertOne(ctx, mom)
	if err != nil {
		log.Println("Error inserting MOM:", err)
		return nil, err
	}
	return result, nil
}

// GetMOM retrieves a MOM record by ID
func (r *MOMRepository) GetMOM(ctx context.Context, id string) (*models.MOM, error) {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	var mom models.MOM
	err = r.Collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&mom)
	if err != nil {
		return nil, err
	}
	return &mom, nil
}

// UpdateMOM updates a MOM record by ID
func (r *MOMRepository) UpdateMOM(ctx context.Context, id string, updateData bson.M) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.Collection.UpdateOne(ctx, bson.M{"_id": objID}, bson.M{"$set": updateData})
	return err
}

// DeleteMOM deletes a MOM record by ID
func (r *MOMRepository) DeleteMOM(ctx context.Context, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	_, err = r.Collection.DeleteOne(ctx, bson.M{"_id": objID})
	return err
}

// FindMOMByEmail retrieves all MOM records by email
func (r *MOMRepository) FindMOMByEmail(ctx context.Context, email string) ([]models.MOM, error) {
	var meetings []models.MOM

	// MongoDB query to find all documents where email matches
	cursor, err := r.Collection.Find(ctx, bson.M{"email": email})
	if err != nil {
		log.Println("Error fetching MOM records:", err)
		return nil, err
	}
	defer cursor.Close(ctx)

	// Decode all MOM records
	if err = cursor.All(ctx, &meetings); err != nil {
		log.Println("Error decoding MOM records:", err)
		return nil, err
	}

	return meetings, nil
}

