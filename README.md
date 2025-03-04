# Next.js Calculator App

A modern, responsive calculator application built with Next.js and Tailwind CSS.

![Calculator App Screenshot]![Screenshot (77)](https://github.com/user-attachments/assets/c1e181c0-25ce-4344-8755-57faad03ca59)



## Features

### Core Functionality
- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Percentage calculations
- Decimal point support
- Clear (AC) and backspace functionality
- Error handling with visual feedback
- Calculation history with timestamps

### User Experience
- Responsive design that works on all device sizes
- Dark mode support
- Keyboard shortcuts for all operations
- Visual feedback for active operations
- Toast notifications for errors and actions
- Auto-scrolling display for long calculations

### Technical Features
- Built with Next.js and React
- Styled with Tailwind CSS
- State management with React hooks
- Animation with Framer Motion
- Toast notifications with Sonner

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/calculator-app.git
   cd calculator-app

   ## Usage

### Basic Operations

- Click on number buttons or use your keyboard to input numbers
- Use operation buttons (+, -, ×, ÷) or keyboard keys (+, -, *, /) for calculations
- Press "=" or Enter key to calculate the result
- Press "AC" or Escape key to clear the calculator
- Press backspace button or Backspace key to delete the last input


### Advanced Features

- Press "%" or % key to convert a number to percentage
- Click the history button or press Ctrl+H to view calculation history
- Click on any history item to reuse the result
- Clear history with the "Clear" button in the history panel


### Error Handling

- Division by zero shows an error message
- Invalid operations are caught and displayed with visual feedback
- Easy recovery from errors by pressing any button


Project Structure

calculator-app/
├── app/
│   ├── page.tsx        # Main page component
│   ├── globals.css     # Global styles
│   └── layout.tsx      # Root layout
├── components/
│   ├── calculator.tsx  # Calculator component
│   └── ui/             # UI components
├── lib/
│   └── utils.ts        # Utility functions
├── public/             # Static assets
└── tailwind.config.js  # Tailwind configuration


## Future Enhancements (Planned for Version 2)

- Scientific calculator mode
- Memory functions (M+, M-, MR, MC)
- Currency conversion
- Unit conversion
- Customizable themes
- Persistent history using local storage
- Export calculation history


## License

[MIT](LICENSE)

## Author

ERSA RANI

:

📜 Acknowledgements
Next.js - The React framework used for building the application.
React - The JavaScript library for building user interfaces.
Tailwind CSS - Utility-first CSS framework for styling.
Lucide React - Beautifully simple open-source icons.
Radix UI - Accessible, high-quality UI components.
clsx - Utility for conditionally joining class names.
Class Variance Authority (CVA) - Helps manage Tailwind variants efficiently.



📦 Dependencies
next - The Next.js framework.
react & react-dom - Core libraries for UI development.
tailwindcss & tailwindcss-animate - Styling and animations.
@radix-ui/react-label & @radix-ui/react-slot - Accessible UI components.
class-variance-authority - Tailwind variant management.
clsx - Class name utility for conditional styling.
lucide-react - Icon library for React.
