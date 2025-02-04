package server

import (
	"backend/internal/database"
	"backend/internal/repository"
	"github.com/gofiber/fiber/v2"
)

type FiberServer struct {
	*fiber.App
	DBService *database.DatabaseService
	MOMRepo   *repository.MOMRepository
}

// New initializes the Fiber server with database connections
func New() *FiberServer {
	// Initialize Database Service
	dbService := database.NewDatabaseService()

	server := &FiberServer{
		App: fiber.New(fiber.Config{
			ServerHeader: "backend",
			AppName:      "backend",
		}),
		DBService: dbService,
		MOMRepo:   dbService.MOMRepo, // Attach MOM Repository
	}

	return server
}
