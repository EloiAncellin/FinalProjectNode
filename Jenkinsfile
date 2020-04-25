pipeline {
  agent { label 'docker'
         dockerfile true 
        }
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh 'docker-compose up -d'
      }
    }
 
  }
}


