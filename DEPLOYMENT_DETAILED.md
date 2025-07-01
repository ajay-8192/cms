# Detailed AWS Deployment Guide (Cost-Effective & Beginner-Friendly)

This guide provides a detailed, step-by-step walkthrough for deploying your application to AWS with a focus on simplicity and cost-effectiveness, leveraging the AWS Free Tier where possible.

**Architecture Overview:**

*   **Compute:** A single Amazon EC2 `t2.micro` instance will run your frontend, backend, and MongoDB containers using Docker Compose.
*   **Database (MySQL):** Amazon RDS for MySQL (`db.t2.micro`).
*   **Cache (Redis):** Amazon ElastiCache for Redis (`cache.t2.micro`).
*   **Networking:** An Elastic IP for a static public IP and EC2 Security Groups as a firewall.

---

## Step 1: Set up Your AWS Account and CLI

1.  **Create an AWS Account:** If you don't have one, sign up at [aws.amazon.com](https://aws.amazon.com).
2.  **Install and Configure the AWS CLI:** Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) to install the AWS CLI on your local machine. Then, configure it by running `aws configure` and providing your AWS Access Key ID and Secret Access Key.

---

## Step 2: Set up the Databases and Cache

### A. Create a Security Group for Your Databases

First, we'll create a "firewall" rule to allow your application to connect to your databases.

1.  Go to the **EC2 console** in the AWS Management Console.
2.  Navigate to **Security Groups** and click **Create security group**.
3.  **Configuration:**
    *   **Security group name:** `db-access-sg`
    *   **Description:** `Security group for database access from EC2`
    *   **VPC:** Leave as the default VPC.
4.  Click **Create security group**. We will add rules to it later.

### B. Create the RDS for MySQL Database

1.  Go to the **RDS console**.
2.  Click **Create database**.
3.  **Configuration:**
    *   **Choose a database creation method:** `Standard create`
    *   **Engine options:** `MySQL`
    *   **Templates:** `Free tier`
    *   **Settings:**
        *   **DB instance identifier:** `cms-mysql-db`
        *   **Master username:** `admin`
        *   **Master password:** Choose a secure password and save it.
    *   **Connectivity:**
        *   **VPC security group (firewall):** Choose `db-access-sg`.
4.  Click **Create database**. It will take a few minutes to provision. Once it's available, click on the database and note down the **Endpoint** from the "Connectivity & security" tab. This is your `DB_HOST`.

### C. Create the ElastiCache for Redis Cache

1.  Go to the **ElastiCache console**.
2.  Click **Create** to start the cluster creation wizard.
3.  **Configuration:**
    *   **Cluster engine:** `Redis`
    *   **Node type:** `cache.t2.micro` (Free Tier eligible)
    *   **Cluster name:** `cms-redis-cache`
    *   **Subnet group:** Create a new one if you don't have one.
    *   **VPC Security Groups:** Choose `db-access-sg`.
4.  Click **Create**. Once the cluster is available, note down the **Primary Endpoint**. This is your `REDIS_HOST`.

---

## Step 3: Set up the EC2 Instance (Your Server)

### A. Create a Security Group for Your EC2 Instance

1.  Go to the **EC2 console** -> **Security Groups**.
2.  Click **Create security group**.
3.  **Configuration:**
    *   **Security group name:** `app-access-sg`
    *   **Description:** `Security group for the main application`
    *   **Inbound rules:**
        *   **Rule 1 (SSH):** Type `SSH`, Source `My IP` (to allow you to connect to the server).
        *   **Rule 2 (HTTP):** Type `HTTP`, Source `Anywhere`.
        *   **Rule 3 (HTTPS):** Type `HTTPS`, Source `Anywhere`.
4.  Click **Create security group**.

### B. Launch the EC2 Instance

1.  Go to the **EC2 console** and click **Launch instance**.
2.  **Configuration:**
    *   **Name:** `cms-server`
    *   **Application and OS Images (AMI):** `Ubuntu Server 22.04 LTS` (Free Tier eligible).
    *   **Instance type:** `t2.micro` (Free Tier eligible).
    *   **Key pair (login):** Create a new key pair, give it a name (e.g., `cms-key`), and download the `.pem` file. **Keep this file safe!**
    *   **Network settings:**
        *   **Firewall (security groups):** Select `app-access-sg` and `db-access-sg`.
3.  Click **Launch instance**.

### C. Assign an Elastic IP

1.  Go to the **EC2 console** -> **Elastic IPs**.
2.  Click **Allocate Elastic IP address**.
3.  Select the allocated IP, click **Actions** -> **Associate Elastic IP address**.
4.  **Associate with:** `Instance`, and select your `cms-server` instance.

---

## Step 4: Configure and Deploy the Application

### A. Connect to Your EC2 Instance

1.  Open a terminal on your local machine.
2.  Use the following command to connect, replacing `<your-key.pem>` and `<your-elastic-ip>`:
    ```bash
    ssh -i /path/to/your-key.pem ubuntu@<your-elastic-ip>
    ```

### B. Install Docker and Docker Compose

Run the following commands on your EC2 instance:
```bash
sudo apt-get update
sudo apt-get install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### C. Clone Your Project and Configure

1.  On the EC2 instance, clone your repository:
    ```bash
    git clone https://github.com/<your-username>/<your-repo>.git
    cd <your-repo>
    ```
2.  Create a `.env` file in the `backend` directory (`backend/.env`):
    ```
    DB_HOST=<your-rds-mysql-endpoint>
    DB_PORT=3306
    DB_USER=admin
    DB_PASSWORD=<your-rds-mysql-password>
    DB_NAME=mydatabase
    REDIS_HOST=<your-elasticache-redis-endpoint>
    REDIS_PORT=6379
    MONGO_URL=mongodb://root:rootpassword@mongodb-container:27017
    ```
3.  Modify the `DB/docker-compose.yaml` file on the EC2 instance. Remove the `mysql` and `redis` services, as they are now managed by AWS. The file should look like this:
    ```yaml
    version: '3.8'

    services:
      mongodb:
        build:
          context: ./MongoDB
          dockerfile: Dockerfile
        container_name: mongodb-container
        ports:
          - "27017:27017"
        environment:
          MONGO_INITDB_ROOT_USERNAME: root
          MONGO_INITDB_ROOT_PASSWORD: rootpassword
        volumes:
          - mongo_data:/data/db

    volumes:
      mongo_data:
    ```

### D. Build and Run the Application

1.  From the root of your project directory on the EC2 instance, run:
    ```bash
    # Build and run the backend, frontend, and mongodb
    docker-compose -f DB/docker-compose.yaml up -d --build
    docker-compose -f docker-compose.prod.yaml up -d --build
    ```
    *(You will need to create a `docker-compose.prod.yaml` for your backend and frontend, or adjust your existing one)*

Your application should now be running! You can access the frontend by navigating to `http://<your-elastic-ip>` in your browser.
