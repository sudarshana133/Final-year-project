from app.services.location_fetcher import get_location
from flask import Blueprint, jsonify, request
from app.services.haversine_distance import users_within_radius
from app import db
from app.models.user import User

location_fetcher_bp = Blueprint('location', __name__)

@location_fetcher_bp.route('/getdata', methods=['GET'])
def get_location_data():
    try:
        location_addr = request.args.get('address')
        location = get_location(location_addr)
        if not location:
            return jsonify({'error': 'Location not found'}), 404
        return jsonify(location), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@location_fetcher_bp.route('/haversine',methods=['POST'])
def get_nearby_location():
    data    = request.get_json(silent=True) or {}
    address = data.get("address")
    radius  = data.get("radius")            # can be str or number

    if not address or radius is None:
        return jsonify({"error": "address and radius are required"}), 400

    try:
        radius = float(radius)              # ensure it's a float
        users  = users_within_radius(db, address, radius, User)
        # Serialise result
        return jsonify([
            {
                "id":   item["user"].id,
                "name": item["user"].name,
                "distance_km": item["distance_km"]
            } for item in users
        ]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500