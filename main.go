package main

import (
  "net/http"

  "github.com/gin-gonic/gin"
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

type Exchange struct {
  gorm.Model
  ID uint `json:"id" gorm:"primary_key"`
  Name  string `json:"name"`
  PricePoint uint `json: "price_point"`
}

var db *gorm.DB



func main() {
    database, err := gorm.Open(postgres.New(postgres.Config{
      DSN: "user=postgres dbname=giftexchange port=5432 sslmode=disable",
      PreferSimpleProtocol: true, // disables implicit prepared statement usage
    }), &gorm.Config{})
    if err != nil {
        panic("failed to connect database")
    }

    database.AutoMigrate(&Exchange{})
    db = database

    router := gin.Default()
    router.GET("/exchanges", getExchanges)

    router.Run("localhost:8080")

}

func getExchanges(c *gin.Context) {
    var exchanges []Exchange
    db.Find(&exchanges)

    c.JSON(http.StatusOK, gin.H{"data": exchanges})
}

func postExchanges(c *gin.Context) {
    var newExchange Exchange

    // Call BindJSON to bind the received JSON to
    // newAlbum.
    if err := c.BindJSON(&newExchange); err != nil {
        return
    }

    // Add the new album to the slice.
    db.Create(&Exchange{Name: newExchange.Name, PricePoint: newExchange.PricePoint})
    c.IndentedJSON(http.StatusCreated, newExchange)
}
