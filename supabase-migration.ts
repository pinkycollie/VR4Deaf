API KEY NAMING

An API key is a unique identifier used to authenticate requests to an API. It can be passed in different ways — most commonly in HTTP headers, query parameters, or cookies — depending on the API design and security requirements.

Example in HTTP Header (recommended for security):

openapi: 3.0.4
components:
securitySchemes:
ApiKeyAuth: # Arbitrary name for the security scheme
type: apiKey
in: header # Can be "header", "query", or "cookie"
name: X-API-KEY # Actual header name
security:
- ApiKeyAuth: []
Copy
Usage in request:

curl -H "X-API-KEY: abcdef12345" https://api.example.com/data
Copy
Example in Query Parameter:

components:
securitySchemes:
ApiKeyQuery:
type: apiKey
in: query
name: api_key
security:
- ApiKeyQuery: []
Copy
Usage in request:

curl "https://api.example.com/data?api_key=abcdef12345"
Copy
Example in Cookie:

components:
securitySchemes:
ApiKeyCookie:
type: apiKey
in: cookie
name: X-API-KEY
security:
- ApiKeyCookie: []
Copy
Usage in request:

GET /data HTTP/1.1
Cookie: X-API-KEY=abcdef12345
Copy
Best Practices:

Prefer headers over URLs to avoid exposing keys in logs, browser history, or shared links
3
.

Use HTTPS to encrypt the key during transmission.

Apply restrictions (IP, domain, service) to limit misuse
2
.

Rotate keys periodically and revoke compromised ones.

Multiple Keys Example (logical AND requirement):

components:
securitySchemes:
apiKey:
type: apiKey
in: header
name: X-API-KEY
appId:
type: apiKey
in: header
name: X-APP-ID
security:
- apiKey: []
appId: []



Global API Key	

2da7b2dfb56953e5e449d7c15172f84a3bf27

CA key
v1.0-7bc1df56b947a0726bc39a61-bb3f02c829d217a6032940c87fc0c4cff269333155792eb3d0e340693bafff4b3a8cca35c4db10b76bca7761876639547c6d2bb7d246a4b2887a4d8e45681ef154340844a18abeebab

# bash
cp .env.template .env
# edit .env and set POSTGRES_PASSWORD and other secrets
nano .env
HFH2R9dhRb8J9sGwLDSIGjp0SvZjKmyI