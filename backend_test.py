#!/usr/bin/env python3
"""
Comprehensive Backend Testing Suite for Quantum Sensing Laboratory Website
Tests all backend functionality after code cleanup to ensure everything is working properly.
"""

import requests
import json
import time
import os
from datetime import datetime
from typing import Dict, Any

# Get backend URL from frontend environment
def get_backend_url():
    """Get the backend URL from frontend .env file"""
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None
    return None

class BackendTester:
    def __init__(self):
        self.backend_url = get_backend_url()
        if not self.backend_url:
            raise Exception("Could not determine backend URL from frontend/.env")
        
        self.api_base = f"{self.backend_url}/api"
        self.test_results = []
        self.start_time = datetime.now()
        
        print(f"🧪 Backend Testing Suite for Quantum Sensing Laboratory")
        print(f"📡 Backend URL: {self.backend_url}")
        print(f"🔗 API Base: {self.api_base}")
        print(f"⏰ Test Started: {self.start_time.strftime('%Y-%m-%d %H:%M:%S')}")
        print("=" * 80)

    def log_test(self, test_name: str, success: bool, details: str = "", response_time: float = 0):
        """Log test result"""
        status = "✅ PASS" if success else "❌ FAIL"
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'response_time': response_time
        })
        
        time_info = f" ({response_time:.2f}ms)" if response_time > 0 else ""
        print(f"{status} {test_name}{time_info}")
        if details:
            print(f"    📝 {details}")

    def test_backend_health_check(self):
        """Test 1: Backend Health Check - Verify FastAPI backend is responding"""
        try:
            start_time = time.time()
            response = requests.get(f"{self.api_base}/", timeout=10)
            response_time = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Backend Health Check", True, 
                                f"FastAPI backend responding correctly (200 OK)", response_time)
                    return True
                else:
                    self.log_test("Backend Health Check", False, 
                                f"Unexpected response: {data}", response_time)
                    return False
            else:
                self.log_test("Backend Health Check", False, 
                            f"HTTP {response.status_code}: {response.text}", response_time)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Backend Health Check", False, f"Connection error: {str(e)}")
            return False

    def test_mongodb_connectivity(self):
        """Test 2: MongoDB Connectivity - Test database operations"""
        try:
            # Test creating a status check (tests MongoDB write)
            test_data = {
                "client_name": f"backend_test_{int(time.time())}"
            }
            
            start_time = time.time()
            response = requests.post(f"{self.api_base}/status", 
                                   json=test_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            response_time = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                created_status = response.json()
                if created_status.get("client_name") == test_data["client_name"]:
                    # Test reading status checks (tests MongoDB read)
                    start_time = time.time()
                    read_response = requests.get(f"{self.api_base}/status", timeout=10)
                    read_time = (time.time() - start_time) * 1000
                    
                    if read_response.status_code == 200:
                        status_checks = read_response.json()
                        total_records = len(status_checks)
                        
                        self.log_test("MongoDB Connectivity", True, 
                                    f"Successfully created and retrieved status check. Total records: {total_records}", 
                                    response_time + read_time)
                        return True
                    else:
                        self.log_test("MongoDB Connectivity", False, 
                                    f"Failed to read from MongoDB: HTTP {read_response.status_code}")
                        return False
                else:
                    self.log_test("MongoDB Connectivity", False, 
                                f"Data mismatch in created record")
                    return False
            else:
                self.log_test("MongoDB Connectivity", False, 
                            f"Failed to create status check: HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("MongoDB Connectivity", False, f"Connection error: {str(e)}")
            return False

    def test_api_endpoints(self):
        """Test 3: API Endpoints - Test all available endpoints"""
        endpoints_tested = 0
        endpoints_passed = 0
        total_response_time = 0
        
        # Test GET /api/ (root endpoint)
        try:
            start_time = time.time()
            response = requests.get(f"{self.api_base}/", timeout=10)
            response_time = (time.time() - start_time) * 1000
            total_response_time += response_time
            endpoints_tested += 1
            
            if response.status_code == 200:
                endpoints_passed += 1
        except:
            pass
        
        # Test POST /api/status (create status check)
        try:
            test_data = {"client_name": f"api_test_{int(time.time())}"}
            start_time = time.time()
            response = requests.post(f"{self.api_base}/status", 
                                   json=test_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            response_time = (time.time() - start_time) * 1000
            total_response_time += response_time
            endpoints_tested += 1
            
            if response.status_code == 200:
                endpoints_passed += 1
        except:
            pass
        
        # Test GET /api/status (get all status checks)
        try:
            start_time = time.time()
            response = requests.get(f"{self.api_base}/status", timeout=10)
            response_time = (time.time() - start_time) * 1000
            total_response_time += response_time
            endpoints_tested += 1
            
            if response.status_code == 200:
                endpoints_passed += 1
        except:
            pass
        
        avg_response_time = total_response_time / endpoints_tested if endpoints_tested > 0 else 0
        
        if endpoints_passed == endpoints_tested and endpoints_tested == 3:
            self.log_test("API Endpoints", True, 
                        f"All {endpoints_tested} endpoints working correctly", avg_response_time)
            return True
        else:
            self.log_test("API Endpoints", False, 
                        f"Only {endpoints_passed}/{endpoints_tested} endpoints working")
            return False

    def test_static_file_serving(self):
        """Test 4: Static File Serving - Test access to NV center visualization"""
        try:
            # Test access to the NV center visualization file
            static_url = f"{self.backend_url}/nv_center_web.html"
            
            start_time = time.time()
            response = requests.get(static_url, timeout=10)
            response_time = (time.time() - start_time) * 1000
            
            if response.status_code == 200:
                content = response.text
                # Check if it's actually HTML content with NV center visualization
                if "plotly" in content.lower() and "scatter3d" in content.lower():
                    self.log_test("Static File Serving", True, 
                                f"NV center visualization accessible and valid", response_time)
                    return True
                else:
                    self.log_test("Static File Serving", False, 
                                f"File accessible but content invalid")
                    return False
            else:
                self.log_test("Static File Serving", False, 
                            f"Static file not accessible: HTTP {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Static File Serving", False, f"Connection error: {str(e)}")
            return False

    def test_error_handling(self):
        """Test 5: Error Handling - Test proper error responses"""
        try:
            # Test 404 for non-existent endpoint
            start_time = time.time()
            response = requests.get(f"{self.api_base}/nonexistent", timeout=10)
            response_time = (time.time() - start_time) * 1000
            
            if response.status_code == 404:
                # Test validation error for invalid POST data
                try:
                    invalid_response = requests.post(f"{self.api_base}/status", 
                                                   json={"invalid_field": "test"}, 
                                                   headers={"Content-Type": "application/json"},
                                                   timeout=10)
                    
                    if invalid_response.status_code in [422, 400]:  # Validation error
                        self.log_test("Error Handling", True, 
                                    f"Proper error responses (404 for not found, {invalid_response.status_code} for validation)", 
                                    response_time)
                        return True
                    else:
                        self.log_test("Error Handling", False, 
                                    f"Invalid data should return 422/400, got {invalid_response.status_code}")
                        return False
                except:
                    self.log_test("Error Handling", False, "Failed to test validation errors")
                    return False
            else:
                self.log_test("Error Handling", False, 
                            f"Non-existent endpoint should return 404, got {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Error Handling", False, f"Connection error: {str(e)}")
            return False

    def test_supervisor_services(self):
        """Test 6: Supervisor Services - Check all services are running"""
        try:
            result = os.popen('sudo supervisorctl status').read()
            
            required_services = ['backend', 'frontend', 'mongodb', 'code-server']
            running_services = []
            
            for line in result.strip().split('\n'):
                if 'RUNNING' in line:
                    service_name = line.split()[0]
                    running_services.append(service_name)
            
            all_running = all(service in running_services for service in required_services)
            
            if all_running:
                self.log_test("Supervisor Services", True, 
                            f"All required services running: {', '.join(running_services)}")
                return True
            else:
                missing = [s for s in required_services if s not in running_services]
                self.log_test("Supervisor Services", False, 
                            f"Missing services: {', '.join(missing)}")
                return False
                
        except Exception as e:
            self.log_test("Supervisor Services", False, f"Error checking services: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting comprehensive backend testing...\n")
        
        tests = [
            self.test_backend_health_check,
            self.test_mongodb_connectivity,
            self.test_api_endpoints,
            self.test_static_file_serving,
            self.test_error_handling,
            self.test_supervisor_services
        ]
        
        passed_tests = 0
        total_tests = len(tests)
        
        for test in tests:
            try:
                if test():
                    passed_tests += 1
            except Exception as e:
                self.log_test(test.__name__, False, f"Test execution error: {str(e)}")
            print()  # Add spacing between tests
        
        # Print summary
        end_time = datetime.now()
        duration = (end_time - self.start_time).total_seconds()
        
        print("=" * 80)
        print(f"🏁 BACKEND TESTING COMPLETE")
        print(f"⏱️  Duration: {duration:.2f} seconds")
        print(f"📊 Results: {passed_tests}/{total_tests} tests passed")
        
        if passed_tests == total_tests:
            print("🎉 ALL TESTS PASSED - Backend is fully functional!")
            return True
        else:
            print(f"⚠️  {total_tests - passed_tests} tests failed - Issues detected")
            return False

def main():
    """Main test execution"""
    try:
        tester = BackendTester()
        success = tester.run_all_tests()
        
        if success:
            print("\n✅ Backend verification completed successfully!")
            print("🚀 All systems operational and ready for production use.")
        else:
            print("\n❌ Backend verification found issues!")
            print("🔧 Please review the failed tests above.")
            
        return success
        
    except Exception as e:
        print(f"❌ Critical error during testing: {str(e)}")
        return False

if __name__ == "__main__":
    main()