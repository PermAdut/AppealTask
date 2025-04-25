# Appeal Management System

## Development Mode Installation

1. Clone this repository
```bash
git clone https://github.com/PermAdut/AppealTask
```

2. Install and verify Node.js (v22.9 or higher)
```bash
node -v
```

3. Install required dependencies
```bash
npm ci
```

4. Create and configure your .env file
```bash
mv .env.example .env
```

5. Start the server
```bash
npm run dev
```

## Docker Installation

1. Clone this repository
```bash
git clone https://github.com/PermAdut/AppealTask
```

2. Verify Docker installation
```bash
docker -v
```

3. Start the container
```bash
docker compose -f 'compose.yaml' up -d --build
```

## System Overview

A system for managing appeals with the following statuses:
- New
- In Progress
- Completed
- Cancelled

## API Endpoints

1. **Create Appeal**  
   `POST /api/v1.0/appeal/`

2. **Take Appeal in Progress**  
   `PATCH /api/v1.0/appeal/take/:appealId`

3. **Complete Appeal Processing**  
   `PATCH /api/v1.0/appeal/end/:appealId`

4. **Cancel Appeal**  
   `PATCH /api/v1.0/appeal/cancell/:appealId`

5. **Get Appeals List with Date Filtering**  
   - Single date: `GET /api/v1.0/appeal/?date=${Date}`
   - Date range: `GET /api/v1.0/appeal/?date=${date1}&date=${date2}`

6. **Cancel All In-Progress Appeals**  
   `PATCH /api/v1.0/appeal/cancel-all`

## Features

- When creating an appeal, you can submit the appeal text and theme
- When completing an appeal, you can submit the resolution text
- When canceling an appeal, you can submit the cancellation reason
- All appeals are anonymous

## Tech Stack

- Node.js
- Express.js
- MongoDB
- TypeScript
- Webpack