#!/usr/bin/env python3
"""
Flask API server to bridge React UI with Python C25K functionality
"""

import os
import sys
import json
import tempfile
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS

# Add the Base Code modules to the path
base_code_path = os.path.join(os.path.dirname(__file__), '..', 'Base Code')
sys.path.insert(0, base_code_path)

try:
    from modules.core import get_workout_plan, generate_ics, generate_csv, generate_json, generate_markdown
    from modules.exports import export_manager
except ImportError as e:
    print(f"Warning: Could not import modules from Base Code: {e}")
    # Define minimal fallback functions
    def get_workout_plan(user):
        return [{"week": 1, "day": 1, "description": "Sample workout", "date": "2024-01-01"}]
    
    def generate_ics(plan, start_day, hour, minute, alert_minutes, outdir):
        pass
    
    def generate_csv(plan, outdir):
        pass
    
    def generate_json(plan, outdir):
        pass
    
    def generate_markdown(plan, user, outdir):
        pass

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "C25K API server is running"})

@app.route('/api/generate-plan', methods=['POST'])
def generate_plan():
    """Generate a C25K training plan based on user input"""
    try:
        user_data = request.json
        
        # Convert start_day to datetime if it's a string
        if isinstance(user_data.get('start_day'), str):
            user_data['start_day'] = datetime.fromisoformat(user_data['start_day'])
        elif not user_data.get('start_day'):
            user_data['start_day'] = datetime.now()
        
        # Set defaults
        user_data.setdefault('weeks', 9)
        user_data.setdefault('days_per_week', 3)
        user_data.setdefault('rest_days', ['Sat', 'Sun'])
        user_data.setdefault('hour', 7)
        user_data.setdefault('minute', 0)
        user_data.setdefault('weight_unit', 'kg')
        user_data.setdefault('lang', 'e')
        
        # Generate the plan
        plan = get_workout_plan(user_data)
        
        return jsonify({
            "success": True,
            "plan": plan,
            "user": user_data
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/export-plan', methods=['POST'])
def export_plan():
    """Export a training plan in various formats"""
    try:
        data = request.json
        export_format = data.get('format', 'csv').lower()
        plan = data.get('plan', [])
        user_data = data.get('user', {})
        
        # Create a temporary directory for exports
        temp_dir = tempfile.mkdtemp()
        
        # Convert start_day if it's a string
        if isinstance(user_data.get('start_day'), str):
            start_day = datetime.fromisoformat(user_data['start_day'])
        else:
            start_day = datetime.now()
        
        filename = None
        content_type = 'application/octet-stream'
        
        if export_format == 'ics':
            generate_ics(
                plan, 
                start_day, 
                user_data.get('hour', 7), 
                user_data.get('minute', 0),
                user_data.get('alert_minutes', 30),
                temp_dir
            )
            filename = os.path.join(temp_dir, 'c25k_plan.ics')
            content_type = 'text/calendar'
        
        elif export_format == 'csv':
            generate_csv(plan, temp_dir)
            filename = os.path.join(temp_dir, 'c25k_plan.csv')
            content_type = 'text/csv'
        
        elif export_format == 'json':
            generate_json(plan, temp_dir)
            filename = os.path.join(temp_dir, 'c25k_plan.json')
            content_type = 'application/json'
        
        elif export_format == 'markdown':
            generate_markdown(plan, user_data, temp_dir)
            filename = os.path.join(temp_dir, 'c25k_checklist.md')
            content_type = 'text/markdown'
        
        else:
            return jsonify({
                "success": False,
                "error": f"Unsupported export format: {export_format}"
            }), 400
        
        if filename and os.path.exists(filename):
            return send_file(
                filename,
                as_attachment=True,
                download_name=os.path.basename(filename),
                mimetype=content_type
            )
        else:
            return jsonify({
                "success": False,
                "error": "Failed to generate export file"
            }), 500
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/api/export-formats', methods=['GET'])
def get_export_formats():
    """Get available export formats"""
    try:
        formats = {
            'ics': 'Calendar format (ICS) for Apple Calendar, Google Calendar, Outlook',
            'csv': 'Spreadsheet format for Excel, Google Sheets, Numbers',
            'json': 'Structured data format for developers and APIs',
            'markdown': 'Printable checklist format'
        }
        
        # Check if advanced formats are available
        try:
            advanced_formats = export_manager.get_format_descriptions()
            formats.update(advanced_formats)
        except:
            pass
        
        return jsonify({
            "success": True,
            "formats": formats
        })
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# Serve static files from React build (for production)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    """Serve React static files in production"""
    if path != "" and os.path.exists(os.path.join('dist', path)):
        return send_from_directory('dist', path)
    else:
        return send_from_directory('dist', 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    debug = os.environ.get('DEBUG', 'True').lower() == 'true'
    
    print(f"Starting C25K API server on port {port}")
    print(f"Health check: http://localhost:{port}/api/health")
    
    app.run(host='0.0.0.0', port=port, debug=debug)