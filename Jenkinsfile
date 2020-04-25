pipeline {
  agent any
  tools {nodejs "nodejs"}
  stages {
    stage('start') {
      steps {
        sh '/usr/local/bin/docker-compose up -d'
      }
    }
        stage('test') {
      steps {
        sh '/usr/local/bin/docker exec -it web npm run coverage'
      }
    }
    stage('stop'){
      steps{
        sh '/usr/local/bin/docker-compose down'
      }
    } 
  }
}


