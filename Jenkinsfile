pipeline {
  agent any
  tools {nodejs "nodejs"
        docker "docker"
        }
  stages {
    stage('start') {
      steps {
        sh 'docker-compose up -d'
      }
    }
 
  }
}


