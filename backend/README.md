# Shark Tracking Simulation Backend

Python backend for the shark tracking and foraging prediction system.

## Features

- **5x5 Pixel Grid Collision Detection**: Checks a 5x5 grid around each shark for terrain
- **Depth Termination**: Sharks terminate when encountering hex color #787774 (land/shallow depth)
- **Land Collision with Random Rotation**: 90° or 180° rotation when hitting land
- **Movement Modes**:
  - **Foraging**: Active hunting with erratic movement (3-8 km/h)
  - **Scavenging**: Methodical searching for food (1-4 km/h)
  - **Sleeping**: Minimal movement during rest periods (0-1 km/h)
- **Day/Night Cycle**: Affects shark behavior (sleeping at night for great whites)

## Setup

### Local Development

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Run the Flask server locally:
```bash
python main.py
```

The API will be available at `http://localhost:5000`

### Firebase Deployment

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Update `.firebaserc` with your Firebase project ID

4. Deploy to Firebase:
```bash
firebase deploy
```

## API Endpoints

### GET /api/sharks
Get all sharks in the simulation
```json
{
  "success": true,
  "sharks": [...],
  "count": 2
}
```

### GET /api/sharks/:id
Get specific shark by ID

### POST /api/sharks/create
Create a new shark
```json
{
  "type": "great white",
  "mode": "foraging",
  "latitude": 36.7783,
  "longitude": -121.9200,
  "direction": 45,
  "name": "Shark Name"
}
```

### POST /api/update
Update simulation (advance ticks)
```json
{
  "ticks": 1
}
```

### POST /api/time/toggle
Toggle day/night cycle

### GET /api/status
Get simulation status

### GET /health
Health check endpoint

## Shark Class

### Properties
- `latitude`, `longitude`: Current position
- `px_x`, `px_y`: Pixel coordinates for terrain checking
- `type`: Shark species
- `mode`: Current behavior mode (foraging/scavenging/sleeping)
- `direction`: Movement direction (0-360°)
- `depth`: Current depth
- `terminated`: Whether shark has been terminated

### Methods
- `check_land_collision()`: 5x5 grid check with random rotation
- `check_depth_termination()`: Check for termination color
- `update_position(speed)`: Move shark based on direction
- `forage_mode()`: Foraging behavior
- `scavenge_mode()`: Scavenging behavior
- `sleeping_mode()`: Sleeping behavior
- `update()`: Main update loop

## Configuration

### Depth Map
Place your depth map image at `public/depth.png`. The simulation will use this for:
- Terrain collision detection
- Depth termination checking
- Ocean depth calculations

### Grid Scale
The coordinate system uses a 24:1 ratio:
- `px_x = 24 * longitude`
- `px_y = 24 * latitude`

## Notes

- Sharks check a 5x5 pixel grid at their current position every update
- When land is detected, sharks rotate 90° or 180° randomly
- Depth termination occurs when pixel color matches #787774
- Great white sharks sleep at night (when `isDay = False`)
- Movement speed varies by mode: foraging (3-8 km/h), scavenging (1-4 km/h), sleeping (0-1 km/h)
