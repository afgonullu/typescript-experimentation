import express from "express"
import { calculateBMI } from "./bmiCalculator"
const app = express()

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)

  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "bad request parameters" })
  }

  const result = calculateBMI(weight, height, "htpprequest")

  res.json({
    weight: weight,
    height: height,
    bmi: result,
  })
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
