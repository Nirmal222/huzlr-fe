#!/bin/bash
# Generates TypeScript types from FastAPI OpenAPI spec

BACKEND_URL="http://localhost:8001"
OUTPUT_FILE="lib/types/generated-api.ts"

echo "🔍 Checking if backend is running at $BACKEND_URL..."
if ! curl -s "$BACKEND_URL/openapi.json" > /dev/null; then
  echo "❌ Backend not running at $BACKEND_URL"
  echo "   Please start the backend first: cd ../standmate-be && uvicorn main:app"
  exit 1
fi

echo "✅ Backend is running"
echo "📝 Generating TypeScript types from OpenAPI spec..."

npx openapi-typescript "$BACKEND_URL/openapi.json" -o "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
  echo "✅ Types generated at $OUTPUT_FILE"
else
  echo "❌ Failed to generate types"
  exit 1
fi
