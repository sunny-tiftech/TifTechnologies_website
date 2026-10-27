# Auth Testing Playbook

Step 1: MongoDB Verification
```
mongosh
use test_database
db.users.find({role: "admin"}).pretty()
db.users.findOne({role: "admin"}, {password_hash: 1})
```
Verify: bcrypt hash starts with `$2b$`, indexes exist on users.email (unique) and login_attempts.identifier.

Step 2: API Testing
```
curl -c cookies.txt -X POST <API>/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@tiftechnologies.com","password":"TifAdmin@2026"}'
cat cookies.txt
curl -b cookies.txt <API>/api/auth/me
curl -b cookies.txt <API>/api/admin/enquiries
```
Login should return the user object and set `access_token` + `refresh_token` cookies. `/me` returns the same user with those cookies. `/api/admin/enquiries` returns 401 without cookies.
