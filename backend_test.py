#!/usr/bin/env python3
"""
Backend Testing Suite
Tests all backend functionality including API endpoints, database connectivity, and static file serving.
"""

import requests
import json
import time
import os
from datetime import datetime
from pathlib import Path

# Load environment variables
from dotenv import load_dotenv
load_dotenv(Path(__file__).parent / 'frontend' / '.env')

# Get backend URL from environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_BASE_URL = f"{BACKEND_URL}/api"

class BackendTester:
    def __init__(self):
        self.results = {
            'backend_health': False,
            'mongodb_connection': False,
            'api_endpoints': False,
            'static_file_serving': False,
            'errors': []
        }
        
    def log_error(self, test_name, error):
        error_msg = f"{test_name}: {str(error)}"
        self.results['errors'].append(error_msg)
        print(f"❌ {error_msg}")
        
    def log_success(self, test_name, message=""):
        print(f"✅ {test_name} {message}")
        
    def test_backend_health(self):
        """Test if backend is running and responding"""
        print("\n🔍 Testing Backend Health...")
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.results['backend_health'] = True
                    self.log_success("Backend Health Check", f"- Status: {response.status_code}")
                    return True
                else:
                    self.log_error("Backend Health Check", f"Unexpected response: {data}")
            else:
                self.log_error("Backend Health Check", f"HTTP {response.status_code}: {response.text}")
        except requests.exceptions.RequestException as e:
            self.log_error("Backend Health Check", f"Connection failed: {e}")
        return False
        
    def test_mongodb_connection(self):
        """Test MongoDB connectivity through API endpoints"""
        print("\n🔍 Testing MongoDB Connection...")
        try:
            # Test POST endpoint (creates data in MongoDB)
            test_data = {
                "client_name": f"test_client_{int(time.time())}"
            }
            
            response = requests.post(f"{API_BASE_URL}/status", 
                                   json=test_data, 
                                   headers={'Content-Type': 'application/json'},
                                   timeout=10)
            
            if response.status_code == 200:
                created_status = response.json()
                if 'id' in created_status and 'timestamp' in created_status:
                    self.log_success("MongoDB Write Test", f"- Created record with ID: {created_status['id']}")
                    
                    # Test GET endpoint (reads data from MongoDB)
                    get_response = requests.get(f"{API_BASE_URL}/status", timeout=10)
                    if get_response.status_code == 200:
                        status_list = get_response.json()
                        if isinstance(status_list, list) and len(status_list) > 0:
                            # Check if our created record exists
                            found_record = any(record['id'] == created_status['id'] for record in status_list)
                            if found_record:
                                self.results['mongodb_connection'] = True
                                self.log_success("MongoDB Read Test", f"- Retrieved {len(status_list)} records")
                                return True
                            else:
                                self.log_error("MongoDB Read Test", "Created record not found in GET response")
                        else:
                            self.log_error("MongoDB Read Test", f"Invalid response format: {status_list}")
                    else:
                        self.log_error("MongoDB Read Test", f"HTTP {get_response.status_code}: {get_response.text}")
                else:
                    self.log_error("MongoDB Write Test", f"Invalid response format: {created_status}")
            else:
                self.log_error("MongoDB Write Test", f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_error("MongoDB Connection Test", f"Request failed: {e}")
        return False
        
    def test_api_endpoints(self):
        """Test all API endpoints comprehensively"""
        print("\n🔍 Testing API Endpoints...")
        
        endpoints_tested = 0
        endpoints_passed = 0
        
        # Test GET /api/
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            endpoints_tested += 1
            if response.status_code == 200 and response.json().get('message') == 'Hello World':
                endpoints_passed += 1
                self.log_success("GET /api/", "- Root endpoint working")
            else:
                self.log_error("GET /api/", f"Unexpected response: {response.status_code}")
        except Exception as e:
            endpoints_tested += 1
            self.log_error("GET /api/", str(e))
            
        # Test POST /api/status
        try:
            test_data = {"client_name": "api_test_client"}
            response = requests.post(f"{API_BASE_URL}/status", 
                                   json=test_data,
                                   headers={'Content-Type': 'application/json'},
                                   timeout=10)
            endpoints_tested += 1
            if response.status_code == 200:
                data = response.json()
                if 'id' in data and 'client_name' in data and 'timestamp' in data:
                    endpoints_passed += 1
                    self.log_success("POST /api/status", "- Status creation working")
                else:
                    self.log_error("POST /api/status", f"Invalid response format: {data}")
            else:
                self.log_error("POST /api/status", f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            endpoints_tested += 1
            self.log_error("POST /api/status", str(e))
            
        # Test GET /api/status
        try:
            response = requests.get(f"{API_BASE_URL}/status", timeout=10)
            endpoints_tested += 1
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    endpoints_passed += 1
                    self.log_success("GET /api/status", f"- Status retrieval working ({len(data)} records)")
                else:
                    self.log_error("GET /api/status", f"Expected list, got: {type(data)}")
            else:
                self.log_error("GET /api/status", f"HTTP {response.status_code}: {response.text}")
        except Exception as e:
            endpoints_tested += 1
            self.log_error("GET /api/status", str(e))
            
        if endpoints_passed == endpoints_tested and endpoints_tested > 0:
            self.results['api_endpoints'] = True
            return True
        return False
        
    def test_static_file_serving(self):
        """Test static file serving for NV center HTML file"""
        print("\n🔍 Testing Static File Serving...")
        try:
            # Test if the NV center HTML file is accessible
            static_url = f"{BACKEND_URL}/nv_center_web.html"
            response = requests.get(static_url, timeout=10)
            
            if response.status_code == 200:
                content = response.text
                # Check if it's a valid HTML file with plotly content
                if '<html' in content.lower() and 'plotly' in content.lower():
                    self.results['static_file_serving'] = True
                    self.log_success("Static File Serving", f"- NV center HTML accessible at {static_url}")
                    return True
                else:
                    self.log_error("Static File Serving", "File doesn't appear to be a valid Plotly HTML file")
            else:
                self.log_error("Static File Serving", f"HTTP {response.status_code} for {static_url}")
                
        except requests.exceptions.RequestException as e:
            self.log_error("Static File Serving", f"Request failed: {e}")
        return False
        
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend Tests")
        print(f"📍 Backend URL: {BACKEND_URL}")
        print(f"📍 API Base URL: {API_BASE_URL}")
        print("=" * 60)
        
        # Run tests in order
        self.test_backend_health()
        self.test_mongodb_connection()
        self.test_api_endpoints()
        self.test_static_file_serving()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = 4
        passed_tests = sum([
            self.results['backend_health'],
            self.results['mongodb_connection'], 
            self.results['api_endpoints'],
            self.results['static_file_serving']
        ])
        
        print(f"✅ Backend Health: {'PASS' if self.results['backend_health'] else 'FAIL'}")
        print(f"✅ MongoDB Connection: {'PASS' if self.results['mongodb_connection'] else 'FAIL'}")
        print(f"✅ API Endpoints: {'PASS' if self.results['api_endpoints'] else 'FAIL'}")
        print(f"✅ Static File Serving: {'PASS' if self.results['static_file_serving'] else 'FAIL'}")
        
        print(f"\n🎯 Overall: {passed_tests}/{total_tests} tests passed")
        
        if self.results['errors']:
            print(f"\n❌ Errors encountered:")
            for error in self.results['errors']:
                print(f"   - {error}")
                
        return passed_tests == total_tests

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    exit(0 if success else 1)