"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "./ui/button"
import { Divide, X, Minus, Plus, Equal, Percent, Delete } from "lucide-react"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [currentValue, setCurrentValue] = useState("")
  const [previousValue, setPreviousValue] = useState("")
  const [operation, setOperation] = useState("")
  const [calculated, setCalculated] = useState(false)

  // Handle number input
  const handleNumberClick = (number: string) => {
    if (calculated) {
      setDisplay(number)
      setCurrentValue(number)
      setCalculated(false)
      return
    }

    if (display === "0" || display === "Error") {
      setDisplay(number)
      setCurrentValue(number)
    } else {
      setDisplay(display + number)
      setCurrentValue(currentValue + number)
    }
  }

  // Handle decimal point
  const handleDecimalClick = useCallback(() => {
    if (calculated) {
      setDisplay("0.")
      setCurrentValue("0.")
      setCalculated(false)
      return
    }

    if (!currentValue.includes(".")) {
      const newValue = currentValue === "" ? "0." : currentValue + "."
      setDisplay(display + (display.endsWith(" ") ? "0." : "."))
      setCurrentValue(newValue)
    }
  }, [calculated, currentValue, display])

  // Handle operation
  const handleOperationClick = (op: string) => {
    if (display === "Error") return

    let opSymbol = ""
    switch (op) {
      case "add":
        opSymbol = " + "
        break
      case "subtract":
        opSymbol = " - "
        break
      case "multiply":
        opSymbol = " × "
        break
      case "divide":
        opSymbol = " ÷ "
        break
      case "percent":
        const percentValue = Number.parseFloat(currentValue) / 100
        setCurrentValue(percentValue.toString())
        setDisplay(percentValue.toString())
        return
    }

    if (operation && currentValue && previousValue) {
      handleEqualsClick()
      setPreviousValue(calculate())
      setDisplay(calculate() + opSymbol)
    } else {
      setPreviousValue(currentValue || display)
      setDisplay(display + opSymbol)
    }

    setOperation(op)
    setCurrentValue("")
    setCalculated(false)
  }

  // Calculate result
  const calculate = (): string => {
    if (!previousValue || !currentValue) return currentValue || previousValue || "0"

    const prev = Number.parseFloat(previousValue)
    const current = Number.parseFloat(currentValue)
    let result = 0

    switch (operation) {
      case "add":
        result = prev + current
        break
      case "subtract":
        result = prev - current
        break
      case "multiply":
        result = prev * current
        break
      case "divide":
        if (current === 0) {
          return "Error"
        }
        result = prev / current
        break
      default:
        return currentValue
    }

    // Handle floating point precision
    return Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, "")
  }

  // Handle equals
  const handleEqualsClick = () => {
    if (operation && previousValue && currentValue) {
      const result = calculate()
      setDisplay(result)
      setCurrentValue(result)
      setPreviousValue("")
      setOperation("")
      setCalculated(true)
    }
  }

  // Handle clear
  const handleClearClick = () => {
    setDisplay("0")
    setCurrentValue("")
    setPreviousValue("")
    setOperation("")
    setCalculated(false)
  }

  // Handle backspace
  const handleBackspaceClick = useCallback(() => {
    if (calculated || display === "Error") {
      setDisplay("0")
      setCurrentValue("")
      setCalculated(false)
      return
    }

    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0")
      setCurrentValue("")
    } else if (display.endsWith(" ")) {
      // If we're deleting an operation
      setDisplay(display.slice(0, -3))
      setCurrentValue(previousValue)
      setPreviousValue("")
      setOperation("")
    } else {
      setDisplay(display.slice(0, -1))
      setCurrentValue(currentValue.slice(0, -1))
    }
  }, [calculated, currentValue, display, previousValue, operation])

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        handleNumberClick(e.key)
      } else if (e.key === ".") {
        handleDecimalClick()
      } else if (e.key === "+") {
        handleOperationClick("add")
      } else if (e.key === "-") {
        handleOperationClick("subtract")
      } else if (e.key === "*") {
        handleOperationClick("multiply")
      } else if (e.key === "/") {
        e.preventDefault()
        handleOperationClick("divide")
      } else if (e.key === "%") {
        handleOperationClick("percent")
      } else if (e.key === "Enter" || e.key === "=") {
        handleEqualsClick()
      } else if (e.key === "Escape") {
        handleClearClick()
      } else if (e.key === "Backspace") {
        handleBackspaceClick()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    handleBackspaceClick,
    handleDecimalClick,
    handleOperationClick,
    handleClearClick,
    handleNumberClick,
    handleEqualsClick,
  ])

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 bg-gray-50 dark:bg-gray-700">
        <div className="h-20 flex items-end justify-end">
          <div className="text-right">
            <div className="text-3xl font-medium text-gray-900 dark:text-gray-100 break-all overflow-x-auto whitespace-nowrap scrollbar-hide">
              {display}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 p-4">
        {/* First row */}
        <Button
          variant="outline"
          className="h-14 text-lg font-medium bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/30 dark:text-red-400"
          onClick={handleClearClick}
        >
          AC
        </Button>
        <Button
          variant="outline"
          className="h-14 text-lg font-medium bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={handleBackspaceClick}
        >
          <Delete className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          className="h-14 text-lg font-medium bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
          onClick={() => handleOperationClick("percent")}
        >
          <Percent className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          className="h-14 text-lg font-medium bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 dark:text-amber-400"
          onClick={() => handleOperationClick("divide")}
        >
          <Divide className="h-5 w-5" />
        </Button>

        {/* Second row */}
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("7")}>
          7
        </Button>
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("8")}>
          8
        </Button>
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("9")}>
          9
        </Button>
        <Button
          variant="outline"
          className="h-14 text-lg font-medium bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 dark:text-amber-400"
          onClick={() => handleOperationClick("multiply")}
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Third row */}
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("4")}>
          4
        </Button>
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("5")}>
          5
        </Button>
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("6")}>
          6
        </Button>
        <Button
          variant="outline"
          className="h-14 text-lg font-medium bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 dark:text-amber-400"
          onClick={() => handleOperationClick("subtract")}
        >
          <Minus className="h-5 w-5" />
        </Button>

        {/* Fourth row */}
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("1")}>
          1
        </Button>
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("2")}>
          2
        </Button>
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={() => handleNumberClick("3")}>
          3
        </Button>
        <Button
          variant="outline"
          className="h-14 text-lg font-medium bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:hover:bg-amber-900/30 dark:text-amber-400"
          onClick={() => handleOperationClick("add")}
        >
          <Plus className="h-5 w-5" />
        </Button>

        {/* Fifth row */}
        <Button
          variant="outline"
          className="h-14 text-lg font-medium col-span-2"
          onClick={() => handleNumberClick("0")}
        >
          0
        </Button>
        <Button variant="outline" className="h-14 text-lg font-medium" onClick={handleDecimalClick}>
          .
        </Button>
        <Button
          variant="outline"
          className="h-14 text-lg font-medium bg-amber-500 hover:bg-amber-600 text-white"
          onClick={handleEqualsClick}
        >
          <Equal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

