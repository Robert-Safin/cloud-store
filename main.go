package main

import (
	"fmt"
	"log"

	"github.com/Robert-Safin/cloud-store/handlers"
	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	env, err := utils.Load_env()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", env)

	router.GET("/ping", handlers.Handle)
	router.Run(":8080")
}
