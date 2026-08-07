#!/usr/bin/env python3
"""
Backend API Test Suite for Sysuit Info Tech
Tests all API endpoints with validation, happy paths, and edge cases
"""

import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://neon-corporate.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def log_test(test_name, passed, details=""):
    status = f"{Colors.GREEN}✅ PASS{Colors.END}" if passed else f"{Colors.RED}❌ FAIL{Colors.END}"
    print(f"\n{status} - {test_name}")
    if details:
        print(f"  {details}")
    return passed

def test_contact_post_valid():
    """Test POST /api/contact with valid data"""
    try:
        payload = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "phone": "+1-555-0123",
            "company": "Tech Corp",
            "message": "I would like to inquire about your services"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code != 201:
            return log_test("POST /api/contact - Valid with company", False, 
                          f"Expected 201, got {response.status_code}. Response: {response.text}")
        
        data = response.json()
        if not data.get('success'):
            return log_test("POST /api/contact - Valid with company", False, 
                          f"Expected success=true, got {data}")
        
        if 'id' not in data:
            return log_test("POST /api/contact - Valid with company", False, 
                          "Response missing 'id' field")
        
        if 'message' not in data:
            return log_test("POST /api/contact - Valid with company", False, 
                          "Response missing 'message' field")
        
        return log_test("POST /api/contact - Valid with company", True, 
                       f"Contact created with ID: {data['id']}")
    except Exception as e:
        return log_test("POST /api/contact - Valid with company", False, f"Exception: {str(e)}")

