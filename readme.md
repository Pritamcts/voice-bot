

//Optional Caller Name
curl -X POST http://localhost:3000/api/calls/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+918967648122",
    "callerName": "West Bengal Police"
  }'


  //With single ph number 

  curl --location 'http://localhost:3000/api/calls/initiate' \
--header 'Content-Type: application/json' \
--data '{"phoneNumber": "+918967648122"}'