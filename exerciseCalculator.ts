interface Analysis {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseInputs {
  target: number
  exercises: Array<string>
}

const parseExerciseArguments = (args: Array<string>): ExerciseInputs => {
  if (args.length < 4) throw new Error("Not enough arguments")
  //   if (args.length > 4) throw new Error("Too many arguments")
  const params = args.slice(2)

  const isNumber = (x: string) => !isNaN(Number(x))
  console.log(isNumber("5"))
  console.log(isNumber("he"))
  console.log(params.every(isNumber))

  if (params.every(isNumber)) {
    const inputs = {
      target: Number(params.shift()),
      exercises: [...params],
    }
    console.log(inputs)
    return inputs
  } else {
    throw new Error("Provided values were not numbers!")
  }
}

export const analyseExercises = (
  exercises: Array<string>,
  target: number
): Analysis => {
  const periodLength = exercises.length
  const trainingDays = exercises.filter((a) => parseFloat(a) !== 0).length
  const average =
    exercises.reduce((acc, next) => acc + parseFloat(next), 0) / periodLength
  const rating = (average / target) * 100
  const success = rating > 100 ? true : false
  let ratingDescription = ""
  if (rating >= 100) {
    ratingDescription = "Keep Up the Good Work!"
  } else if (rating < 100 && rating >= 75) {
    ratingDescription = "You are Getting There! Just a Little Bit Harder!"
  } else if (rating < 75 && rating >= 50) {
    ratingDescription = "Not bad, but not good either!"
  } else if (rating < 50) {
    ratingDescription = "You failed!"
  }

  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }

  console.log(result)

  return result
}

try {
  const { target, exercises } = parseExerciseArguments(process.argv)
  analyseExercises(exercises, target)
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log("Error, something bad happened, message: ", e.message)
}
