# Deployment & Infrastructure Guide
**Document Version:** 1.0.0  
**Environments Covered:** Local Development, Testing/Staging, Production  
**Orchestration:** Docker Compose, Kubernetes (EKS), Terraform Infrastructure as Code (IaC)  

---

## 1. Environment Topology Overview

```
+---------------------------------------------------------------------------------------------------+
| ENVIRONMENT       | INFRASTRUCTURE TIER                 | PURPOSE / WORKLOAD                      |
+-------------------+-------------------------------------+-----------------------------------------+
| 1. Local Dev      | Docker Compose + Hot Reload         | Rapid feature engineering, component    |
|    (स्थानिक)       | MinIO (S3 mock) + Redis + Postgres  | unit testing, DRM watermark simulation. |
+-------------------+-------------------------------------+-----------------------------------------+
| 2. Staging / Test | Kubernetes (EKS Staging) + S3 Staging| End-to-end integration, 10k student load|
|    (चाचणी)         | Managed Postgres + Redis Cache      | testing, real HLS encryption & QA.      |
+-------------------+-------------------------------------+-----------------------------------------+
| 3. Production     | Multi-AZ EKS + Aurora PG + Redis    | Live student traffic across Maharashtra,|
|    (उत्पादन)      | CloudFront CDN + Cloudflare WAF     | 99.95% SLA, automated autoscaling.     |
+-------------------+-------------------------------------+-----------------------------------------+
```

---

## 2. Local Development Environment

### 2.1 Prerequisites
- Docker Engine v24+ and Docker Compose v2+
- Node.js v20 LTS / npm v10+ (or standalone browser run)
- Git

### 2.2 Local Docker Compose Specification (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: mahashiksha-postgres-dev
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: dev_password_123
      POSTGRES_DB: mahashiksha_db
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./backend/db/init.sql:/docker-entrypoint-initdb.d/init.sql

  redis:
    image: redis:7-alpine
    container_name: mahashiksha-redis-dev
    ports:
      - "6379:6379"
    command: ["redis-server", "--appendonly", "yes"]

  minio:
    image: minio/minio:RELEASE.2024-01-18T22-51-28Z
    container_name: mahashiksha-minio-dev
    environment:
      MINIO_ROOT_USER: minio_admin
      MINIO_ROOT_PASSWORD: minio_secret_key_123
    ports:
      - "9000:9000"
      - "9001:9001"
    command: server /data --console-address ":9001"

  api-gateway:
    build:
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: mahashiksha-api-dev
    environment:
      NODE_ENV: development
      PORT: 5000
      DATABASE_URL: postgresql://postgres:dev_password_123@postgres:5432/mahashiksha_db
      REDIS_URL: redis://redis:6379
      S3_ENDPOINT: http://minio:9000
      JWT_SECRET: dev_super_secret_jwt_key_2026
    ports:
      - "5000:5000"
    depends_on:
      - postgres
      - redis
      - minio
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.dev
    container_name: mahashiksha-frontend-dev
    ports:
      - "3000:3000"
    environment:
      VITE_API_URL: http://localhost:5000
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  pgdata:
```

### 2.3 Local Execution Workflow
```bash
# 1. Clone repository and navigate to root
cd d:\Projects\CoachingWebsite

# 2. Copy environment template
cp .env.example .env.local

# 3. Boot local containerized stack
docker compose -f docker-compose.yml up -d

# 4. Run database seed scripts (Maharashtra SSC/HSC syllabus + dummy users)
docker compose exec api-gateway npm run db:seed

# 5. Access portals:
# Student Portal:     http://localhost:3000/student
# Teacher Studio:     http://localhost:3000/teacher
# Admin Control Hub:  http://localhost:3000/admin
```

---

## 3. Testing & Staging Environment

### 3.1 Objectives
1. **DRM & Encryption Validation:** Validate AES-128 key delivery and CloudFront signed cookie verification in an isolated AWS sandbox.
2. **Stress & Concurrency Load Test:** Execute automated k6 scripts simulating 10,000 concurrent students streaming video and submitting simultaneous quiz answers.
3. **Low-Bandwidth Simulation:** Network throttling tests simulating 2G/3G/intermittent 4G speeds found in coastal Konkan regions.

### 3.2 Staging Architecture & Configuration

```ini
# Staging Environment Config (.env.staging)
NODE_ENV=staging
PORT=5000
DATABASE_URL=postgresql://app_user:StageSecurePass@pg-staging.internal:5432/mahashiksha_staging?sslmode=require
REDIS_URL=rediss://default:StageRedisPass@redis-staging.internal:6379
AWS_REGION=ap-south-1
AWS_S3_MEDIA_BUCKET=mahashiksha-staging-media-ap-south-1
CLOUDFRONT_DISTRIBUTION_DOMAIN=d1234stage.cloudfront.net
CLOUDFRONT_KEY_PAIR_ID=K1234567890STG
DRM_KEY_ROTATION_INTERVAL_SEC=300
```

### 3.3 Automated CI/CD Pipeline (GitHub Actions Specification)

```yaml
name: CI/CD Staging Pipeline

