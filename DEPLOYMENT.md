# AWS Deployment Guide

This guide provides instructions for deploying the application to AWS in an optimized and scalable manner.

## Recommended Architecture

We recommend using the following AWS services for a production-ready deployment:

- **Amazon ECS with AWS Fargate:** To run your containerized frontend and backend applications without managing servers.
- **Application Load Balancer (ALB):** To distribute incoming traffic to your frontend and backend services.
- **Amazon RDS for MySQL:** As a managed relational database service.
- **Amazon DocumentDB:** As a managed, MongoDB-compatible database service.
- **Amazon ElastiCache for Redis:** As a managed in-memory data store.
- **Amazon VPC:** To create an isolated network for your resources.
- **AWS IAM:** For secure access to AWS resources.
- **AWS CodePipeline & CodeBuild:** For continuous integration and deployment (CI/CD).

## Deployment Steps

### 1. Set up the Network

1.  **Create a VPC:**
    - Go to the AWS VPC console and create a new VPC.
    - Create at least two public and two private subnets across different Availability Zones for high availability.
    - Create an Internet Gateway and attach it to your VPC.
    - Create a NAT Gateway in a public subnet to allow resources in private subnets to access the internet.
    - Configure route tables for your public and private subnets.

### 2. Set up the Databases

1.  **Create an RDS for MySQL instance:**
    - Go to the AWS RDS console and create a new MySQL database.
    - Place the database in the private subnets of your VPC.
    - Configure the security group to only allow inbound traffic from the backend service's security group on port 3306.

2.  **Create a DocumentDB cluster:**
    - Go to the AWS DocumentDB console and create a new cluster.
    - Place the cluster in the private subnets of your VPC.
    - Configure the security group to only allow inbound traffic from the backend service's security group on port 27017.

3.  **Create an ElastiCache for Redis cluster:**
    - Go to the AWS ElastiCache console and create a new Redis cluster.
    - Place the cluster in the private subnets of your VPC.
    - Configure the security group to only allow inbound traffic from the backend service's security group on port 6379.

### 3. Configure Application Secrets

- Use **AWS Secrets Manager** to store your database credentials, API keys, and other secrets.
- Grant the backend application's IAM role permission to access these secrets.

### 4. Build and Push Docker Images

1.  **Build the Docker images:**
    ```bash
    # Build the backend image
    docker build -t <your_aws_account_id>.dkr.ecr.<your_region>.amazonaws.com/cms-backend:latest backend

    # Build the frontend image
    docker build -t <your_aws_account_id>.dkr.ecr.<your_region>.amazonaws.com/cms-frontend:latest frontend
    ```

2.  **Push the images to Amazon ECR (Elastic Container Registry):**
    - Create two ECR repositories: `cms-backend` and `cms-frontend`.
    - Authenticate the Docker CLI to your ECR registry.
    - Push the Docker images to their respective repositories.

### 5. Deploy the Application with ECS and Fargate

1.  **Create ECS Task Definitions:**
    - Create a task definition for the backend service, specifying the Docker image, CPU/memory, and environment variables (including secrets from Secrets Manager).
    - Create a task definition for the frontend service.

2.  **Create ECS Services:**
    - Create an ECS cluster.
    - Create a backend service using the backend task definition. Configure it to use the private subnets and an Application Load Balancer.
    - Create a frontend service using the frontend task definition. Configure it to use the public subnets and an Application Load Balancer.

3.  **Configure Application Load Balancers:**
    - Create a public-facing ALB for the frontend service.
    - Create an internal ALB for the backend service.
    - Configure listener rules to forward traffic to the appropriate target groups (your ECS services).

### 6. (Optional) Set up CI/CD with CodePipeline

1.  **Create a CodePipeline:**
    - Connect your Git repository to CodePipeline.
    - Configure a CodeBuild project to build your Docker images and push them to ECR.
    - Add a deployment stage to update your ECS services with the new Docker images.

## Post-Deployment

- **Configure DNS:** Point your domain to the DNS name of the frontend Application Load Balancer.
- **Monitor your application:** Use **Amazon CloudWatch** to monitor logs, metrics, and set up alarms.
