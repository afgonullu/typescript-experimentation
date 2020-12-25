interface BMIValues {
  massInKg: number
  heightInCM: number
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments")
  if (args.length > 4) throw new Error("Too many arguments")

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      massInKg: Number(args[2]),
      heightInCM: Number(args[3]),
    }
  } else {
    throw new Error("Provided values were not numbers!")
  }
}

export const calculateBMI = (
  a: number,
  b: number,
  printText: string
): string => {
  const heightInM: number = Number((b / 100).toFixed(2))
  const result: number = Number((a / (heightInM * heightInM)).toFixed(2))
  let comment = ""
  if (result < 18.5) {
    comment = "UnderWeight"
  } else if (result > 30.0) {
    comment = "Obese"
  } else if (result > 25.0 && result <= 30.0) {
    comment = "Over Weight"
  } else if (result >= 18.5 && result <= 25.0) {
    comment = "Normal Weight"
  }
  console.log(printText, `${result} (${comment})`)
  return comment
}

try {
  const { massInKg, heightInCM } = parseArguments(process.argv)
  calculateBMI(
    massInKg,
    heightInCM,
    `Calculating BMI for a person with ${massInKg} kg weight and ${heightInCM} cm height, the result is:`
  )
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message)
}
