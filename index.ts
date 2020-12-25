/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express"
import { calculateBMI } from "./bmiCalculator"
import { analyseExercises } from "./exerciseCalculator"

const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded())
app.use(express.json())

// app.get("/hello", (_req, res) => {
//   res.send("Hello Full Stack!")
// })

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

app.post("/exercises", (req, res) => {
  const target = req.body.target
  const exercises = req.body.exercises

  if (!target || !exercises) {
    res.status(400).json("parameters missing")
  }

  res.json(analyseExercises(exercises, target))
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
