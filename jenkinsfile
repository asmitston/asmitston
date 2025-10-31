// Jenkinsfile

pipeline {
    // 1. ENVIRONMENT SETUP
    // 'agent any' means Jenkins will use any available agent/worker machine.
    agent any

    // Tools block automatically installs/configures Node.js based on the name 
    // configured in 'Manage Jenkins' -> 'Tools' -> 'NodeJs Installations'.
    tools {
        // IMPORTANT: Replace 'NodeJS_18' with your actual Jenkins Node.js configuration name
        nodejs 'nodejs-18'
    }

    // Environment variables (optional)
    environment {
        // Set the path for npm to install local dependencies correctly
        PATH = "${tool 'nodejs-18'}/bin:${env.PATH}" 
    }

    // 2. STAGES DEFINITION
    stages {
        
        // Stage 1: Checkout/Setup
        stage('Checkout Source Code') {
            steps {
                // Retrieves the code from the SCM (Git) configured for the job
                checkout scm 
            }
        }
        
        // Stage 2: Install Dependencies and Build
        stage('Install & Build') {
            steps {
                echo 'Installing Node.js dependencies...'
                // Install all packages defined in package.json
                sh 'npm install' 
                
                // You might add an optional build step here for frontend projects (e.g., 'npm run build')
                // sh 'npm run build' 
            }
        }
        
        // Stage 3: Run Tests
        stage('Test') {
            steps {
                echo 'Running project tests...'
                // Executes the 'test' script defined in package.json
                sh 'npm test' 
            }
        }
        
        // Stage 4: Archive Artifacts (Optional but recommended)
        stage('Archive Artifacts') {
            // This makes key files (like the code or package info) available for later deployment/download.
            steps {
                echo 'Archiving necessary artifacts for deployment...'
                // You might archive a 'dist' folder or just the source files
                archiveArtifacts artifacts: '**/*.*', fingerprint: true, excludes: 'node_modules/**'
            }
        }

        // Stage 5: Deploy (Example - Highly Custom)
        stage('Deploy to Server') {
            steps {
                echo 'Simulating deployment to a staging server...'
                
                // --- Example Deployment Option 1: SSH (Requires SSH Agent Plugin) ---
                /* // sshagent(['your-jenkins-ssh-credential-id']) {
                //     sh "scp -r * user@remote-server:/var/www/my-app"
                //     sh "ssh user@remote-server 'cd /var/www/my-app && npm install --production && pm2 restart my-app-name'"
                // }
                */

                // --- Example Deployment Option 2: Docker (Recommended for Node.js) ---
                /*
                // sh "docker build -t myapp:latest ."
                // sh "docker push registry.example.com/myapp:latest"
                // sh "kubectl apply -f deployment.yaml" // Or whatever your orchestrator uses
                */

                // For this basic example, we just echo a success message.
                sh 'echo "Deployment script execution complete!"' 
            }
        }
    }
    
    // 3. POST-BUILD ACTIONS
    // Defines actions to take after the pipeline completes successfully or fails
    post {
        always {
            // Clean up workspace to save disk space
            cleanWs()
        }
        success {
            // Optional: Send a success notification (e.g., to Slack)
            echo 'Pipeline finished successfully! Application is deployed.'
        }
        failure {
            // Optional: Send a failure notification
            echo 'Pipeline failed! Check the "Test" or "Build" stage logs.'
        }
    }
}