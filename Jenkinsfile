pipeline {
  agent { label 'NTPR'}

  environment {
    AWS_REGION = "ap-south-1"
    AWS_ACCOUNT_ID = "935743309939"
    ECR_BACKEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/nebulytixbackend"
    ECR_FRONTEND = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/nebulytixfortend"
  }

  stages {

    stage('Checkout Code') {
      steps {
        git url:  'https://github.com/pavan01234567/Nebulytix-Technologies-task-Devops-Frontend.git',
            branch: 'main'
      }
    }

    stage('Build Backend') {
      steps {
        sh 'mvn clean package -DskipTests'
      }
    }

    stage('ECR Login') {
      steps {
        sh '''
          aws ecr get-login-password --region $AWS_REGION \
          | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com
        '''
      }
    }

    stage('Build & Push Frontend Image') {
      steps {
        sh '''
          docker build -t neb-frontend frontend/
          docker tag neb-frontend:latest $ECR_FRONTEND:latest
          docker push $ECR_FRONTEND:latest
        '''
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          aws eks update-kubeconfig --region $AWS_REGION --name my-cluster
          kubectl apply -f frontend-deployment.yaml
          kubectl apply -f frontend-service.yaml
        '''
      }
    }
  }
}