def test_contact_post_without_company():
    """Test POST /api/contact without optional company field"""
    try:
        payload = {
            "name": "Jane Doe",
            "email": "jane.doe@example.com",
            "phone": "+1-555-0456",
            "message": "Testing without company field"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code != 201:
            return log_test("POST /api/contact - Valid without company", False, 
                          f"Expected 201, got {response.status_code}. Response: {response.text}")
        
        data = response.json()
        if not data.get('success'):
            return log_test("POST /api/contact - Valid without company", False, 
                          f"Expected success=true, got {data}")
        
        return log_test("POST /api/contact - Valid without company", True, 
                       f"Contact created without company field")
    except Exception as e:
        return log_test("POST /api/contact - Valid without company", False, f"Exception: {str(e)}")

def test_contact_post_missing_name():
    """Test POST /api/contact with missing name"""
    try:
        payload = {
            "email": "test@example.com",
            "phone": "+1-555-0789",
            "message": "Missing name"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code != 400:
            return log_test("POST /api/contact - Missing name validation", False, 
                          f"Expected 400, got {response.status_code}")
        
        data = response.json()
        if 'errors' not in data:
            return log_test("POST /api/contact - Missing name validation", False, 
                          f"Expected 'errors' object, got {data}")
        
        if 'name' not in data['errors']:
            return log_test("POST /api/contact - Missing name validation", False, 
                          f"Expected 'name' in errors, got {data['errors']}")
        
        return log_test("POST /api/contact - Missing name validation", True, 
                       f"Correctly returned 400 with name error")
    except Exception as e:
        return log_test("POST /api/contact - Missing name validation", False, f"Exception: {str(e)}")

def test_contact_post_invalid_email():
    """Test POST /api/contact with invalid email"""
    try:
        payload = {
            "name": "Test User",
            "email": "invalid-email",
            "phone": "+1-555-0789",
            "message": "Testing invalid email"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code != 400:
            return log_test("POST /api/contact - Invalid email validation", False, 
                          f"Expected 400, got {response.status_code}")
        
        data = response.json()
        if 'errors' not in data or 'email' not in data['errors']:
            return log_test("POST /api/contact - Invalid email validation", False, 
                          f"Expected 'email' in errors, got {data}")
        
        return log_test("POST /api/contact - Invalid email validation", True, 
                       f"Correctly returned 400 with email error")
    except Exception as e:
        return log_test("POST /api/contact - Invalid email validation", False, f"Exception: {str(e)}")

def test_contact_post_missing_phone():
    """Test POST /api/contact with missing phone"""
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "Missing phone"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code != 400:
            return log_test("POST /api/contact - Missing phone validation", False, 
                          f"Expected 400, got {response.status_code}")
        
        data = response.json()
        if 'errors' not in data or 'phone' not in data['errors']:
            return log_test("POST /api/contact - Missing phone validation", False, 
                          f"Expected 'phone' in errors, got {data}")
        
        return log_test("POST /api/contact - Missing phone validation", True, 
                       f"Correctly returned 400 with phone error")
    except Exception as e:
        return log_test("POST /api/contact - Missing phone validation", False, f"Exception: {str(e)}")

def test_contact_post_missing_message():
    """Test POST /api/contact with missing message"""
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1-555-0789"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        
        if response.status_code != 400:
            return log_test("POST /api/contact - Missing message validation", False, 
                          f"Expected 400, got {response.status_code}")
        
        data = response.json()
        if 'errors' not in data or 'message' not in data['errors']:
            return log_test("POST /api/contact - Missing message validation", False, 
                          f"Expected 'message' in errors, got {data}")
        
        return log_test("POST /api/contact - Missing message validation", True, 
                       f"Correctly returned 400 with message error")
    except Exception as e:
        return log_test("POST /api/contact - Missing message validation", False, f"Exception: {str(e)}")

def test_contact_get():
    """Test GET /api/contact returns array without _id"""
    try:
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        
        if response.status_code != 200:
            return log_test("GET /api/contact", False, 
                          f"Expected 200, got {response.status_code}")
        
        data = response.json()
        if not isinstance(data, list):
            return log_test("GET /api/contact", False, 
                          f"Expected array, got {type(data)}")
        
        # Check that no _id field is present
        for item in data:
            if '_id' in item:
                return log_test("GET /api/contact", False, 
                              f"Found Mongo _id in response: {item}")
        
        return log_test("GET /api/contact", True, 
                       f"Returned {len(data)} contacts without _id field")
    except Exception as e:
        return log_test("GET /api/contact", False, f"Exception: {str(e)}")

def test_inquiries_post_valid():
    """Test POST /api/inquiries with valid data including category"""
    try:
        payload = {
            "name": "Alice Johnson",
            "email": "alice.johnson@example.com",
            "category": "Technical",
            "subject": "API Integration Question",
            "question": "How do I integrate your API with my system?"
        }
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        
        if response.status_code != 201:
            return log_test("POST /api/inquiries - Valid with category", False, 
                          f"Expected 201, got {response.status_code}. Response: {response.text}")
        
        data = response.json()
        if not data.get('success'):
            return log_test("POST /api/inquiries - Valid with category", False, 
                          f"Expected success=true, got {data}")
        
        if 'id' not in data:
            return log_test("POST /api/inquiries - Valid with category", False, 
                          "Response missing 'id' field")
        
        return log_test("POST /api/inquiries - Valid with category", True, 
                       f"Inquiry created with ID: {data['id']}")
    except Exception as e:
        return log_test("POST /api/inquiries - Valid with category", False, f"Exception: {str(e)}")

def test_inquiries_post_without_category():
    """Test POST /api/inquiries without category (should default to General)"""
    try:
        payload = {
            "name": "Bob Wilson",
            "email": "bob.wilson@example.com",
            "subject": "General Question",
            "question": "What are your business hours?"
        }
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        
        if response.status_code != 201:
            return log_test("POST /api/inquiries - Without category (default)", False, 
                          f"Expected 201, got {response.status_code}. Response: {response.text}")
        
        data = response.json()
        if not data.get('success'):
            return log_test("POST /api/inquiries - Without category (default)", False, 
                          f"Expected success=true, got {data}")
        
        return log_test("POST /api/inquiries - Without category (default)", True, 
                       f"Inquiry created, category should default to 'General'")
    except Exception as e:
        return log_test("POST /api/inquiries - Without category (default)", False, f"Exception: {str(e)}")

def test_inquiries_post_missing_name():
    """Test POST /api/inquiries with missing name"""
    try:
        payload = {
            "email": "test@example.com",
            "subject": "Test",
            "question": "Test question"
        }
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        
        if response.status_code != 400:
            return log_test("POST /api/inquiries - Missing name validation", False, 
                          f"Expected 400, got {response.status_code}")
        
        data = response.json()
        if 'errors' not in data or 'name' not in data['errors']:
            return log_test("POST /api/inquiries - Missing name validation", False, 
                          f"Expected 'name' in errors, got {data}")
        
        return log_test("POST /api/inquiries - Missing name validation", True, 
                       f"Correctly returned 400 with name error")
    except Exception as e:
        return log_test("POST /api/inquiries - Missing name validation", False, f"Exception: {str(e)}")

def test_inquiries_post_invalid_email():
    """Test POST /api/inquiries with invalid email"""
    try:
        payload = {
            "name": "Test User",
            "email": "not-an-email",
            "subject": "Test",
            "question": "Test question"
        }
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        
        if response.status_code != 400:
            return log_test("POST /api/inquiries - Invalid email validation", False, 
                          f"Expected 400, got {response.status_code}")
        
        data = response.json()
        if 'errors' not in data or 'email' not in data['errors']:
            return log_test("POST /api/inquiries - Invalid email validation", False, 
                          f"Expected 'email' in errors, got {data}")
        
        return log_test("POST /api/inquiries - Invalid email validation", True, 
                       f"Correctly returned 400 with email error")
    except Exception as e:
        return log_test("POST /api/inquiries - Invalid email validation", False, f"Exception: {str(e)}")

def test_inquiries_post_missing_subject():
    """Test POST /api/inquiries with missing subject"""
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "question": "Test question"
        }
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        
        if response.status_code != 400:
            return log_test("POST /api/inquiries - Missing subject validation", False, 
                          f"Expected 400, got {response.status_code}")
        
        data = response.json()
        if 'errors' not in data or 'subject' not in data['errors']:
            return log_test("POST /api/inquiries - Missing subject validation", False, 
                          f"Expected 'subject' in errors, got {data}")
        
        return log_test("POST /api/inquiries - Missing subject validation", True, 
                       f"Correctly returned 400 with subject error")
    except Exception as e:
        return log_test("POST /api/inquiries - Missing subject validation", False, f"Exception: {str(e)}")

def test_inquiries_post_missing_question():
    """Test POST /api/inquiries with missing question"""
    try:
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject"
        }
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        
        if response.status_code != 400:
            return log_test("POST /api/inquiries - Missing question validation", False, 
                          f"Expected 400, got {response.status_code}")
        
        data = response.json()
        if 'errors' not in data or 'question' not in data['errors']:
            return log_test("POST /api/inquiries - Missing question validation", False, 
                          f"Expected 'question' in errors, got {data}")
        
        return log_test("POST /api/inquiries - Missing question validation", True, 
                       f"Correctly returned 400 with question error")
    except Exception as e:
        return log_test("POST /api/inquiries - Missing question validation", False, f"Exception: {str(e)}")

def test_inquiries_get():
    """Test GET /api/inquiries returns array without _id"""
    try:
        response = requests.get(f"{BASE_URL}/inquiries", timeout=10)
        
        if response.status_code != 200:
            return log_test("GET /api/inquiries", False, 
                          f"Expected 200, got {response.status_code}")
        
        data = response.json()
        if not isinstance(data, list):
            return log_test("GET /api/inquiries", False, 
                          f"Expected array, got {type(data)}")
        
        # Check that no _id field is present
        for item in data:
            if '_id' in item:
                return log_test("GET /api/inquiries", False, 
                              f"Found Mongo _id in response: {item}")
        
        return log_test("GET /api/inquiries", True, 
                       f"Returned {len(data)} inquiries without _id field")
    except Exception as e:
        return log_test("GET /api/inquiries", False, f"Exception: {str(e)}")

def test_stats_get():
    """Test GET /api/stats returns correct counts"""
    try:
        # Get initial stats
        response = requests.get(f"{BASE_URL}/stats", timeout=10)
        
        if response.status_code != 200:
            return log_test("GET /api/stats", False, 
                          f"Expected 200, got {response.status_code}")
        
        data = response.json()
        
        # Verify structure
        if 'contacts' not in data or 'inquiries' not in data or 'total' not in data:
            return log_test("GET /api/stats", False, 
                          f"Missing required fields. Got: {data}")
        
        # Verify total calculation
        if data['total'] != data['contacts'] + data['inquiries']:
            return log_test("GET /api/stats", False, 
                          f"Total mismatch: {data['total']} != {data['contacts']} + {data['inquiries']}")
        
        initial_contacts = data['contacts']
        initial_inquiries = data['inquiries']
        initial_total = data['total']
        
        # Add a new contact
        contact_payload = {
            "name": "Stats Test User",
            "email": "stats.test@example.com",
            "phone": "+1-555-9999",
            "message": "Testing stats increment"
        }
        requests.post(f"{BASE_URL}/contact", json=contact_payload, timeout=10)
        
        # Get updated stats
        response2 = requests.get(f"{BASE_URL}/stats", timeout=10)
        data2 = response2.json()
        
        # Verify counts increased
        if data2['contacts'] != initial_contacts + 1:
            return log_test("GET /api/stats", False, 
                          f"Contacts didn't increment: {data2['contacts']} != {initial_contacts + 1}")
        
        if data2['total'] != initial_total + 1:
            return log_test("GET /api/stats", False, 
                          f"Total didn't increment: {data2['total']} != {initial_total + 1}")
        
        return log_test("GET /api/stats", True, 
                       f"Stats correct: contacts={data2['contacts']}, inquiries={data2['inquiries']}, total={data2['total']}")
    except Exception as e:
        return log_test("GET /api/stats", False, f"Exception: {str(e)}")

def main():
    print(f"\n{Colors.BLUE}{'='*70}")
    print(f"Backend API Test Suite - Sysuit Info Tech")
    print(f"Base URL: {BASE_URL}")
    print(f"{'='*70}{Colors.END}\n")
    
    results = []
    
    # Contact API Tests
    print(f"\n{Colors.YELLOW}=== CONTACT API TESTS ==={Colors.END}")
    results.append(test_contact_post_valid())
    results.append(test_contact_post_without_company())
    results.append(test_contact_post_missing_name())
    results.append(test_contact_post_invalid_email())
    results.append(test_contact_post_missing_phone())
    results.append(test_contact_post_missing_message())
    results.append(test_contact_get())
    
    # Inquiries API Tests
    print(f"\n{Colors.YELLOW}=== INQUIRIES API TESTS ==={Colors.END}")
    results.append(test_inquiries_post_valid())
    results.append(test_inquiries_post_without_category())
    results.append(test_inquiries_post_missing_name())
    results.append(test_inquiries_post_invalid_email())
    results.append(test_inquiries_post_missing_subject())
    results.append(test_inquiries_post_missing_question())
    results.append(test_inquiries_get())
    
    # Stats API Tests
    print(f"\n{Colors.YELLOW}=== STATS API TESTS ==={Colors.END}")
    results.append(test_stats_get())
    
    # Summary
    passed = sum(results)
    total = len(results)
    
    print(f"\n{Colors.BLUE}{'='*70}")
    print(f"TEST SUMMARY")
    print(f"{'='*70}{Colors.END}")
    print(f"Total Tests: {total}")
    print(f"{Colors.GREEN}Passed: {passed}{Colors.END}")
    print(f"{Colors.RED}Failed: {total - passed}{Colors.END}")
    
    if passed == total:
        print(f"\n{Colors.GREEN}✅ ALL TESTS PASSED!{Colors.END}\n")
        sys.exit(0)
    else:
        print(f"\n{Colors.RED}❌ SOME TESTS FAILED{Colors.END}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
