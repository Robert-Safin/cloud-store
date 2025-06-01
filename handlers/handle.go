package handlers

import (
	"fmt"
	"log"

	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/gin-gonic/gin"
)

func Handle(c *gin.Context) {
	env, err := utils.Load_env()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", env.Bucket_name)

}
