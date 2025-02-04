package server

import (
	"github.com/gofiber/fiber/v2"

	"devsoc/internal/database"
)

type FiberServer struct {
	*fiber.App

	db database.Service
}

func New() *FiberServer {
	server := &FiberServer{
		App: fiber.New(fiber.Config{
			ServerHeader: "devsoc",
			AppName:      "devsoc",
		}),

		db: database.New(),
	}

	return server
}
