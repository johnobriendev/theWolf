# Wolf

Wolf is a React-based application designed to help you keep track of scores and points for the golf game "Wolf." The app allows you to input player names, record strokes per hole, and calculate points based on various Wolf game outcomes. The app features a toggle to switch between viewing the scorecard and the pointscard.

[LiveSite](https://thewolfgolf.netlify.app/)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Game Rules](#game-rules)
- [Contributing](#contributing)
- [License](#license)

## Features

- Add and remove players.
- Start a game and keep track of strokes for each hole.
- Calculate points based on Wolf game rules (Blind Wolf, Lone Wolf, Wolf with Partner).
- Toggle between scorecard and pointscard views.
- Automatic tee order rotation for the first 16 holes.
- Sort players by total points for the last two holes.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/wolf-game-tracker.git
   cd wolf-game-tracker
   ```
2. Install dependencies:

  ```bash
  npm install
  

  ```
Start the development server:
  ```bash
  
  npm run dev
  ```

## Usage
1. Open the app in your browser at http://localhost:3000.
2. Enter player names and add them to the list.
3. Start the game by clicking the "Start Game" button.
4. Navigate between holes using the "Previous Hole" and "Next Hole" buttons.
5. Record strokes for each player on the current hole.
6. Select the Wolf choice for the current hole.
7. Click "Calculate Points" to update the points based on the strokes and Wolf choice.
8. Toggle between the scorecard and pointscard using the toggle button.
## Game Rules
### Blind Wolf

Win: Wolf gets 6 points, opponents get 0 points.

Lose: Wolf gets 0 points, opponents get 2 points.

Tie: Wolf gets 0 points, opponents get 0 points.

### Lone Wolf

Win: Wolf gets 3 points, opponents get 0 points.

Lose: Wolf gets 0 points, opponents get 1 point.

Tie: Wolf gets 0 points, opponents get 0 points.

###Wolf with Partner

Win: Wolf and partner get 1 point each, opponents get 0 points.

Lose: Wolf and partner get 0 points, opponents get 2 points each.

Tie: Wolf and partner get 0 points, opponents get 0 points.

### Tee Order

The tee order rotates for the first 16 holes.

For holes 17 and 18, the tee order is determined by total points from highest to lowest.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.


