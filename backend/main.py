"""
Firebase Cloud Functions for Shark Tracking Simulation
This file contains the API endpoints to be deployed on Firebase
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import json
from shark_simulation import (
    sharks, updateSharks, get_shark_data, Shark,
    load_depth_map, isDay
)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize depth map on startup
import os
depth_path = os.path.join(os.path.dirname(__file__), "../public/depth.png")
load_depth_map(depth_path)

@app.route('/api/sharks', methods=['GET'])
def get_all_sharks():
    """
    Get all shark tracking data
    Returns: JSON array of shark objects
    """
    try:
        shark_data = get_shark_data()
        return jsonify({
            'success': True,
            'sharks': shark_data,
            'count': len(shark_data)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/sharks/<int:shark_id>', methods=['GET'])
def get_shark_by_id(shark_id):
    """
    Get specific shark by ID
    """
    try:
        if shark_id < 0 or shark_id >= len(sharks):
            return jsonify({
                'success': False,
                'error': 'Shark not found'
            }), 404

        shark = sharks[shark_id]
        shark_data = {
            "name": shark.name,
            "type": shark.type,
            "mode": shark.mode,
            "latitude": shark.latitude,
            "longitude": shark.longitude,
            "direction": shark.direction,
            "depth": shark.depth,
            "predicted_lat": shark.predicted_lat,
            "predicted_long": shark.predicted_long,
            "terminated": shark.terminated,
            "px_x": shark.px_x,
            "px_y": shark.px_y
        }

        return jsonify({
            'success': True,
            'shark': shark_data
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/update', methods=['POST'])
def update_simulation():
    """
    Trigger simulation update
    Optionally specify number of ticks
    """
    try:
        data = request.get_json() or {}
        ticks = data.get('ticks', 1)

        for _ in range(ticks):
            updateSharks()

        return jsonify({
            'success': True,
            'message': f'Simulation updated {ticks} tick(s)',
            'sharks': get_shark_data()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/sharks/create', methods=['POST'])
def create_shark():
    """
    Create a new shark
    Expected JSON body:
    {
        "type": "great white",
        "mode": "foraging",
        "latitude": 36.7783,
        "longitude": -121.9200,
        "direction": 45,
        "name": "Shark Name"
    }
    """
    try:
        data = request.get_json()

        # Validate required fields
        required_fields = ['type', 'mode', 'latitude', 'longitude', 'direction', 'name']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400

        # Create new shark
        new_shark = Shark(
            type=data['type'],
            mode=data['mode'],
            latitude=data['latitude'],
            longitude=data['longitude'],
            direction=data['direction'],
            name=data['name'],
            depth=data.get('depth', None)
        )

        return jsonify({
            'success': True,
            'message': 'Shark created successfully',
            'shark_id': len(sharks) - 1,
            'shark': {
                "name": new_shark.name,
                "type": new_shark.type,
                "mode": new_shark.mode,
                "latitude": new_shark.latitude,
                "longitude": new_shark.longitude,
                "direction": new_shark.direction,
                "depth": new_shark.depth
            }
        }), 201
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/time/toggle', methods=['POST'])
def toggle_day_night():
    """
    Toggle between day and night
    Affects shark sleeping behavior
    """
    try:
        global isDay
        import shark_simulation
        shark_simulation.isDay = not shark_simulation.isDay

        return jsonify({
            'success': True,
            'isDay': shark_simulation.isDay,
            'message': f'Time set to {"day" if shark_simulation.isDay else "night"}'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/status', methods=['GET'])
def get_status():
    """
    Get simulation status
    """
    try:
        import shark_simulation
        return jsonify({
            'success': True,
            'status': {
                'total_sharks': len(sharks),
                'active_sharks': len([s for s in sharks if not s.terminated]),
                'terminated_sharks': len([s for s in sharks if s.terminated]),
                'is_day': shark_simulation.isDay
            }
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'shark-tracking-api'
    }), 200

# For local development
if __name__ == '__main__':
    # Create some initial test sharks
    Shark(
        type="great white",
        mode="foraging",
        latitude=36.7783,
        longitude=-121.9200,
        direction=45,
        name="Jaws Jr."
    )

    Shark(
        type="great white",
        mode="scavenging",
        latitude=21.3099,
        longitude=-157.8581,
        direction=180,
        name="Hammerhead Sally"
    )

    app.run(host='0.0.0.0', port=5000, debug=True)
