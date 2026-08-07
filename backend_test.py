#!/usr/bin/env python3
"""
Backend API Test Suite for PostgreSQL Migration
Tests all endpoints: /api/contact, /api/inquiries, /api/stats
"""
import requests
import json
import sys
from datetime import datetime

# Base URL from environment
BASE_URL = "https://neon-corporate.preview.emergentagent.com/api"

def print_test(name, passed, details=""):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {name}")
    if details:
        print(f"   {details}")
    print()

def test_contact_post_valid():
    """Test POST /api/contact with valid data"""
    print("=" * 60)
    print("TEST 1: POST /api/contact - Valid submission")
    print("=" * 60)
    
    try:
        payload = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@techcorp.com",
            "phone": "+1 555-789-0123",
            "company": "TechCorp Industries",
            "message": "We are interested in your ERP solutions for our manufacturing business."
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 201 and
            data.get("success") == True and
            "id" in data and
            "message" in data and
            len(data.get("id", "")) == 36  # UUID length
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Valid contact submission returns 201 with success, id, message", passed, details)
        return passed, data.get("id")
        
    except Exception as e:
        print_test("Valid contact submission", False, f"Exception: {str(e)}")
        return False, None

def test_contact_post_missing_fields():
    """Test POST /api/contact with missing required fields"""
    print("=" * 60)
    print("TEST 2: POST /api/contact - Missing required fields")
    print("=" * 60)
    
    try:
        payload = {
            "email": "incomplete@test.com"
            # Missing: name, phone, message
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 400 and
            "error" in data and
            "errors" in data and
            "name" in data.get("errors", {}) and
            "phone" in data.get("errors", {}) and
            "message" in data.get("errors", {})
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Missing fields returns 400 with error and errors object", passed, details)
        return passed
        
    except Exception as e:
        print_test("Missing fields validation", False, f"Exception: {str(e)}")
        return False

def test_contact_post_invalid_email():
    """Test POST /api/contact with invalid email"""
    print("=" * 60)
    print("TEST 3: POST /api/contact - Invalid email format")
    print("=" * 60)
    
    try:
        payload = {
            "name": "Test User",
            "email": "not-an-email",
            "phone": "+1 555-000-0000",
            "message": "Test message"
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 400 and
            "error" in data and
            "errors" in data and
            "email" in data.get("errors", {})
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Invalid email returns 400 with email error", passed, details)
        return passed
        
    except Exception as e:
        print_test("Invalid email validation", False, f"Exception: {str(e)}")
        return False

def test_contact_post_optional_company():
    """Test POST /api/contact without optional company field"""
    print("=" * 60)
    print("TEST 4: POST /api/contact - Optional company field omitted")
    print("=" * 60)
    
    try:
        payload = {
            "name": "Michael Chen",
            "email": "michael.chen@startup.io",
            "phone": "+1 555-111-2222",
            "message": "Inquiry about your mobile app development services."
            # company field intentionally omitted
        }
        
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 201 and
            data.get("success") == True and
            "id" in data
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Omitting optional company field still returns 201", passed, details)
        return passed, data.get("id")
        
    except Exception as e:
        print_test("Optional company field", False, f"Exception: {str(e)}")
        return False, None

def test_contact_get():
    """Test GET /api/contact returns array without _id"""
    print("=" * 60)
    print("TEST 5: GET /api/contact - Retrieve contacts")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            isinstance(data, list) and
            len(data) > 0
        )
        
        # Check for PostgreSQL fields and absence of MongoDB _id
        if passed and len(data) > 0:
            first_contact = data[0]
            has_required_fields = all(
                field in first_contact 
                for field in ["id", "name", "email", "phone", "company", "message", "created_at"]
            )
            has_no_mongo_id = "_id" not in first_contact
            is_uuid = len(str(first_contact.get("id", ""))) == 36
            
            passed = has_required_fields and has_no_mongo_id and is_uuid
            
            details = f"Status: {response.status_code}, Count: {len(data)}, Sample: {json.dumps(first_contact, indent=2)}"
        else:
            details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        
        print_test("GET returns array with UUID id, no _id field", passed, details)
        return passed
        
    except Exception as e:
        print_test("GET contacts", False, f"Exception: {str(e)}")
        return False

def test_inquiries_post_valid():
    """Test POST /api/inquiries with valid data"""
    print("=" * 60)
    print("TEST 6: POST /api/inquiries - Valid submission")
    print("=" * 60)
    
    try:
        payload = {
            "name": "Emily Rodriguez",
            "email": "emily.rodriguez@healthcare.com",
            "category": "Health IT",
            "subject": "HIPAA Compliance Questions",
            "question": "Does your Health IT solution support HIPAA compliance and patient data encryption?"
        }
        
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 201 and
            data.get("success") == True and
            "id" in data and
            "message" in data and
            len(data.get("id", "")) == 36
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Valid inquiry submission returns 201 with success, id, message", passed, details)
        return passed, data.get("id")
        
    except Exception as e:
        print_test("Valid inquiry submission", False, f"Exception: {str(e)}")
        return False, None

def test_inquiries_post_missing_fields():
    """Test POST /api/inquiries with missing required fields"""
    print("=" * 60)
    print("TEST 7: POST /api/inquiries - Missing required fields")
    print("=" * 60)
    
    try:
        payload = {
            "name": "Test User"
            # Missing: email, subject, question
        }
        
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 400 and
            "error" in data and
            "errors" in data and
            "email" in data.get("errors", {}) and
            "subject" in data.get("errors", {}) and
            "question" in data.get("errors", {})
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Missing fields returns 400 with error and errors object", passed, details)
        return passed
        
    except Exception as e:
        print_test("Missing fields validation", False, f"Exception: {str(e)}")
        return False

def test_inquiries_post_invalid_email():
    """Test POST /api/inquiries with invalid email"""
    print("=" * 60)
    print("TEST 8: POST /api/inquiries - Invalid email format")
    print("=" * 60)
    
    try:
        payload = {
            "name": "Test User",
            "email": "invalid-email-format",
            "subject": "Test Subject",
            "question": "Test question"
        }
        
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 400 and
            "error" in data and
            "errors" in data and
            "email" in data.get("errors", {})
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Invalid email returns 400 with email error", passed, details)
        return passed
        
    except Exception as e:
        print_test("Invalid email validation", False, f"Exception: {str(e)}")
        return False

def test_inquiries_post_default_category():
    """Test POST /api/inquiries without category (should default to 'General')"""
    print("=" * 60)
    print("TEST 9: POST /api/inquiries - Default category")
    print("=" * 60)
    
    try:
        payload = {
            "name": "David Kim",
            "email": "david.kim@business.com",
            "subject": "General Inquiry",
            "question": "What are your business hours and support availability?"
            # category field intentionally omitted
        }
        
        response = requests.post(f"{BASE_URL}/inquiries", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 201 and
            data.get("success") == True and
            "id" in data
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Omitting category field returns 201 (defaults to 'General')", passed, details)
        return passed, data.get("id")
        
    except Exception as e:
        print_test("Default category", False, f"Exception: {str(e)}")
        return False, None

def test_inquiries_get():
    """Test GET /api/inquiries returns array without _id"""
    print("=" * 60)
    print("TEST 10: GET /api/inquiries - Retrieve inquiries")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/inquiries", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            isinstance(data, list) and
            len(data) > 0
        )
        
        # Check for PostgreSQL fields and absence of MongoDB _id
        if passed and len(data) > 0:
            first_inquiry = data[0]
            has_required_fields = all(
                field in first_inquiry 
                for field in ["id", "name", "email", "category", "subject", "question", "created_at"]
            )
            has_no_mongo_id = "_id" not in first_inquiry
            is_uuid = len(str(first_inquiry.get("id", ""))) == 36
            
            passed = has_required_fields and has_no_mongo_id and is_uuid
            
            details = f"Status: {response.status_code}, Count: {len(data)}, Sample: {json.dumps(first_inquiry, indent=2)}"
        else:
            details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        
        print_test("GET returns array with UUID id, no _id field", passed, details)
        return passed
        
    except Exception as e:
        print_test("GET inquiries", False, f"Exception: {str(e)}")
        return False

def test_stats_get_initial():
    """Test GET /api/stats returns correct structure"""
    print("=" * 60)
    print("TEST 11: GET /api/stats - Initial stats")
    print("=" * 60)
    
    try:
        response = requests.get(f"{BASE_URL}/stats", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            "contacts" in data and
            "inquiries" in data and
            "total" in data and
            isinstance(data["contacts"], int) and
            isinstance(data["inquiries"], int) and
            data["total"] == data["contacts"] + data["inquiries"]
        )
        
        details = f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        print_test("Stats returns correct structure with total = contacts + inquiries", passed, details)
        return passed, data
        
    except Exception as e:
        print_test("GET stats", False, f"Exception: {str(e)}")
        return False, None

def test_stats_increment():
    """Test that stats increment after new submissions"""
    print("=" * 60)
    print("TEST 12: Stats increment after new submissions")
    print("=" * 60)
    
    try:
        # Get initial stats
        initial_response = requests.get(f"{BASE_URL}/stats", timeout=10)
        initial_stats = initial_response.json()
        initial_contacts = initial_stats["contacts"]
        initial_inquiries = initial_stats["inquiries"]
        initial_total = initial_stats["total"]
        
        print(f"Initial stats: contacts={initial_contacts}, inquiries={initial_inquiries}, total={initial_total}")
        
        # Submit a new contact
        contact_payload = {
            "name": "Stats Test Contact",
            "email": "stats.test@example.com",
            "phone": "+1 555-999-8888",
            "message": "Testing stats increment"
        }
        contact_response = requests.post(f"{BASE_URL}/contact", json=contact_payload, timeout=10)
        print(f"Contact submission: {contact_response.status_code}")
        
        # Submit a new inquiry
        inquiry_payload = {
            "name": "Stats Test Inquiry",
            "email": "stats.inquiry@example.com",
            "subject": "Stats Test",
            "question": "Testing stats increment for inquiries"
        }
        inquiry_response = requests.post(f"{BASE_URL}/inquiries", json=inquiry_payload, timeout=10)
        print(f"Inquiry submission: {inquiry_response.status_code}")
        
        # Get updated stats
        updated_response = requests.get(f"{BASE_URL}/stats", timeout=10)
        updated_stats = updated_response.json()
        updated_contacts = updated_stats["contacts"]
        updated_inquiries = updated_stats["inquiries"]
        updated_total = updated_stats["total"]
        
        print(f"Updated stats: contacts={updated_contacts}, inquiries={updated_inquiries}, total={updated_total}")
        
        passed = (
            updated_contacts == initial_contacts + 1 and
            updated_inquiries == initial_inquiries + 1 and
            updated_total == initial_total + 2 and
            updated_total == updated_contacts + updated_inquiries
        )
        
        details = f"Contacts: {initial_contacts} → {updated_contacts}, Inquiries: {initial_inquiries} → {updated_inquiries}, Total: {initial_total} → {updated_total}"
        print_test("Stats correctly increment after new submissions", passed, details)
        return passed
        
    except Exception as e:
        print_test("Stats increment", False, f"Exception: {str(e)}")
        return False

def main():
    print("\n" + "=" * 60)
    print("POSTGRESQL MIGRATION - BACKEND API TEST SUITE")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print(f"Test started at: {datetime.now().isoformat()}")
    print("=" * 60 + "\n")
    
    results = []
    
    # Contact API Tests
    results.append(test_contact_post_valid()[0])
    results.append(test_contact_post_missing_fields())
    results.append(test_contact_post_invalid_email())
    results.append(test_contact_post_optional_company()[0])
    results.append(test_contact_get())
    
    # Inquiries API Tests
    results.append(test_inquiries_post_valid()[0])
    results.append(test_inquiries_post_missing_fields())
    results.append(test_inquiries_post_invalid_email())
    results.append(test_inquiries_post_default_category()[0])
    results.append(test_inquiries_get())
    
    # Stats API Tests
    results.append(test_stats_get_initial()[0])
    results.append(test_stats_increment())
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    passed = sum(results)
    total = len(results)
    print(f"Total Tests: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {total - passed}")
    print(f"Success Rate: {(passed/total)*100:.1f}%")
    print("=" * 60 + "\n")
    
    if passed == total:
        print("🎉 ALL TESTS PASSED - PostgreSQL migration successful!")
        return 0
    else:
        print("⚠️  SOME TESTS FAILED - Please review the failures above")
        return 1

if __name__ == "__main__":
    sys.exit(main())
