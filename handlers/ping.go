package handlers

import (
	"github.com/Robert-Safin/cloud-store/utils"
	"github.com/gin-gonic/gin"
)

func Ping(c *gin.Context) {
	utils.Write_server_success(c, "ok")
}
