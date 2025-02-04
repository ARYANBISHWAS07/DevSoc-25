package server

import (
	"backend/internal/models"
	"context"
	"time"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func (s *FiberServer) RegisterFiberRoutes() {
	// Apply CORS middleware
	s.App.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS,PATCH",
		AllowHeaders:     "Accept,Authorization,Content-Type",
		AllowCredentials: false, // credentials require explicit origins
		MaxAge:           300,
	}))

	// General Routes
	s.App.Get("/", s.HelloWorldHandler)

	// MOM CRUD Routes
	momGroup := s.App.Group("/mom")
	momGroup.Post("/", s.CreateMOM)   // Create a MOM record
	momGroup.Get("/:id", s.GetMOM)     // Get a single MOM by ID
	momGroup.Put("/:id", s.UpdateMOM)  // Update a MOM record
	momGroup.Delete("/:id", s.DeleteMOM) // Delete a MOM record
	momGroup.Get("/email/:email", s.GetMOMByEmailHandler) // Get all MOM records by email
}

// Hello World Handler
func (s *FiberServer) HelloWorldHandler(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"message": "Hello World"})
}

func (s *FiberServer) GetMOMByEmailHandler(c *fiber.Ctx) error {
	email := c.Params("email")
	if email == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"status":  "error",
			"message": "Email parameter is required",
		})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Call repository method to find MOM records by email
	meetings, err := s.MOMRepo.FindMOMByEmail(ctx, email)
	if err != nil {
		log.Println("Error fetching MOM records:", err)
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"status":  "error",
			"message": "Failed to fetch MOM records",
		})
	}

	// Return response
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "MOM records retrieved successfully",
		"data":    meetings,
	})
}


// 📌 CREATE MOM (POST /mom/)
func (s *FiberServer) CreateMOM(c *fiber.Ctx) error {
	var mom models.MOM
	if err := c.BodyParser(&mom); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	mom.ID = primitive.NewObjectID() // Generate unique ObjectID
	mom.MeetingDate = time.Now()     // Set current time if not provided

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := s.MOMRepo.CreateMOM(ctx, mom)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to insert MOM"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"message": "MOM created successfully", "id": mom.ID.Hex()})
}

// 📌 GET MOM (GET /mom/:id)
func (s *FiberServer) GetMOM(c *fiber.Ctx) error {
	id := c.Params("id")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	mom, err := s.MOMRepo.GetMOM(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "MOM not found"})
	}

	return c.JSON(mom)
}

// 📌 UPDATE MOM (PUT /mom/:id)
func (s *FiberServer) UpdateMOM(c *fiber.Ctx) error {
	id := c.Params("id")

	var updateData bson.M
	if err := c.BodyParser(&updateData); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request"})
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := s.MOMRepo.UpdateMOM(ctx, id, updateData)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update MOM"})
	}

	return c.JSON(fiber.Map{"message": "MOM updated successfully"})
}

// 📌 DELETE MOM (DELETE /mom/:id)
func (s *FiberServer) DeleteMOM(c *fiber.Ctx) error {
	id := c.Params("id")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := s.MOMRepo.DeleteMOM(ctx, id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to delete MOM"})
	}

	return c.JSON(fiber.Map{"message": "MOM deleted successfully"})
}