on:
  push:
    branches: [ staging, main ]
  pull_request:
    branches: [ staging ]

jobs:
  test-and-lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test:unit
      - run: npm run test:security-audit

  build-and-deploy-staging:
    needs: test-and-lint
    if: github.ref == 'refs/heads/staging'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_STAGING_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_STAGING_SECRET_KEY }}
          aws-region: ap-south-1
      - name: Build & Push API Image to ECR
        run: |
          aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin ${{ secrets.AWS_ECR_REGISTRY }}
          docker build -t ${{ secrets.AWS_ECR_REGISTRY }}/mahashiksha-api:staging-${{ github.sha }} ./backend
          docker push ${{ secrets.AWS_ECR_REGISTRY }}/mahashiksha-api:staging-${{ github.sha }}
      - name: Deploy to EKS Staging Cluster
        run: |
          aws eks update-kubeconfig --region ap-south-1 --name mahashiksha-staging-eks
          helm upgrade --install mahashiksha-staging ./k8s/charts/mahashiksha --set image.tag=staging-${{ github.sha }}
```

---

## 4. Production Environment

### 4.1 Enterprise AWS Infrastructure Topology

```mermaid
graph TD
    subgraph Edge Tier
        DNS[Cloudflare DNS + Enterprise WAF] --> CF[AWS CloudFront CDN - Multi-Edge Mumbai / Pune]
    end

    subgraph VPC ap-south-1 (Mumbai)
        CF --> ALB[Application Load Balancer - Dual AZ]
        
        subgraph EKS Production Cluster
            ALB --> Ingress[Nginx Ingress Controller]
            Ingress --> PodAuth[Auth Pods (Autoscaled 2-10)]
            Ingress --> PodCore[Academic Core Pods (Autoscaled 4-20)]
            Ingress --> PodDoubt[Real-time WebSocket Pods (Autoscaled 2-15)]
        end

        subgraph Persistent & High-Availability Data Tier
            PodAuth & PodCore --> AuroraMaster[(AWS Aurora PostgreSQL 16 - Multi-AZ Master)]
            AuroraMaster --> AuroraReplica[(Aurora Read Replica 1 - Analytics)]
            PodAuth & PodDoubt --> ElastiCache[(AWS ElastiCache Redis 7 Cluster)]
            PodCore --> S3Media[(AWS S3 Glacier + Standard Encrypted Media)]
        end
    end
```

### 4.2 Production Security Hardening & Blue/Green Deployments
1. **Zero Public Subnet Exposure:** Database and Redis nodes reside strictly in isolated private subnets with VPC endpoints.
2. **Encrypted at Rest & in Transit:** AES-256 KMS customer-managed keys for S3 buckets, TLS 1.3 enforced on all endpoints.
3. **Rolling / Blue-Green Deployments:** Zero-downtime updates with Kubernetes rolling deployment (`maxUnavailable: 0`, `maxSurge: 25%`).

---

## 5. Monitoring, Observability & Disaster Recovery

### 5.1 Observability Stack

| Tool | Purpose | Target SLA / Threshold |
| :--- | :--- | :--- |
| **Prometheus + Grafana** | Cluster CPU/RAM, active WebSocket connections, HTTP req/s | Alert at > 75% pod CPU |
| **OpenTelemetry (APM)** | Distributed tracing across microservices | Alert on P95 latency > 300ms |
| **Sentry** | Frontend & Backend real-time exception tracking | Immediate alert on uncaught 5xx |
| **AWS CloudWatch** | Transcoding queue depth and S3 upload triggers | Alert if queue wait > 60s |

### 5.2 Backup & Disaster Recovery (DR) Strategy
- **RPO (Recovery Point Objective):** < 15 minutes (Continuous PostgreSQL WAL archiving to S3).
- **RTO (Recovery Time Objective):** < 45 minutes (Automated Terraform redeployment to secondary region `ap-south-2` Hyderabad).
- **Automated Snapshot Lifecycle:** Daily Aurora snapshots retained for 35 days with cross-region replication.
