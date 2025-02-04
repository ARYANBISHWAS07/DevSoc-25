package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// MOM represents the Minutes of Meeting schema
type MOM struct {
	ID             primitive.ObjectID `bson:"_id,omitempty"`            // MongoDB ObjectID
	Email          string             `bson:"email"`                    // User's email
	MeetingDate    time.Time          `bson:"meeting_date"`             // Meeting date
	MeetingTime    string             `bson:"meeting_time"`             // Meeting time as a string (e.g., "14:00")
	MeetingDuration int               `bson:"meeting_duration"`         // Duration in minutes
	MeetingTopic   string             `bson:"meeting_topic"`            // Meeting topic
	MeetingPoints  []string           `bson:"meeting_points"`           // List of discussion points
}