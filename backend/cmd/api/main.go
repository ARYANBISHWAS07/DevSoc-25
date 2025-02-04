package main

import (
	"backend/internal/server"
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	_ "github.com/joho/godotenv/autoload"
)

func gracefulShutdown(fiberServer *server.FiberServer, done chan bool) {
	// Create context that listens for the interrupt signal from the OS.
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	// Listen for the interrupt signal.
	<-ctx.Done()

	log.Println("Shutting down gracefully, press Ctrl+C again to force")

	// Set a timeout for server shutdown
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := fiberServer.ShutdownWithContext(ctx); err != nil {
		log.Printf("Server forced to shutdown with error: %v", err)
	}

	// Close database connection
	if err := fiberServer.DBService.Client.Disconnect(ctx); err != nil {
		log.Printf("Error disconnecting from MongoDB: %v", err)
	}

	log.Println("Server exited successfully")

	// Notify main goroutine that the shutdown is complete
	done <- true
}

func main() {
	// Initialize Fiber server
	server := server.New()

	// Register API routes
	server.RegisterFiberRoutes() // ✅ Fix: Register routes

	// Create a done channel to signal when shutdown is complete
	done := make(chan bool, 1)

	// Start Fiber server
	go func() {
		port, err := strconv.Atoi(os.Getenv("PORT"))
		if err != nil {
			log.Fatalf("Invalid PORT value: %v", err)
		}

		err = server.Listen(fmt.Sprintf(":%d", port))
		if err != nil {
			log.Fatalf("HTTP server error: %s", err)
		}
	}()

	// Run graceful shutdown in a separate goroutine
	go gracefulShutdown(server, done)

	// Wait for shutdown to complete
	<-done
	log.Println("Graceful shutdown complete.")
}

